import * as Tone from 'tone';

let currentLFO = null;
let currentShaper = null;

/**
 * Synthesizer Module
 * Manages synth creation and configuration
 */

// Create synthesizer with default settings
export const synth = new Tone.Synth({
    oscillator: {
        type: 'triangle'
    },
    envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1
    }
}).toDestination();

/**
 * Play a single note
 * @param {string} note - Note to play (e.g., 'C4', 'D4')
 * @param {string} duration - Duration of note (e.g., '8n', '4n', 'half')
 */
export function playNote(note, duration = '4n') {
    synth.triggerAttackRelease(note, duration);
}

/**
 * Stop synth immediately
 */
export function stopSynth() {
    synth.triggerRelease();
}

/**
 * Change synth oscillator type
 * @param {string} type - Oscillator type ('sine', 'square', 'sawtooth', 'triangle')
 */
export function setOscillatorType(type) {
    synth.oscillator.type = type;
}

/**
 * Update synth envelope
 * @param {object} envelope - Envelope settings {attack, decay, sustain, release}
 */
export function updateEnvelope(envelope) {
    Object.assign(synth.envelope, envelope);
}

/**
 * Automate synth amplitude with arbitrary function LFO
 * @param {string} func - LFO function ('sine', 'affine', 'quadratic')
 * @param {object} params (TODO) - function params
 */
export function setAmplitudeLFO(func) {
    const size = 2048;
    const curve = new Float32Array(size);

    if (func === 'none') {
        if (currentLFO) {
            currentLFO.stop();
            currentLFO.disconnect();
            currentLFO.dispose();
            currentLFO = null;
        }
        if (currentShaper) {
            currentShaper.disconnect();
            currentShaper.dispose();
            currentShaper = null;
        }

        synth.volume.cancelScheduledValues();
        synth.volume.value = 0;

        return;
    }

    for (let i = 0; i < size; i++) {
        const x = i / size;
        if (func === 'sine') curve[i] = Math.sin(x * Math.PI * 2);
    }

    // Dispose previous LFO
    if (currentLFO) {
        currentLFO.stop();
        currentLFO.disconnect();
        currentLFO.dispose();
    }
    if (currentShaper) {
        currentShaper.disconnect();
        currentShaper.dispose();
    }

    const lfo = new Tone.LFO(2, -1, 1);
    const shaper = new Tone.WaveShaper(curve);

    lfo.connect(shaper);
    shaper.connect(synth.volume);

    lfo.start();

    currentLFO = lfo;
    currentShaper = shaper;
}
