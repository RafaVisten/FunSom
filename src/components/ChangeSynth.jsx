import React from 'react';
import { onOscSelectChange, onMasterVolChange } from '../App';

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