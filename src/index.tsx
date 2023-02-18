import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// Inluir arquivos nas pastas mesmo que vazias para incluí-las no versionamento de código
// Fazer commits pequenos
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
