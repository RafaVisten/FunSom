import * as Tone from 'tone';

let currentModulation = null;
const ENV_DURATION = "4n";

export const synth = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
});

export const ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.01,
    decay: 0.05,
    sustain: 0.0,
    release: 0.01
});

synth.connect(ampEnv).toDestination();

export function playNote(note, duration = "4n", time = Tone.now()) {
    resetModulation(); 

    ampEnv.triggerAttackRelease(ENV_DURATION, time); 
    synth.triggerAttackRelease(note, duration, time); 
}

export function stopSynth() {
    ampEnv.triggerRelease();
    synth.triggerRelease();
}

export function setOscillatorType(type) {
    synth.oscillator.type = type;
}

export function updateEnvelope(env) {
    Object.assign(synth.envelope, env);
}

export function setMasterVolume(db) {
    Tone.Master.volume.value = Math.min(db, -1);
}

export function resetModulation() {
    if (!currentModulation) return;

    const now = Tone.now();

    if (currentModulation.type === "sine") {
        currentModulation.lfo.stop(now);
        currentModulation.lfo.start(now);
        return;
    }

    if (currentModulation.type === "curve") {
        synth.volume.cancelScheduledValues(now);
        synth.volume.setValueCurveAtTime(
            currentModulation.dbCurve,
            now,
            currentModulation.duration
        );
    }
}

export function setAmplitudeLFO(func, params = {}) {

    // Remove old modulation
    if (currentModulation) {
        currentModulation.dispose?.();
        currentModulation = null;
    }

    // Disable modulation
    if (func === "none") {
        synth.volume.cancelScheduledValues();2
        synth.volume.value = -6; // safe default
        return;
    }

    const speed = params.speed || 1;
    const a = params.a || 1;
    const b = params.b || 0;
    const c = params.c || 0;

    if (func === "sine") {

        const lfo = new Tone.LFO(speed, -1, 1);
        const scale = new Tone.Scale(-1, 1, -24, -1); // map → dB

        lfo.connect(scale);
        scale.connect(synth.volume);

        lfo.start();

        currentModulation = {
            type: "sine",
            lfo,
            dispose() {
                lfo.stop();
                lfo.disconnect(); lfo.dispose();
                scale.disconnect(); scale.dispose();
            }
        };

        return;
    }
    
    const size = 2048;
    const curve = new Float32Array(size);

    for (let i = 0; i < size; i++) {
        const x = i / size;
        if (func === "affine")    curve[i] = a * x + b;
        if (func === "quadratic") curve[i] = a*x*x + b*x + c;
    }

    // Normalize 0 → 1
    let min = Math.min(...curve);
    let max = Math.max(...curve);
    for (let i = 0; i < size; i++) {
        curve[i] = (curve[i] - min) / (max - min);
    }

    // Convert → decibels
    const dbCurve = curve.map(v => -24 + v * 23);

    const duration = 1 / speed;
    const now = Tone.now();

    synth.volume.cancelScheduledValues(now);
    synth.volume.setValueCurveAtTime(dbCurve, now, duration);

    currentModulation = {
        type: "curve",
        duration,
        dbCurve,
        dispose() {
            synth.volume.cancelScheduledValues();
        }
    };
}
