import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { axiosInstance } from "../service/axiosInstance";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

interface IAuthContext {
  userId: string | null;
  currentUser: null | Record<string, any>;
  isAuthenticated: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  renewToken: (email: string) => Promise<void>;
  isAuthLoading: boolean;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<null | Record<string, any>>(
    null
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const initialToken = Cookies.get("access_token");
    if (initialToken) {
      setToken(initialToken);
    }

    const checkAuthentication = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token) as { email: string; _id?: string };
          const email = decoded.email;
          if (email) {
            await renewToken(email);
            setIsAuthenticated(true);
          }
          const userId = decoded._id || null;
          setUserId(userId);
        } catch (e) {
          console.error("Token inválido", e);
          setIsAuthenticated(false);
          setUserId(null);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsAuthLoading(false);
    };

    checkAuthentication();
  }, [token]);

  useEffect(() => {
    setIsAuthenticated(currentUser !== null);
  }, [currentUser]);

  const register = async (email: string, password: string) => {
    const response = await axiosInstance.post(`/usuario/register`, {
      email,
      password,
    });
    setCurrentUser(response.data);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post(`/usuario/login`, {
        email,
        password,
      });
      setCurrentUser(response.data);
      const newToken = response.data.access_token;
      setToken(newToken);
      setIsAuthLoading(false);
    } catch (error) {
      setIsAuthLoading(false);
      // Manejar el error de autenticación aquí
    }
  };

  const renewToken = async (email: string) => {
    const response = await axiosInstance.post("/usuario/renew", { email });
    setCurrentUser(response.data);
  };

  const value = {
    userId,
    currentUser,
    isAuthenticated,
    register,
    login,
    renewToken,
    isAuthLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
