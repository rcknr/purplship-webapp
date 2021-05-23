import React, { useEffect, useState } from "react";


type FeatureFlagType = {
    ADDRESS_AUTO_COMPLETE: boolean,
    MULTI_ORGANIZATIONS: boolean
};

export function collectFeatureFlags(): FeatureFlagType {
    const script = document.getElementById('data-flags');
    const value = JSON.parse(script?.textContent || "{}");

    return value;
}


export const FeatureFlags = React.createContext<FeatureFlagType>(collectFeatureFlags());

const FeatureFlagsContext: React.FC = ({ children }) => {
    const [features, update] = useState<FeatureFlagType>(collectFeatureFlags());

    useEffect(() => { update(collectFeatureFlags()); }, []);

    return (
        <FeatureFlags.Provider value={features}>
            {children}
        </FeatureFlags.Provider>
    );
};

export default FeatureFlagsContext;
