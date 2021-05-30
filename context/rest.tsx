import React from "react";
import { PurplshipClient } from "@/api/index";
import { getCookie } from "@/library/helper";


const configuration = {
    basePath: '',
    headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
    }
};

export const RestClient = React.createContext<PurplshipClient>(new PurplshipClient(configuration));

const RestClientContext: React.FC = ({ children }) => (
    <RestClient.Provider value={new PurplshipClient(configuration)}>{children}</RestClient.Provider>
);

export default RestClientContext;
