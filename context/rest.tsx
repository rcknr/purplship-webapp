import React, { useContext } from "react";
import { PurplshipClient } from "@/api/index";
import { TokenData } from "@/context/token-query";
import { collectToken } from "@/library/helper";


export const RestClient = React.createContext<PurplshipClient>(
    new PurplshipClient({ apiKey: collectToken(), basePath: '' })
);

const RestClientContext: React.FC = ({ children }) => {
    const { token } = useContext(TokenData);
    const setupClient = (apiKey: string) => new PurplshipClient({ 
        apiKey, basePath: '' 
    });

    return (
        <RestClient.Provider value={setupClient(token.key)}>
            {children}
        </RestClient.Provider>
    );
};

export default RestClientContext;
