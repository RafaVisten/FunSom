import * as Tone from 'tone';

/**
 * Audio Helper Utilities
 * General audio and Tone.js helper functions
 */

/**
 * Initialize Tone.js audio context
 */
export async function initAudio() {
    if (Tone.Transport.state === 'suspended') {
        await Tone.start();
        console.log('🎵 Tone.js audio context initialized!');
    }
}

/**
 * Get current audio context state
 * @returns {string} State: 'suspended', 'running', 'stopped'
 */
export function getAudioState() {
    return Tone.Transport.state;
}

/**
 * Convert frequency (Hz) to note name
 * @param {number} frequency - Frequency in Hz
 * @returns {string} Note name (e.g., 'C4')
 */
export function frequencyToNote(frequency) {
    return Tone.Frequency(frequency).toNote();
}

/**
 * Convert note name to frequency (Hz)
 * @param {string} note - Note name (e.g., 'C4')
 * @returns {number} Frequency in Hz
 */
export function noteToFrequency(note) {
    return Tone.Frequency(note).toFrequency();
}

/**
 * Get all notes in an octave
 * @param {number} octave - Octave number (4, 5, etc.)
 * @returns {Array<string>} Array of note names
 */
export function getOctaveNotes(octave) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return notes.map(note => `${note}${octave}`);
}

/**
 * Get time now in Tone.js
 * @returns {number} Current time in seconds
 */
export function getNow() {
    return Tone.now();
}
