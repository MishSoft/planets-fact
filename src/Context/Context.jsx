import React, { useState } from "react";

const Context = React.createContext();

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const ContextProvider = ({ Children }) => {
  const [isNav, setIsNav] = useState(false);
  return (
    <Context.Provider value={{ isNav, setIsNav }}>{Children}</Context.Provider>
  );
};

export { Context, ContextProvider };
