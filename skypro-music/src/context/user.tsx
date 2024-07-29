'use client'

import { getValueFromLocalStorage } from "@/lib/getValueFromLS";
import { tokenType, userType } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

type contextType = {
    user: null| userType,
    login: (newUser: userType, token: tokenType) => void,
    logout: () => void,
}

const initialContextValue:contextType = {
  user: null,
  login: (newUser, token) => {},
  logout: () => {},
};

export const UserConext = createContext(initialContextValue);
export const UserProvider = ({ children }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(getValueFromLocalStorage("user"));
  function login(newUser: userType, token:tokenType) {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", JSON.stringify(token));
    router.push("/tracks");
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <UserConext.Provider value={{ user, login, logout }}>
      {children}
    </UserConext.Provider>
  );
};
