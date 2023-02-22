import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Login, MenuLateral } from './shared/components';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';

import './shared/forms/TraducoesYup';


export function App() {
  return (
    <AuthProvider>

      <AppThemeProvider>

        <Login> {/** Se o usuário não estiver autenticado, nenhum componente interno ao login será exibido */}

          <DrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </DrawerProvider>

        </Login>

      </AppThemeProvider>

    </AuthProvider>
  );
}
