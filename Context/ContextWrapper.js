import React, { useEffect, useState } from "react";

import Context from "./Context";
import * as SecureStore from "expo-secure-store";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);

  return result;
}

export default function ContextWrapper(props) {
  const [theme, setTheme] = useState(() => {
    (async function () {
      if (JSON.parse(await getValueFor("theme"))) {
        return JSON.parse(await getValueFor("theme"));
      } else {
        return "light";
      }
    })();
  });

  useEffect(() => {
    (async function () {
      save("theme", JSON.stringify(theme));
    })();
    console.log(theme);
  }, [theme]);

  return (
    <Context.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
