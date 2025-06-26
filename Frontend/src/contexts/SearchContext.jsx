import React, {createContext,useContext,useState} from "react";

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
    const [searchQuery, setsearchQuery] = useState("");

    return (
        <SearchContext.Provider value={{searchQuery,setsearchQuery}}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);