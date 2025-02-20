import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isSignedIn: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    loadAuthState().catch(console.error);
  }, []);

  async function loadAuthState() {
    try {
      const token = await AsyncStorage.getItem("userToken");
      setIsSignedIn(!!token);
    } catch (e) {
      console.error("Auth State Load Error:", e);
      setIsSignedIn(false);
    } finally {
      setIsLoading(false);
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Replace with actual API call
      if (email && password) {
        await AsyncStorage.setItem("userToken", "dummy-token");
        setIsSignedIn(true);
      }
    } catch (e) {
      console.error("Sign In Error:", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem("userToken");
      setIsSignedIn(false);
    } catch (e) {
      console.error("Sign Out Error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLoading, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("useAuth must be used within an AuthProvider");
    return {
      signIn: async () => {},
      signOut: async () => {},
      isLoading: false,
      isSignedIn: false,
    };
  }
  return context;
};
