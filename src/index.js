/**
 * FunSom - Entry Point
 * 
 * This file initializes the application and sets up UI event listeners
 */

import * as Tone from 'tone';
import { initApp, onScaleClick, onToneClick, onStopClick, onOscSelectChange, onAmpLFOApply } from './app.js';
import { onMasterVolChange } from './app.js';
import './styles/style.css';

// DOM Elements

const masterVolSlider = document.getElementById('masterVol');
const scaleBtn = document.getElementById('scaleBtn');
const stopBtn = document.getElementById('stopBtn');
const toneBtn = document.getElementById('toneBtn');
const oscSelect = document.getElementById('oscSelect');
const ampLFOSelect = document.getElementById('ampLFOSelect');
const applyAmpBtn = document.getElementById('applyAmpBtn');

// Initialize application
async function init() {
    await initApp();
    setupEventListeners();
    console.log('🎵 FunSom loaded!');
}

/**
 * Setup button click event listeners
 */
function setupEventListeners() {
    scaleBtn.addEventListener('click', async () => {
        // Ensure audio context is started
        if (Tone.Transport.state === 'suspended') {
            await Tone.start();
        }
        onScaleClick();
    });

    stopBtn.addEventListener('click', () => {
        onStopClick();
    });

    toneBtn.addEventListener('click', () => {
        onToneClick();
    });

    oscSelect.addEventListener('change', () => {
        onOscSelectChange();
        console.log(`Oscillator type changed to: ${oscSelect.value}`);
    });

    applyAmpBtn.addEventListener('click', () => {
        onAmpLFOApply();
        console.log(`Amplitude LFO changed to: ${ampLFOSelect.value}`);
    });

    masterVolSlider.addEventListener('input', () => {
        onMasterVolChange();
        console.log(`Master volume changed to: ${masterVolSlider.value} dB`);
    });
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
