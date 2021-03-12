
import {createContext} from "react";

const initialState = {
    user: null,
    setUser: () => { }
}

export const AppContext = createContext(initialState);