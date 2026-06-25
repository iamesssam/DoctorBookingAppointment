import { createContext } from "react";


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const calcAge = (dob) => {
        const day = new Date();
        const birthDate = new Date(dob);

        let age = day.getFullYear() - birthDate.getFullYear();
        return age;
    }
    const value = {
        calcAge
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;