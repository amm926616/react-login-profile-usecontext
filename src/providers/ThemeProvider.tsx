import { createContext, useContext, useState } from "react";

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

export type ThemeContextProps = {
  theme: Theme | null;
  changeTheme: (theme: Theme | null) => void;
};

const themeContextDefaultValues = {
  theme: null,
  changeTheme: () => {},
};

const ThemeContext = createContext<ThemeContextProps>(
  themeContextDefaultValues,
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme | null>({
    name: "light",
    colors: {
      primary: "#007bff",
      secondary: "#6c757d",
      background: "#f8f9fa",
      text: "#212529",
    },
  });

  const changeTheme = (newTheme: Theme | null) => {
    setTheme(newTheme);
  };

  const themeValue = { theme, changeTheme };

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
