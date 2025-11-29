import * as synth from "./instruments/synth.js";
import * as Tone from "tone";

let currentInstrument = synth;

export function playNote(...args) {
    return currentInstrument.playNote(...args);
}

export function stop(...args) {
    return currentInstrument.stopSynth(...args);
}

export function setVolume(db) {
    return currentInstrument.setMasterVolume(db);
}

export function setAmplitudeLFO(func, params) {
    return currentInstrument.setAmplitudeLFO(func, params);
}

export function setOscillatorType(type) {
    return currentInstrument.setOscillatorType(type);
}

export function getCurrentInstrument() {
    return "synth";
}

export function playSequence(notes, tempo = 120) {
    const now = Tone.now();
    const beat = (60 / tempo) * 0.5;

    notes.forEach((note, i) => {
        playNote(note, "8n", now + i * beat);
    });
}

export function playCMajorScale() {
    const cMajorScale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
    playSequence(cMajorScale, 120);
}