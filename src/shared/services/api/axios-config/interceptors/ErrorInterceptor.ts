import { AxiosError } from 'axios';


export const errorInterceptor = (error: AxiosError) => {
  if (error.code === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão.'));
  }

  if (error.response?.status === 401) {
    // retornar erro em caso de falha na autenticação
  }

  return Promise.reject(error);
};