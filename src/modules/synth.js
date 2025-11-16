import * as Tone from 'tone';

let currentModulation = null;

/**
 * Synthesizer Module
 */

export const synth = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
}).toDestination();

/** Play note */
export function playNote(note, duration = "4n", time = Tone.now()) {
    resetModulation();                
    synth.triggerAttackRelease(note, duration, time);
}

/** Stop synth */
export function stopSynth() {
    synth.triggerRelease();
}

/** Oscillator type */
export function setOscillatorType(type) {
    synth.oscillator.type = type;
}

/** Update ADSR */
export function updateEnvelope(env) {
    Object.assign(synth.envelope, env);
}

/** Master volume without clipping */
export function setMasterVolume(db) {
    Tone.Master.volume.value = Math.min(db, -1);
}

function resetModulation() {
    if (!currentModulation) return;

    const now = Tone.now();

    // SINE (looping LFO)
    if (currentModulation.type === "sine") {
        currentModulation.lfo.stop(now);
        currentModulation.lfo.start(now);
        return;
    }

    // CURVE (affine / quadratic)
    if (currentModulation.type === "curve") {
        synth.volume.cancelScheduledValues(now);
        synth.volume.setValueCurveAtTime(
            currentModulation.dbCurve,
            now,
            currentModulation.duration
        );
    }
}

/**
 * SINE → looping LFO
 * AFFINE/QUADRATIC → one-shot envelope (no looping)
 */
export function setAmplitudeLFO(func, params = {}) {

    // Stop old modulation
    if (currentModulation) {
        currentModulation.dispose?.();
        currentModulation = null;
    }

    if (func === "none") {
        synth.volume.cancelScheduledValues();
        synth.volume.value = -6; // safe default
        return;
    }

    const speed = params.speed || 1;
    const a = params.a || 1;
    const b = params.b || 0;
    const c = params.c || 0;

    // ---------------------------
    // CASE 1 — SINE (true LFO)
    // ---------------------------
    if (func === "sine") {

        // LFO frequency = speed
        const lfo = new Tone.LFO(speed, -1, 1);

        // map -1..1 → -24 dB .. -1 dB
        const scale = new Tone.Scale(-1, 1, -24, -1);

        lfo.connect(scale);
        scale.connect(synth.volume);

        lfo.start();

        currentModulation = {
            type: "sine",
            lfo,
            duration: null,
            dbCurve: null,
            dispose() {
                lfo.stop();
                lfo.disconnect(); lfo.dispose();
                scale.disconnect(); scale.dispose();
            }
        };

        currentModulation.dispose = () => {
            lfo.stop();
            lfo.disconnect();
            lfo.dispose();
            scale.disconnect();
            scale.dispose();
        };

        return;
    }

    // ---------------------------
    // CASE 2 — CUSTOM ENVELOPES
    // (NON-LOOPING)
    // ---------------------------
    const size = 2048;
    const curve = new Float32Array(size);

    for (let i = 0; i < size; i++) {
        const x = i / size;

        if (func === "affine")      curve[i] = a * x + b;
        if (func === "quadratic")   curve[i] = a*x*x + b*x + c;
    }

    // Normalize to 0..1
    let min = Math.min(...curve);
    let max = Math.max(...curve);
    for (let i = 0; i < size; i++) {
        curve[i] = (curve[i] - min) / (max - min);
    }

    // Convert to decibels (-24 to -1)
    const dbCurve = curve.map(v => -15 + v * 23);

    const duration = 1 / speed;

    const now = Tone.now();
    synth.volume.cancelScheduledValues(now);

    synth.volume.setValueCurveAtTime(
        dbCurve,
        now,
        duration
    );

    // tracker
    currentModulation = {
        type: "curve",
        duration,
        dbCurve,
        dispose() {
            synth.volume.cancelScheduledValues();
        }
    };
}
