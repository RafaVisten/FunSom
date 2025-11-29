import React from 'react';
import TestInst from './channel/TestInst';
import ChangeInst from './channel/ChangeInst';
import AmpMod from './channel/AmpMod';

export default function Channel() {
    return (
        <div className="container">
            <TestInst />
            <ChangeInst />
            <AmpMod />
        </div>
    )
}
