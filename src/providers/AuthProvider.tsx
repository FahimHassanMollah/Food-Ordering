import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Children, createContext, useContext, useEffect, useState } from "react";

type AuthData = {
    session: Session | null;
    loading: boolean;
};
const AuthContext = createContext<AuthData>({
    session: null,
    loading: false,
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            setSession(data.session);
            setIsLoading(false);
        }
        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log(session?.user?.email,"from sub");
            
            setSession(session);
        });
    }, [])

    return (
        <AuthContext.Provider value={{ session, loading: isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    return useContext(AuthContext);
}
