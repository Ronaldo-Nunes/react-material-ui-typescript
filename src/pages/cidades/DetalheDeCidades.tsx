import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, LinearProgress, Paper, Typography, Box } from '@mui/material';
import * as yup from 'yup';

import { AlertDialog, AlertSnackbar, FerramentasDeDetalhe } from '../../shared/components';

import { LayoutBaseDePagina } from '../../shared/layouts';
import { VTextField, VForm, useVForm, IVFormErros } from '../../shared/forms';
import { CidadesService } from '../../shared/services/api/cidades/CidedesService';

interface IAlertSnackbarProps {
  exibir: boolean;
  message?: string;
  tipo?: 'error' | 'warning' | 'info' | 'success'
}
interface IFormData {
  nome: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object({
  nome: yup.string().required().min(3)
});

export const DetalheDeCidades: React.FC = () => {
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

      CidadesService.getById(Number(id))
        .then((result) => {
          setLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/cidades');
          } else {
            setTitleNome(result.nome);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        nome: ''
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
          CidadesService
            .create(dadosValidados)
            .then((result) => {
              setLoading(false);
              if (result instanceof Error) {
                setSnackbarAlert({ exibir: true, message: result.message, tipo: 'error' });
              } else {
                if (isSaveAndClose()) {
                  navigate('/cidades');
                } else {
                  navigate(`/cidades/detalhe/${result}`);
                }
              }
            });
        } else {
          CidadesService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setLoading(false);
              if (result instanceof Error) {
                setSnackbarAlert({ exibir: true, message: result.message, tipo: 'error' });
              } else {
                // navigate(`/cidades/detalhe/${result}`);
                if (isSaveAndClose()) {
                  navigate('/cidades');
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
    CidadesService.deleteById(id)
      .then(result => {
        if (result instanceof Error) {
          setSnackbarAlert({ exibir: true, message: result.message, tipo: 'error' });
        } else {
          setSnackbarAlert({ exibir: true, message: 'Registro excluído com sucesso!', tipo: 'success' });
          navigate('/cidades');
        }
      });
  };

  return (
    <LayoutBaseDePagina titulo={id === 'nova' ? 'Nova cidade' : titleNome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmApagar={handleExibirDialog}
          aoClicarEmVoltar={() => navigate('/cidades')}
          aoClicarEmSalvar={save}
          aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
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
                  label='Nome'
                  name='nome'
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