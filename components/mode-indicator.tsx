import React, { useContext } from 'react';
import { AppMode } from '@/context/app-mode';

const ModeIndicator: React.FC = () => {
    const { testMode } = useContext(AppMode);

    return (
        <>
            {testMode && <div className="mode-indicator">
                <div className="mode-indicator-container">
                    <span className="mode-indicator-label has-text-weight-semibold">TEST DATA</span>
                </div>
            </div>}
        </>
    )
};

export default ModeIndicator;