/**
 * FunSom App - Main Application Logic
 * 
 * Integrates all modules and coordinates sound playback
 */

import { stopSynth, playNote, setOscillatorType, setAmplitudeLFO, setMasterVolume } from './modules/synth.js';

import { playCMajorScale } from './modules/melodies.js';

/**
 * Initialize the app
 */
export async function initApp() {
    console.log('🎵 FunSom initialized');
}

export function onScaleClick() {
    playCMajorScale();
}

export function onToneClick() {
    playNote('C4', '1n');
}

export function onStopClick() {
    stopSynth();
}

export function onOscSelectChange() {
    const selectElement = document.getElementById('oscSelect');
    const value = selectElement.value;
    setOscillatorType(value);
}

export function onAmpLFOApply() {
    const selectElement = document.getElementById('ampLFOSelect');
    const paramsInput = document.getElementById('params');
    let params = {};
    try {
        params = JSON.parse(paramsInput.value);
        console.log('Amplitude LFO params properly parsed');
    } catch (e) {
        console.error('Invalid JSON in LFO parameters input');
    }
    const value = selectElement.value;
    setAmplitudeLFO(value, params);
}

export function onMasterVolChange() {
    const sliderElement = document.getElementById('masterVol');
    const value = parseFloat(sliderElement.value);
    setMasterVolume(value);
}

// Export all modules for easy access
export * from './modules/synth.js';
export * from './modules/effects.js';
export * from './modules/melodies.js';
export * from './modules/instruments.js';
export * from './utils/audioHelper.js';
export * from './utils/noteUtils.js';
