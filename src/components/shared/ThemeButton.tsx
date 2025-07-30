import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const handleTheme = () => {
    const value = theme === "light" ? "dark" : "light";
    setTheme(value);
  };
  return (
    <button onClick={handleTheme} className="cursor-pointer">
      {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeButton;
