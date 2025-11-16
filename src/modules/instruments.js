import { playNote } from './synth.js';

/**
 * Instruments Module
 * Pre-made instruments and instrument presets
 */

/**
 * Piano-like synth preset
 */
export const pianoPreset = {
    oscillator: { type: 'sine' },
    envelope: {
        attack: 0.005,
        decay: 0.3,
        sustain: 0,
        release: 0.2
    }
};

/**
 * Pad-like synth preset (smooth, sustained)
 */
export const padPreset = {
    oscillator: { type: 'sine' },
    envelope: {
        attack: 0.3,
        decay: 0.2,
        sustain: 0.8,
        release: 0.5
    }
};

/**
 * Bright synth preset
 */
export const brightPreset = {
    oscillator: { type: 'square' },
    envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.5,
        release: 0.2
    }
};

/**
 * Mellow synth preset
 */
export const mellowPreset = {
    oscillator: { type: 'sawtooth' },
    envelope: {
        attack: 0.1,
        decay: 0.15,
        sustain: 0.4,
        release: 0.3
    }
};

// Preset collection
export const presets = {
    piano: pianoPreset,
    pad: padPreset,
    bright: brightPreset,
    mellow: mellowPreset
};
