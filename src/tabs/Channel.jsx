import React from 'react';
import TestSynth from '../components/TestSynth';
import ChangeSynth from '../components/ChangeSynth';
import AmpMod from '../components/AmpMod';

export default function Channel() {
    return (
        <div className="container">
            <h1>FunSom</h1>
            <p className="subtitle">Uma maneira ludica de aprender matematica e sound design!</p>
            
            <TestSynth />
            <ChangeSynth />
            <AmpMod />
        </div>
    )
}
