import React, { use, useEffect } from 'react'
import Channel from './tabs/Channel.jsx'

import * as Tone from 'tone';
import { stopSynth, playNote, setOscillatorType, setAmplitudeLFO, setMasterVolume } from './modules/synth.js';
import { playCMajorScale } from './modules/sequences.js';

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
    console.log(`Oscillator type changed to: ${oscSelect.value}`);
}

export function onAmpLFOApply() {
    const selectElement = document.getElementById('ampLFOSelect');
    const paramsInput = document.getElementById('params');
    let params = {};
    try {
        params = JSON.parse(paramsInput.value);
    } catch (e) {
        console.error('Invalid JSON in LFO parameters input');
    }
    const value = selectElement.value;
    console.log(`Amplitude LFO changed to: ${ampLFOSelect?.value}`);
    setAmplitudeLFO(value, params);
}

export function onMasterVolChange() {
    const sliderElement = document.getElementById('masterVol');
    const value = parseFloat(sliderElement.value);
    setMasterVolume(value);
    console.log(`Master volume changed to: ${sliderElement.value} dB`);
}

// #endregion

// Export modules
export * from './modules/synth.js';
export * from './modules/effects.js';
export * from './modules/sequences.js';

export default function App() {
  useEffect(() => {
    if (Tone.Transport.state === 'suspended') {
        Tone.start();
        console.log('Tone.js audio context initialized');
    }
  }, []);
  return (
    <Channel/>
  )
}