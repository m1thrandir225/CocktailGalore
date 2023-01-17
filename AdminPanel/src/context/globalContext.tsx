import {
  createSignal,
  createContext,
  useContext,
  Accessor,
  createEffect,
} from "solid-js";

export const GlobalContext = createContext<Itheme>();

interface IthemeActions {
  changeTheme: () => void;
}

interface Itheme {
  darkMode: Accessor<boolean>;
  actions: IthemeActions;
}

export function GlobalProvider(props) {
  const [darkMode, setDarkMode] = createSignal(
    localStorage.getItem("darkMode") == "true",
  );

  const theme = {
    darkMode,
    actions: {
      changeTheme: () => {
        setDarkMode(!darkMode());
        localStorage.setItem("darkMode", JSON.stringify(darkMode()));
        if (darkMode()) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    },
  };
  createEffect(() => {
    if (darkMode()) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
  console.log(darkMode());
  return (
    <GlobalContext.Provider value={theme}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export function useGlobal(): Itheme | undefined {
  return useContext(GlobalContext);
}
