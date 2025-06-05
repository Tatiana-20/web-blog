import { MdOutlineLightMode, MdDarkMode, MdComputer } from "react-icons/md";

export const themeOptions: {
  value: "light" | "dark" | "system";
  icon: React.ReactNode;
}[] = [
  {
    value: "light",
    icon: <MdOutlineLightMode className="h-5 w-5" />,
  },
  {
    value: "dark",
    icon: <MdDarkMode className="h-5 w-5" />,
  },
  {
    value: "system",
    icon: <MdComputer className="h-5 w-5" />,
  },
];
