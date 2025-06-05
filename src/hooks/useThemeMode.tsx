import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const useThemeMode = () => {
  const [theme, setTheme] = useLocalStorage<"light" | "dark" | "system">(
    "color-theme",
    "system"
  );

  useEffect(() => {
    const className = "dark";
    const html = window.document.documentElement;

    const getSystemTheme = () => {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    };
    const appliedTheme = theme === "system" ? getSystemTheme() : theme;

    if (appliedTheme === "dark") {
      html.setAttribute("data-theme", className);
    } else {
      html.removeAttribute("data-theme");
    }

    window.dispatchEvent(new CustomEvent("theme-change", { detail: theme }));
  }, [theme]);

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      if (event instanceof CustomEvent) {
        setTheme(event.detail);
      }
    };

    window.addEventListener("theme-change", handleThemeChange);

    return () => {
      window.removeEventListener("theme-change", handleThemeChange);
    };
  }, [setTheme]);

  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = () => {
      setTheme("system");
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, [theme, setTheme]);

  return [theme, setTheme] as const;
};

export default useThemeMode;
