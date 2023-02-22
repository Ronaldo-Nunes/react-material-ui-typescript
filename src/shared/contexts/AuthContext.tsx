import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
}

/**
 * CRIAÇÃO DO CONTEXTO TIPADO COM O PDRÃO DE TIPO DA INTERFACE IAUTHCONTXTDATA
 */
const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

interface IAuthProviderProps {
  children: ReactNode;
}
/**
 * CRIAÇÃO DO PROVIDER DE AUTENTICAÇÃO QUE É UM COMPONENTE REACT E SERÁ UTILIZADO NO ARQUIVO App.tsx
 * Assim, ele estará disponível em toda a aplicação, onde se poderá acessar suas propriedades e funções
 */
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();


  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    if (accessToken !== undefined && accessToken !== null) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }
  }, []);


  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.accessToken));
      setAccessToken(result.accessToken);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => accessToken !== undefined, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Criação de hook personalizado para acessar o contexto de autenticação
 * possibilitando o acesso ao contexto de qualquer lugar da aplicação
 * @returns Retorna um objeto AuthContext
 */
export const useAuthContext = () => useContext(AuthContext);

/**
 * Funções que são passadas por parâmetro no contexto devem estar em um useCallback
 */