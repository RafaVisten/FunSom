// Entry point

import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.css'
import App, { onScaleClick, onToneClick, onStopClick, onOscSelectChange, onAmpLFOApply, onMasterVolChange } from './App'

import * as Tone from 'tone';

const root = createRoot(document.getElementById('root'))
root.render(<React.StrictMode><App/></React.StrictMode>)
