import { createContext, useContext, useState } from "react";

export type User = {
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
  isLogin: boolean;
};

export type UserDto = Omit<User, "isLogin">;

type UserContextProps = {
  user: User | undefined;
  login: (user: UserDto) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextProps>({
  user: undefined,
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    email: "amm926616@gmail.com",
    name: "Aung Myint Myat",
    phoneNumber: "09123456789",
    password: "password",
    isLogin: true,
  });

  const login = (user: UserDto) => {
    setUser({ ...user, isLogin: true });
  };

  const logout = () => {
    setUser({
      ...user,
      isLogin: false,
    });
  };

  const value = { user, login, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
