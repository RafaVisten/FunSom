import * as Tone from 'tone';
import { synth } from './synth.js';

/**
 * Melodies Module
 * Pre-made melody sequences and melody playback utilities
 */

/**
 * Play a sequence of notes
 * @param {Array<string>} notes - Array of notes to play
 * @param {number} tempo - Tempo in BPM (default: 120)
 */
export function playSequence(notes, tempo = 120) {
    const now = Tone.now();
    const beatDuration = (60 / tempo) * 0.5; // 8th note duration
    
    notes.forEach((note, index) => {
        synth.triggerAttackRelease(note, '8n', now + index * beatDuration);
    });
}

/**
 * Play C major scale
 */
export function playCMajorScale() {
    const cMajorScale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
    playSequence(cMajorScale, 120);
}

/**
 * Play A minor arpeggio
 */
export function playAMinorArpeggio() {
    const aMinorArpeggio = ['A3', 'C4', 'E4', 'A4', 'E4', 'C4'];
    playSequence(aMinorArpeggio, 100);
}

/**
 * Play pentatonic scale
 */
export function playPentatonicScale() {
    const pentatonic = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'];
    playSequence(pentatonic, 120);
}

// Collection of melodies
export const melodies = {
    cMajorScale: playCMajorScale,
    aMinorArpeggio: playAMinorArpeggio,
    pentatonic: playPentatonicScale
};
