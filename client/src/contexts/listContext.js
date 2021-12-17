import { createContext, useState } from "react";

export const ListContext = createContext();

export const ListProvider = (props) => {

    const [list, setList] = useState(props.data);
   
    return (
        <ListContext.Provider value={[list, setList]}>
            {props.children}
        </ListContext.Provider>

    );
}