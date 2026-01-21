import {createContext, Dispatch} from 'react';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface UserAuthContextType {
    loggedIn: boolean;
    setLoggedIn: Dispatch<React.SetStateAction<boolean>>;
    role: string;
    setRole: Dispatch<React.SetStateAction<string>>;
    user: User | null;
    setUser: Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
}

export const UserAuthContext = createContext<UserAuthContextType>({} as UserAuthContextType);