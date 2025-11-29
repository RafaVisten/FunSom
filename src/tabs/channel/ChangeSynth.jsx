import React from 'react';
import { setOscillatorType, setVolume } from '@/modules/instrumentManager.js';

export function onOscSelectChange() {
    const selectElement = document.getElementById('oscSelect');
    const value = selectElement.value;
    setOscillatorType(value);
    console.log(`Oscillator type changed to: ${oscSelect.value}`);
}

export function onMasterVolChange() {
    const sliderElement = document.getElementById('masterVol');
    const value = parseFloat(sliderElement.value);
    setVolume(value);
    console.log(`Master volume changed to: ${sliderElement.value} dB`);
}

export default function ChangeSynth() {
    return (
        <>
        <h2> Change synth </h2>
        <div className="controls">
            <div className="sel full-width">
                <p className="subtitle"> Volume </p>
                <input type="range" id="masterVol" className="range" min="-20" max="0" defaultValue="-5" onChange={onMasterVolChange}></input>
            </div>
            <div className="sel">
                <p className="subtitle"> Oscillator type </p>
                <select id="oscSelect" name="Oscillator" onChange={onOscSelectChange}>
                    <option value="sine">Sine</option>
                    <option value="square">Square</option>
                    <option value="sawtooth">Sawtooth</option>
                    <option value="triangle">Triangle</option>
                </select>          
            </div>
        </div>
        </>
    )
}