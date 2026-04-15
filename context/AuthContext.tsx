import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

export interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (name: string, email: string) => Promise<void>; // NEW: Ability to edit profile
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const savedUser = await AsyncStorage.getItem("@wallet_user");
        if (savedUser) setUser(JSON.parse(savedUser));
      } catch (error) {
        console.log("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    }
    checkLoginStatus();
  }, []);

  const login = async (email: string) => {
    // For our mock auth, we just extract a name from the email
    const fallbackName = email.split("@")[0];
    const mockUser = { name: fallbackName, email: email };
    setUser(mockUser);
    await AsyncStorage.setItem("@wallet_user", JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string) => {
    const newUser = { name, email };
    setUser(newUser);
    await AsyncStorage.setItem("@wallet_user", JSON.stringify(newUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("@wallet_user");
  };

  // NEW: Update existing user data
  const updateUser = async (name: string, email: string) => {
    const updatedUser = { name, email };
    setUser(updatedUser);
    await AsyncStorage.setItem("@wallet_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
