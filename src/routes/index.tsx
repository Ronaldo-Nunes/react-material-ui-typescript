import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export function AppRoutes() {
  const { setDrawerOptions } = useDrawerContext();

  // Será chamado apenas uma vez (durante a construção do componente)
  // O array (segundo parâmetro) indica quais as propriedades que a função "ouviria" as mudanças para ser recarregada. Como está vazio, a chamada é única.
  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página inicial',
        icon: 'home',
        path: '/pagina-inicial'
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
}