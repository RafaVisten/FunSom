import React from 'react';
import { playCMajorScale } from '@/modules/sequences.js';
import { stopSynth, playNote } from '@/modules/synth.js';

export function onScaleClick() {
    playCMajorScale();
}

export function onToneClick() {
    playNote('C4', '1n');
}

export function onStopClick() {
    stopSynth();
}

export default function TestSynth() {
    return (
        <>
        <h2> Test synth </h2>
        <div className="controls">  
            <button className="btn" id="scaleBtn" onClick={onScaleClick}>Scale</button>
            <button className="btn" id="toneBtn" onClick={onToneClick}>Tone</button>
            <button className="btn" id="stopBtn" onClick={onStopClick}>Stop</button>
        </div>
        </>
    )
}