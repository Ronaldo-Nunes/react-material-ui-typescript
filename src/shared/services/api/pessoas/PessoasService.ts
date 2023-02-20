import { Enviroment } from './../../../environments/index';
import { Api } from '../axios-config';


export interface IListagemPessoa {
  id: number,
  email: string,
  cidadeId: number,
  nomeCompleto: string
}

export interface IDetalhePessoa {
  id: number,
  email: string,
  cidadeId: number,
  nomeCompleto: string
}

export type TPessoasComTotalCount = {
  data: IListagemPessoa[],
  totalCount: number
}

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);
    if (data !== null && data !== undefined) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS) // O Json-Server retorna o total de registros da consulta no header de resposta (TODO: Implementar dessa forma)
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
  try {
    const urlRelativa = `/pessoas/${id}`;
    const { data } = await Api.get(urlRelativa);
    if (data !== null && data !== undefined) {
      return data;
    }
    return new Error('Erro ao tentar recuperar o registro!');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao tentar recuperar o registro.');
  }
};

// O Omit irá omitir o(s) campo(s) especificado(s), não sendo necessário passá-lo por parâmetro
const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
  try {
    const urlRelativa = '/pessoas';
    const { data } = await Api.post<IDetalhePessoa>(urlRelativa, dados);
    if (data !== null && data !== undefined) {
      return data.id;
    }

    return new Error('Erro ao tentar salvar o registro!');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao tentar salvar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
  try {
    const urlRelativa = `/pessoas/${id}`;
    await Api.put(urlRelativa, dados);
    return new Error('Erro ao tentar atualizar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao tentar atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const urlRelativa = `/pessoas/${id}`;
    await Api.delete(urlRelativa);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao tentar excluir o registro.');
  }
};



export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};