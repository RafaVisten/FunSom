// Manages audio effects and signal chain

import * as Tone from 'tone';
import { synth } from './synth.js';

/** Bypass all effects */
export function bypass() {
    synth.disconnect();
    synth.toDestination();
}

// #region Create effects

// Reverb
export const reverb = new Tone.Reverb({
    decay: 2.5
}).connect(Tone.Destination);

// Limiter
export const limiter = new Tone.Limiter(-1).toDestination();

// #endregion

// #region Connect effects

synth.connect(reverb);
synth.connect(limiter);

// #endregion