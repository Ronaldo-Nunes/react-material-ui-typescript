import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, LinearProgress, Paper, Typography, Box } from '@mui/material';
import { FormHandles } from '@unform/core';

import { AlertDialog, AlertSnackbar, FerramentasDeDetalhe } from '../../shared/components';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { VTextField, VForm } from '../../shared/forms';

interface IAlertSnackbarProps {
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
  const [snackbarAlert, setSnackbarAlert] = useState<IAlertSnackbarProps>({
    exibir: false,
    message: ''
  });

  const handleCloseSnackBar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarAlert({ exibir: false });
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
    } else {
      formRef.current?.setData({
        email: '',
        cidadeId: '',
        nomeCompleto: '',
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
            setSnackbarAlert({ exibir: true, message: result.message, tipo: 'error' });
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
            setSnackbarAlert({ exibir: true, message: result.message, tipo: 'error' });
          } else {
            // navigate(`/pessoas/detalhe/${result}`);
            setSnackbarAlert({ exibir: true, message: 'Registro atualizado com sucesso!', tipo: 'success' });
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
          setSnackbarAlert({ exibir: true, message: result.message, tipo: 'error' });
        } else {
          setSnackbarAlert({ exibir: true, message: 'Registro excluído com sucesso!', tipo: 'success' });
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

      <AlertSnackbar
        exibir={snackbarAlert.exibir}
        message={snackbarAlert.message}
        tipo={snackbarAlert.tipo}
        handleClose={() => handleCloseSnackBar()}
      />

      <AlertDialog
        exibirDialog={exibirDialog}
        titulo={'Deseja realmente excluir?'}
        mensagem={`Você está prestes a excluir o cadastro de ${titleNome}.`}
        textoBotaoPositivo='Excluir'
        aoClicarBotaoNegativo={() => setExibirDialog(false)}
        aoClicarBotaoPositivo={() => handleDelete(Number(id))}
      />

      <VForm ref={formRef} onSubmit={(dados) => handleSave(dados)}>
        <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>
          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <VTextField
                  size='small'
                  fullWidth
                  label='Nome completo'
                  name='nomeCompleto'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <VTextField
                  size='small'
                  fullWidth
                  label='Email'
                  name='email'
                  disabled={isLoading}
                  onChange={event => setTitleNome(event.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <VTextField
                  size='small'
                  fullWidth
                  label='Cidade'
                  name='cidadeId'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>

      </VForm>
    </LayoutBaseDePagina>
  );
};