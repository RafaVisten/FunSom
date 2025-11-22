// Main app logic - integrates all modules

// #region Initialize

import { stopSynth, playNote, setOscillatorType, setAmplitudeLFO, setMasterVolume } from './modules/synth.js';
import { playCMajorScale } from './modules/sequences.js';

export async function initApp() {
    console.log('Initializing...');
}

// #endregion

// #region Create event handlers

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

// #endregion

// #region Export modules

export * from './modules/synth.js';
export * from './modules/effects.js';
export * from './modules/sequences.js';
export * from './utils/audioHelper.js';
export * from './utils/noteUtils.js';

// #endregion
