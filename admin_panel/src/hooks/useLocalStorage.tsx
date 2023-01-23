import { useState } from "react";

export const useLocalStorage = (keyName: string, defaultVlaue: any) => {
  const [storedVlaue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultVlaue));
        return defaultVlaue;
      }
    } catch (err) {
      return defaultVlaue;
    }
  });
  const setValue = (newValue: any) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedVlaue, setValue];
};
