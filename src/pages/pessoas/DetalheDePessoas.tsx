import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { AlertDialog, FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { VTextField } from '../../shared/forms';
import { Alert, Snackbar } from '@mui/material';

interface IAlert {
  exibir: boolean;
  message?: string;
  tipo?: 'error' | 'warning' | 'info' | 'success'
}
export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>(); // Parâmetro passado na url
  const navigate = useNavigate();

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
            console.log(result);
          }
        });
    }
  }, [id]);

  const handleSave = () => {
    console.log('save');
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

          aoClicarEmSalvar={handleSave}
          aoClicarEmSalvarEVoltar={handleSave}
          aoClicarEmApagar={handleExibirDialog}
          aoClicarEmVoltar={() => navigate('/pessoas')}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
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

      {/* {isLoading && (
        <LinearProgress variant='indeterminate' />
      )} */}

      <Form onSubmit={() => console.log('form')}>
        <VTextField name='nomeCompleto'/>
      </Form>
    </LayoutBaseDePagina>
  );
};