/**
 * Note Utilities
 * Music theory helpers and note utilities
 */

// Standard note names
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * Get the next note in sequence
 * @param {string} note - Current note (e.g., 'C4')
 * @returns {string} Next note
 */
export function getNextNote(note) {
    const match = note.match(/([A-G]#?)(\d+)/);
    if (!match) return null;
    
    const [, noteName, octave] = match;
    const noteIndex = NOTES.indexOf(noteName);
    const nextIndex = (noteIndex + 1) % NOTES.length;
    const nextOctave = nextIndex === 0 ? parseInt(octave) + 1 : parseInt(octave);
    
    return `${NOTES[nextIndex]}${nextOctave}`;
}

/**
 * Get the previous note in sequence
 * @param {string} note - Current note (e.g., 'C4')
 * @returns {string} Previous note
 */
export function getPreviousNote(note) {
    const match = note.match(/([A-G]#?)(\d+)/);
    if (!match) return null;
    
    const [, noteName, octave] = match;
    const noteIndex = NOTES.indexOf(noteName);
    const prevIndex = (noteIndex - 1 + NOTES.length) % NOTES.length;
    const prevOctave = prevIndex === 11 ? parseInt(octave) - 1 : parseInt(octave);
    
    return `${NOTES[prevIndex]}${prevOctave}`;
}

/**
 * Get interval (in semitones) between two notes
 * @param {string} note1 - First note
 * @param {string} note2 - Second note
 * @returns {number} Interval in semitones (positive = note2 is higher)
 */
export function getInterval(note1, note2) {
    const match1 = note1.match(/([A-G]#?)(\d+)/);
    const match2 = note2.match(/([A-G]#?)(\d+)/);
    
    if (!match1 || !match2) return null;
    
    const [, noteName1, octave1] = match1;
    const [, noteName2, octave2] = match2;
    
    const index1 = NOTES.indexOf(noteName1) + parseInt(octave1) * 12;
    const index2 = NOTES.indexOf(noteName2) + parseInt(octave2) * 12;
    
    return index2 - index1;
}

/**
 * Transpose a note by a number of semitones
 * @param {string} note - Note to transpose
 * @param {number} semitones - Number of semitones (positive = up, negative = down)
 * @returns {string} Transposed note
 */
export function transposeNote(note, semitones) {
    const match = note.match(/([A-G]#?)(\d+)/);
    if (!match) return null;
    
    const [, noteName, octave] = match;
    let noteIndex = NOTES.indexOf(noteName);
    let octaveNum = parseInt(octave);
    
    noteIndex += semitones;
    octaveNum += Math.floor(noteIndex / 12);
    noteIndex = ((noteIndex % 12) + 12) % 12;
    
    return `${NOTES[noteIndex]}${octaveNum}`;
}

/**
 * Get major scale starting from a note
 * @param {string} root - Root note (e.g., 'C4')
 * @returns {Array<string>} Array of notes in the major scale
 */
export function getMajorScale(root) {
    const intervals = [0, 2, 4, 5, 7, 9, 11];
    return intervals.map(interval => transposeNote(root, interval));
}

/**
 * Get minor scale starting from a note
 * @param {string} root - Root note (e.g., 'A4')
 * @returns {Array<string>} Array of notes in the minor scale
 */
export function getMinorScale(root) {
    const intervals = [0, 2, 3, 5, 7, 8, 10];
    return intervals.map(interval => transposeNote(root, interval));
}

/**
 * Get pentatonic scale starting from a note
 * @param {string} root - Root note
 * @returns {Array<string>} Array of notes in the pentatonic scale
 */
export function getPentatonicScale(root) {
    const intervals = [0, 2, 4, 7, 9];
    return intervals.map(interval => transposeNote(root, interval));
}
