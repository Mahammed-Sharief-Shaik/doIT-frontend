import { createContext, useEffect, useState } from "react";



const GlobalContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    tasks: [],
    totalTasks: 0,
    setTotalTasks: () => { }
});

const GlobalContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);

    useEffect(() => {
        if (!localStorage.getItem('token')) setIsLoggedIn(false);
        else setIsLoggedIn(true);
    }, []);

    return (

        <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn, tasks, setTasks, totalTasks, setTotalTasks }}>
            {children}
        </GlobalContext.Provider>
    )
};

export { GlobalContext, GlobalContextProvider };