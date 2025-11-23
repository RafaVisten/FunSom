import React, { useState, useEffect } from 'react'
import * as Tone from 'tone';

// Tabs
import Channel from './tabs/Channel.jsx'
import Example from './tabs/Example.jsx'

// Export modules
export * from './modules/synth.js';
export * from './modules/effects.js';
export * from './modules/sequences.js';

export default function App() {
  useEffect(() => {
    if (Tone.Transport.state === 'suspended') {
        Tone.start();
        console.log('Tone.js audio context initialized');
    }
  }, []);

  const [activeTab, setActiveTab] = useState('channel');

  return (
      <>
        <div className="header-bar">
            <div className="tab-bar">
                <button
                    className={`tab-btn${activeTab === 'channel' ? ' active' : ''}`}
                    onClick={() => setActiveTab('channel')}
                >Channel</button>
                <button
                    className={`tab-btn${activeTab === 'example' ? ' active' : ''}`}
                    onClick={() => setActiveTab('example')}
                >Example</button>
            </div>
        <h1 className="app-title">FunSom</h1>
        </div>
        <div className="tab-content">
            {activeTab === 'channel' && <Channel />}
            {activeTab === 'example' && <Example />}
        </div>
      </>
  );
}