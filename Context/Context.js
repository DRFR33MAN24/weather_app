import React from "react";

const GlobalContext = React.createContext({
  theme: "",
  setTheme: () => {},
});

export default GlobalContext;
