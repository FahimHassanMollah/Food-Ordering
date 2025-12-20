import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Children, createContext, useContext, useEffect, useState } from "react";

type AuthData = {
    session: Session | null;
    profile: any;
    loading: boolean;
    isAdmin: boolean;
};
const AuthContext = createContext<AuthData>({
    session: null,
    profile: null,
    loading: false,
    isAdmin: false,
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setSession(session);
                // fetch profile
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(data || null);
            }
            setIsLoading(false);


        }
        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log(session?.user?.email, "from sub");

            setSession(session);
        });
    }, [])

    return (
        <AuthContext.Provider value={{ session, loading: isLoading, profile, isAdmin: profile?.group === 'ADMIN' }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    return useContext(AuthContext);
}
