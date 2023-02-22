import { Api } from '../axios-config';

interface IAuth {
  accessToken: string;
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.get('/auth', { data: { email, password } });
    if (data !== null && data !== undefined) {
      return data;
    }

    return new Error('Erro ao efetuar o login!');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao efetuar o login!');
  }

};

export const AuthService = {
  auth,

};