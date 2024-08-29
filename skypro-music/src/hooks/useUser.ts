import { UserConext } from "@/context/user";
import { useContext } from "react";

export function useUser() {
    return useContext(UserConext);
}