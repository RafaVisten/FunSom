import React from 'react';
import { setAmplitudeLFO } from '@/modules/instrumentManager.js';

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

export default function AmpMod() {
    return (
        <>
        <h2> Amplitude Automation </h2>
        <div className="controls">
            <div className="sel">
                <select id="ampLFOSelect" name="Amp LFO">
                    <option value="none">None</option>
                    <option value="sine">Sine</option>
                    <option value="affine">Affine</option>
                    <option value="quadratic">Quadratic</option>
                </select>   
            </div>
            <button className="btn" id="applyAmpBtn" onClick={onAmpLFOApply}>Apply</button>   

            <div className="sel full-width">
                <p className="subtitle"> Parameters </p>
                <input id="params" className="textbox" type="text" defaultValue='{"a":1,"b":0,"c":0,"speed":0.5}'></input>
            </div>
                        
        </div>
        </>
    )
}