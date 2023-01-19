import { createContext, useState, useEffect } from "react";

interface IGlobalContext {
  darkMode: boolean;
  toggleDarkMode: () => void;
  sideBarCollapsed: boolean;
  setSideBarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<IGlobalContext | null>(null);

export default function GlobalProvider({ children }: { children: any }) {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const [sideBarCollapsed, setSideBarCollapsed] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };
  //initial dark mode if its saved in local sotrage get it other wise check default device theme
  useEffect(() => {
    if (darkMode === null) {
      const savedPreference = localStorage.getItem("darkMode");
      if (savedPreference) {
        setDarkMode(JSON.parse(savedPreference));
      } else {
        setDarkMode(
          window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches,
        );
      }
    }
  }, []);
  //add or remove dark class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <GlobalContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        setSideBarCollapsed,
        sideBarCollapsed,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext };
