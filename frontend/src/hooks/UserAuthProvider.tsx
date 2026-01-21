import {ReactNode, useState, useEffect} from 'react';
import { UserAuthContext, User } from './UserAuthContext';
import { authAPI } from '@/services/apiService';

interface UserAuthProviderProps {
    children: ReactNode;
}

export const UserAuthProvider = ({children}:UserAuthProviderProps) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check session on mount
        const checkSession = async () => {
            try {
                const sessionData = await authAPI.checkSession();
                if (sessionData.loggedIn && sessionData.user) {
                    setLoggedIn(true);
                    setRole(sessionData.user.role || sessionData.role || 'patient');
                    setUser({
                        id: sessionData.user.id,
                        name: sessionData.user.name,
                        email: sessionData.user.email,
                        role: sessionData.user.role || sessionData.role || 'patient'
                    });
                } else {
                    setLoggedIn(false);
                    setRole("");
                    setUser(null);
                }
            } catch (error) {
                console.error("Session check failed:", error);
                setLoggedIn(false);
                setRole("");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    return (
        <UserAuthContext.Provider value={{loggedIn, setLoggedIn, role, setRole, user, setUser, loading}}>
            {children}
        </UserAuthContext.Provider>
    )
}