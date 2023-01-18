import { createContext, useEffect, useState } from "react";

interface IGlobalContext {
  darkMode?: boolean | null;
  setDarkMode?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTheme: () => void;
}

export const GlobalContext = createContext<IGlobalContext | null>(null);

const GlobalProvider = ({ children }: { children: any }) => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };
  useEffect(() => {
    if (localStorage.getItem("darkMode") == null) {
      setDarkMode(
        window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches,
      );
      localStorage.setItem(
        "darkMode",
        JSON.stringify(
          window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches,
        ),
      );
    } else {
      setDarkMode(localStorage.getItem("darkMode") == "true");
    }
  }, []);
  useEffect(() => {
    if (darkMode != null && darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <GlobalContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
