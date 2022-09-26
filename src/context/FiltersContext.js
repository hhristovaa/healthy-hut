import React from "react";

const FiltersContext = React.createContext({
    recipes: [],
    filterHandler: (filters) => {}
});

export default FiltersContext;