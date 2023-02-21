import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { AlertDialog, FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { VTextField } from '../../shared/forms';
import { Alert, Button, LinearProgress, Snackbar } from '@mui/material';
import { FormHandles } from '@unform/core';

interface IAlert {
  exibir: boolean;
  message?: string;
  tipo?: 'error' | 'warning' | 'info' | 'success'
}
interface IFormData {
  email: string;
  nomeCompleto: string;
  cidadeId: number;
}
export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>(); // Parâmetro passado na url
  const navigate = useNavigate();

  // Armazena a referência do objeto/elemento entre as interações
  const formRef = useRef<FormHandles>(null);

  const [isLoading, setLoading] = useState(false);
  const [titleNome, setTitleNome] = useState('');
  const [exibirDialog, setExibirDialog] = useState(false);
  const [exibirAtlert, setExibirAlert] = useState<IAlert>({
    exibir: false,
    message: ''
  });

  const handleCloseSnackBar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setExibirAlert({ exibir: false });
  };


  useEffect(() => {
    if (id !== 'nova') {
      setLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setTitleNome(result.nomeCompleto);
            formRef.current?.setData(result);
          }
        });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    setLoading(true);
    if (id === 'nova') {
      PessoasService
        .create(dados)
        .then((result) => {
          setLoading(false);
          if (result instanceof Error) {
            setExibirAlert({ exibir: true, message: result.message, tipo: 'error' });
          } else {
            navigate(`/pessoas/detalhe/${result}`);
          }
        });
    } else {
      PessoasService
        .updateById(Number(id), { id: Number(id), ...dados })
        .then((result) => {
          setLoading(false);
          if (result instanceof Error) {
            setExibirAlert({ exibir: true, message: result.message, tipo: 'error' });
          } else {
            // navigate(`/pessoas/detalhe/${result}`);
            setExibirAlert({ exibir: true, message: 'Registro atualizado com sucesso!', tipo: 'success' });
          }
        });
    }
  };

  const handleExibirDialog = () => {
    setExibirDialog(true);
  };

  const handleDelete = (id: number) => {
    setExibirDialog(false);
    PessoasService.deleteById(id)
      .then(result => {
        if (result instanceof Error) {
          setExibirAlert({ exibir: true, message: result.message, tipo: 'error' });
        } else {
          setExibirAlert({ exibir: true, message: 'Registro excluído com sucesso!', tipo: 'success' });
          navigate('/pessoas');
        }
      });
  };

  return (
    <LayoutBaseDePagina titulo={id === 'nova' ? 'Nova pessoa' : titleNome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmApagar={handleExibirDialog}
          aoClicarEmVoltar={() => navigate('/pessoas')}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmSalvarEVoltar={() => formRef.current?.submitForm()}
        />
      }
    >

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={exibirAtlert.exibir} autoHideDuration={6000} onClose={handleCloseSnackBar}>
        <Alert variant='filled' severity={exibirAtlert.tipo} onClose={handleCloseSnackBar} sx={{ width: '100%' }}>{exibirAtlert.message}</Alert>
      </Snackbar>

      <AlertDialog
        exibirDialog={exibirDialog}
        titulo={'Deseja realmente excluir?'}
        mensagem={`Você está prestes a excluir o cadastro de ${titleNome}.`}
        textoBotaoPositivo='Excluir'
        aoClicarBotaoNegativo={() => setExibirDialog(false)}
        aoClicarBotaoPositivo={() => handleDelete(Number(id))}
      />

      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}

      <Form ref={formRef} onSubmit={(dados) => handleSave(dados)}>
        <VTextField size='small' placeholder='Nome completo' name='nomeCompleto' />
        <VTextField size='small' placeholder='Email' name='email' />
        <VTextField size='small' placeholder='Cidade id' name='cidadeId' />

      </Form>
    </LayoutBaseDePagina>
  );
};