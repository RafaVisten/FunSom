import * as Tone from 'tone';
import { synth } from './synth.js';

/**
 * Effects Module
 * Manages audio effects and signal chain
 */

// Create reverb effect
export const reverb = new Tone.Reverb({
    decay: 2.5
}).connect(Tone.Destination);

// Connect synth to reverb
synth.connect(reverb);

/**
 * Update reverb decay time
 * @param {number} decay - Decay time in seconds
 */
export function setReverbDecay(decay) {
    reverb.decay = decay;
}

/**
 * Add delay effect to the chain
 * @param {number} time - Delay time in seconds
 * @param {number} feedback - Feedback amount (0-1)
 */
export function addDelay(time = '8n', feedback = 0.3) {
    const delay = new Tone.Delay(time);
    delay.feedback.value = feedback;
    reverb.disconnect();
    synth.disconnect();
    synth.connect(delay);
    delay.connect(reverb);
    reverb.connect(Tone.Destination);
    return delay;
}

/**
 * Bypass all effects
 */
export function bypassEffects() {
    synth.disconnect();
    synth.toDestination();
}
