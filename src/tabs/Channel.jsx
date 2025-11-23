import React from 'react';
import TestSynth from './channel/TestSynth';
import ChangeSynth from './channel/ChangeSynth';
import AmpMod from './channel/AmpMod';

export default function Channel() {
    return (
        <div className="container">
            <TestSynth />
            <ChangeSynth />
            <AmpMod />
        </div>
    )
}
