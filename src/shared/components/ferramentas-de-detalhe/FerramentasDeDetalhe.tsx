import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEVoltar?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEVoltar?: () => void;
}
export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoSalvarEVoltar = false,

  aoClicarEmNovo,
  aoClicarEmSalvar,
  aoClicarEmApagar,
  aoClicarEmSalvarEVoltar,
  aoClicarEmVoltar
}) => {
  const theme = useTheme();

  return (
    <Box gap={1} marginX={1} padding={1} paddingX={2} display='flex' alignItems='center' height={theme.spacing(5)} component={Paper}>

      {mostrarBotaoSalvar && (<Button
        variant='contained'
        color='primary'
        disableElevation
        onClick={aoClicarEmSalvar}
        startIcon={<Icon>save</Icon>}>
        Salvar
      </Button>)}

      {mostrarBotaoSalvarEVoltar && (<Button
        variant='outlined'
        color='primary'
        disableElevation
        onClick={aoClicarEmSalvarEVoltar}
        startIcon={<Icon>save</Icon>}>
        Salvar e voltar
      </Button>)}

      {mostrarBotaoApagar && (<Button
        variant='outlined'
        color='primary'
        disableElevation
        onClick={aoClicarEmApagar}
        startIcon={<Icon>delete</Icon>}>
        Apagar
      </Button>)}

      {mostrarBotaoNovo && (<Button
        variant='outlined'
        color='primary'
        disableElevation
        onClick={aoClicarEmNovo}
        startIcon={<Icon>add</Icon>}>
        {textoBotaoNovo}
      </Button>)}

      {mostrarBotaoVoltar && (<Divider variant='middle' orientation='vertical' />)}

      {mostrarBotaoVoltar && (<Button
        variant='outlined'
        color='primary'
        disableElevation
        onClick={aoClicarEmVoltar}
        startIcon={<Icon>arrow_back</Icon>}>
        Voltar
      </Button>)}
    </Box >
  );
};