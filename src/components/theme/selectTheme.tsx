"use client";
import useThemeMode from "@/hooks/useThemeMode";
import { useEffect, useRef, useState, useTransition } from "react";
import { themeOptions } from "@/interfaces/theme.interface";
import ClickOutSide from "@/common/ClickOutSide/ClickOutSide";

const SelectTheme = () => {
  const [theme, setTheme] = useThemeMode();
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const buttonClass =
    "cursor-pointer rounded-lg px-4 py-2 w-full text-center truncate";

  useEffect(() => {
    if (showDropdown) {
      setTimeout(() => {
        const dropdown = dropdownRef.current;
        if (dropdown) {
          const rect = dropdown.getBoundingClientRect();
          const spaceBelow = window.innerHeight - rect.bottom;
          const spaceAbove = rect.top;
          setDropUp(spaceBelow < 200 && spaceAbove > spaceBelow);
        }
      }, 0);
    }
  }, [showDropdown]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChangeTheme = (tm: "light" | "dark" | "system") => {
    if (isPending) return;
    if (theme === tm) return;
    startTransition(() => setTheme(tm));
    setShowDropdown(false);
  };

  const selectedThemeOption =
    themeOptions.find((t) => t.value === theme) || themeOptions[0];

  return !isMounted ? null : (
    <ClickOutSide
      onclick={() => setShowDropdown(false)}
      className="relative"
    >
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`${buttonClass} gap-x-2 flex items-center justify-between bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-950 dark:text-slate-50`}
      >
        <span className="flex items-center">{selectedThemeOption?.icon}</span>
        <span className="flex items-center italic font-semibold text-sm">
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </span>
      </button>

      <ul
        ref={dropdownRef}
        className={`w-30 left-0 right-auto md:left-auto md:right-0 duration-300 ease-linear shadow-md absolute z-10 bg-slate-50 dark:bg-gray-800 mt-2 overflow-hidden rounded-sm
          ${
            showDropdown
              ? "max-h-60 border border-gray-300 dark:border-gray-700"
              : "max-h-0 border-0 border-gray-300/0 dark:border-gray-700/0"
          }
          ${dropUp ? "bottom-full mb-2" : "top-full mt-2"}
        `}
      >
        {themeOptions.map((t) => (
          <li key={t.value}>
            <button
              onClick={() => handleChangeTheme(t.value)}
              className={`w-full cursor-pointer text-left px-4 py-2 flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-700 
                ${
                  t.value === theme
                    ? "text-sky-500"
                    : "text-slate-950 dark:text-slate-50"
                }`}
            >
              <span className="flex items-center gap-x-2">
                {t.icon}
                {t.value.charAt(0).toUpperCase() + t.value.slice(1)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </ClickOutSide>
  );
};

export default SelectTheme;
