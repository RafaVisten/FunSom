import React from 'react';
import { stop, playNote, playCMajorScale } from '@/modules/instrumentManager.js';

export default function TestInst() {

    function onScaleClick() {
        playCMajorScale();
    }

    function onToneClick() {
        playNote('C4', '1n');
    }

    function onStopClick() {
        stop();
    }

    return (
        <>
        <h2> Test instrument </h2>
        <div className="controls">  
            <button className="btn" id="scaleBtn" onClick={onScaleClick}>Scale</button>
            <button className="btn" id="toneBtn" onClick={onToneClick}>Tone</button>
            <button className="btn" id="stopBtn" onClick={onStopClick}>Stop</button>
        </div>
        </>
    )
}