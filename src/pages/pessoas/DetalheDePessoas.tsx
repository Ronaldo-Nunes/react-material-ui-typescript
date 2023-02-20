import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertDialog, FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';


export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>(); // Parâmetro passado na url
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [titleNome, setTitleNome] = useState('');
  const [exibirDialog, setExibirDialog] = useState(false);


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
          alert(result.message);
        } else {
          alert('Registro excluído com sucesso!');
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

      <p>Detalhe de pessoas {id}</p>
    </LayoutBaseDePagina>
  );
};