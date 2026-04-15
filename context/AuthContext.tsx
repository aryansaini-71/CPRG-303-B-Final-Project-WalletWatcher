import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

// Define what a User looks like
export interface User {
  name: string;
  email: string;
}

// Define everything our Auth Store will provide
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Helps us wait while checking storage

  // When the app starts, check if they are already logged in
  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const savedUser = await AsyncStorage.getItem("@wallet_user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    }
    checkLoginStatus();
  }, []);

  //All Mock Logic

  // Just takes the email and creates a dummy user
  const login = async (email: string) => {
    const mockUser = { name: "Aryan Saini", email: email };
    setUser(mockUser);
    await AsyncStorage.setItem("@wallet_user", JSON.stringify(mockUser));
  };

  // Takes name and email and logs them in
  const register = async (name: string, email: string) => {
    const newUser = { name: name, email: email };
    setUser(newUser);
    await AsyncStorage.setItem("@wallet_user", JSON.stringify(newUser));
  };

  // Clears the state and deletes from storage
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("@wallet_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use Auth easily in other files
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
