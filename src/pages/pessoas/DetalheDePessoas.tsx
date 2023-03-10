import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, LinearProgress, Paper, Typography, Box } from '@mui/material';
import * as yup from 'yup';

import { AlertDialog, AlertSnackbar, FerramentasDeDetalhe } from '../../shared/components';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { VTextField, VForm, useVForm, IVFormErros } from '../../shared/forms';
import { AutoCompleteCidade } from '../cidades/components/AutoCompleteCidades';

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

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object({
  nomeCompleto: yup.string().required().min(3),
  email: yup.string().required().email(),
  cidadeId: yup.number().required()
});

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>(); // Parâmetro passado na url
  const navigate = useNavigate();

  const { formRef, save, saveAndClose: saveAndBack, isSaveAndClose } = useVForm();

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
        cidadeId: undefined,
        nomeCompleto: '',
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {

    // if (dados.nomeCompleto.length < 3) {
    //   // seta o erro através da referência do formulário diretamente no campo informado
    //   formRef.current?.setFieldError('nomeCompleto', 'Entrada inválida');
    //   return;
    // }

    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {

        setLoading(true);
        if (id === 'nova') {
          PessoasService
            .create(dadosValidados)
            .then((result) => {
              setLoading(false);
              if (result instanceof Error) {
                setSnackbarAlert({ exibir: true, message: result.message, tipo: 'error' });
              } else {
                if (isSaveAndClose()) {
                  navigate('/pessoas');
                } else {
                  navigate(`/pessoas/detalhe/${result}`);
                }
              }
            });
        } else {
          PessoasService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setLoading(false);
              if (result instanceof Error) {
                setSnackbarAlert({ exibir: true, message: result.message, tipo: 'error' });
              } else {
                // navigate(`/pessoas/detalhe/${result}`);
                if (isSaveAndClose()) {
                  navigate('/pessoas');
                }
                setSnackbarAlert({ exibir: true, message: 'Registro atualizado com sucesso!', tipo: 'success' });
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErros = {};

        errors.inner.forEach(error => {
          if (error.path === undefined) return;

          validationErrors[error.path] = error.message;
          formRef.current?.setErrors(validationErrors);
        });
      });
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
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmApagar={handleExibirDialog}
          aoClicarEmVoltar={() => navigate('/pessoas')}
          aoClicarEmSalvar={save}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmSalvarEFechar={saveAndBack}
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
                  onChange={event => setTitleNome(event.target.value)}
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
                />
              </Grid>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <AutoCompleteCidade isExternalLoading={isLoading} />
              </Grid>
            </Grid>

          </Grid>

        </Box>

      </VForm>
    </LayoutBaseDePagina>
  );
};