import React, { useState } from 'react';
import { setOscillatorType, setVolume, selectInstrument } from '@/modules/instrumentManager.js';

export default function ChangeInst() {
    const [instrument, setInstrument] = useState('synth');
    const [masterVol, setMasterVol] = useState(-5);

    function onInstChange(e) {
        const value = e.target.value;
        setInstrument(value);
        selectInstrument(value);
        console.log('Instrument changed:', value);
    }

    function onOscChange(e) {
        const value = e.target.value;
        setOscillatorType(value);
        console.log('Oscillator type changed:', value);
    }

    function onVolChange(e) {
        const value = parseFloat(e.target.value);
        setMasterVol(value);
        setVolume(value);
        console.log('Master volume changed:', value);
    }

    return (
        <>
        <h2> Change instrument </h2>
        <div className="controls">
            <div className="sel full-width">
                <p className="subtitle"> Volume </p>
                <input
                    type="range"
                    id="masterVol"
                    className="range"
                    min="-20"
                    max="0"
                    value={masterVol}
                    onChange={onVolChange}
                />
            </div>
            <div className="sel">
                <p className="subtitle"> Instrument </p>
                <select id="instSelect" name="Instrument" value={instrument} onChange={onInstChange}>
                    <option value="synth">Synth</option>
                    <option value="other">Other</option>
                </select>
            </div>

            {instrument === 'synth' && (
            <div className="sel">
                <p className="subtitle"> Oscillator type </p>
                <select id="oscSelect" name="Oscillator" onChange={onOscChange} defaultValue="sine">
                    <option value="sine">Sine</option>
                    <option value="square">Square</option>
                    <option value="sawtooth">Sawtooth</option>
                    <option value="triangle">Triangle</option>
                </select>
            </div>
            )}
        </div>
        </>
    )
}