import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggle: () => {} });

function getInitial() {
  try {
    const s = localStorage.getItem("mj-theme");
    if (s === "light" || s === "dark") return s;
  } catch { /* ignore */ }
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem("mj-theme", theme); } catch { /* ignore */ }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
