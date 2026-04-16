import { Session } from "@supabase/supabase-js";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../utils/supabase";

export interface AppUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  register: (
    email: string,
    password: string,
    name: string,
  ) => Promise<{ error: any }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatUser = (session: Session | null): AppUser | null => {
    if (!session?.user) return null;
    return {
      id: session.user.id,
      email: session.user.email || "",
      name: session.user.user_metadata?.name || "User",
    };
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(formatUser(session));
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(formatUser(session));
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- THE CORE SUPABASE FUNCTIONS ---

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const register = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
