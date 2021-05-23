import React from "react";
import { PurplshipClient } from "@/api/index";


export const RestClient = React.createContext<PurplshipClient>(new PurplshipClient({ basePath: '' }));

const RestClientContext: React.FC = ({ children }) => {
    return (
        <RestClient.Provider value={new PurplshipClient({ basePath: '' })}>
            {children}
        </RestClient.Provider>
    );
};

export default RestClientContext;
