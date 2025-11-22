// Define and manage note sequences

import * as Tone from 'tone';
import { synth, resetModulation, ampEnv } from './synth.js';

/**
 * @param {Array<string>} notes - Array of notes to play, eg. ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
 */
export function playSequence(notes) {
    const now = Tone.now();
    const tempo = 120;
    const beat = (60 / tempo) * 0.5; // 8th note

    resetModulation();

    notes.forEach((note, i) => {
        synth.triggerAttackRelease(note, "8n", now + i * beat);
        ampEnv.triggerAttackRelease("4n", now + i * beat);
    });
}

// #region Test sequences

export function playCMajorScale() {
    const cMajorScale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
    playSequence(cMajorScale, 120);
}

export function playAMinorArpeggio() {
    const aMinorArpeggio = ['A3', 'C4', 'E4', 'A4', 'E4', 'C4'];
    playSequence(aMinorArpeggio, 100);
}

export function playPentatonicScale() {
    const pentatonic = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'];
    playSequence(pentatonic, 120);
}

// #endregion

