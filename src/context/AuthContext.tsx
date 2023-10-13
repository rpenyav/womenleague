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

/**
 * Interface describing the shape of the authentication context.
 */
interface IAuthContext {
  userId: string | null;
  currentUser: null | Record<string, any>;
  isAuthenticated: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  renewToken: (email: string) => Promise<void>;
  isAuthLoading: boolean;
}

/**
 * Creates a React Context for Authentication.
 */
export const AuthContext = createContext<IAuthContext | undefined>(undefined);

/**
 * Custom React Hook to use the authentication context.
 * @returns The authentication context.
 * @throws Will throw an error if not used within `AuthProvider`.
 */
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * Interface describing the props for AuthProvider component.
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider component to wrap around components that require authentication state.
 * @param children - The child components.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<null | Record<string, any>>(
    null
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  /**
   * Effect to check for existing access token and renew if present.
   */
  useEffect(() => {
    const token = Cookies.get("access_token");

    const checkAuthentication = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token) as {
            email: string;
            _id?: string;
          };
          const email = decoded.email;
          if (email) {
            await renewToken(email);
          }
          const userId = decoded._id || null;
          setUserId(userId);
        } catch (e) {
          console.error("Token inválido", e);
        }
      }
      setIsAuthLoading(false);
    };

    checkAuthentication();
  }, []);
  /**
   * Effect to update the `isAuthenticated` state based on the presence of `currentUser`.
   */
  useEffect(() => {
    setIsAuthenticated(currentUser !== null);
  }, [currentUser]);

  /**
   * Function to register a user.
   * @param email - User's email.
   * @param password - User's password.
   */
  const register = async (email: string, password: string) => {
    const response = await axiosInstance.post(`/usuario/register`, {
      email,
      password,
    });
    setCurrentUser(response.data);
  };

  /**
   * Function to log a user in.
   * @param email - User's email.
   * @param password - User's password.
   */
  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post(`/usuario/login`, {
        email,
        password,
      });
      setCurrentUser(response.data);
      setIsAuthLoading(false); // La autenticación se ha completado con éxito
    } catch (error) {
      setIsAuthLoading(false); // La autenticación ha fallado
      // Manejar el error de autenticación aquí
    }
  };

  /**
   * Function to renew user's authentication token.
   * @param email - User's email.
   */
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
