import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import {
  Dashboard,
  DetalheDeCidades,
  ListagemDeCidades,
  DetalheDePessoas,
  ListagemDePessoas
} from '../pages';

export function AppRoutes() {
  const { setDrawerOptions } = useDrawerContext();

  // Será chamado apenas uma vez (durante a construção do componente)
  // O array (segundo parâmetro) indica quais as propriedades que a função "ouviria" as mudanças para ser recarregada. Como está vazio, a chamada é única.
  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home', // Ícone do material UI
        label: 'Página inicial',
        path: '/pagina-inicial'
      },
      {
        icon: 'people', // Ícone do material UI
        label: 'Pessoas',
        path: '/pessoas'
      },
      {
        icon: 'location_city', // Ícone do material UI
        label: 'Cidades',
        path: '/cidades'
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path='/pessoas/detalhe/:id' element={<DetalheDePessoas />} /> 
      {/* O termo :id é um paraâmetro, poderá receber qualquer valor */}

      <Route path="/cidades" element={<ListagemDeCidades />} />
      <Route path='/cidades/detalhe/:id' element={<DetalheDeCidades />} /> 

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
}