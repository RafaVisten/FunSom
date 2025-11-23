import React from 'react';
import { onScaleClick, onToneClick, onStopClick } from '../App';

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