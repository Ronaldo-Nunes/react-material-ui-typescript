import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from '@mui/material';

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEVoltar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEVoltarCarregando?: boolean;

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

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoSalvarEVoltarCarregando = false,

  aoClicarEmNovo,
  aoClicarEmSalvar,
  aoClicarEmApagar,
  aoClicarEmSalvarEVoltar,
  aoClicarEmVoltar
}) => {
  const theme = useTheme();

  return (
    <Box gap={1} marginX={1} padding={1} paddingX={2} display='flex' alignItems='center' height={theme.spacing(5)} component={Paper}>

      {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
        <Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={aoClicarEmSalvar}
          startIcon={<Icon>save</Icon>}>
          Salvar
        </Button>)}
      {mostrarBotaoSalvarCarregando && (<Skeleton width={108} height={60} />)}

      {(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando) && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={aoClicarEmSalvarEVoltar}
          startIcon={<Icon>save</Icon>}>
          Salvar e voltar
        </Button>)}
      {mostrarBotaoSalvarEVoltarCarregando && (<Skeleton width={180} height={60} />)}

      {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={aoClicarEmApagar}
          startIcon={<Icon>delete</Icon>}>
          Apagar
        </Button>)}
      {mostrarBotaoApagarCarregando && (<Skeleton width={108} height={60} />)}

      {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando) && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={aoClicarEmNovo}
          startIcon={<Icon>add</Icon>}>
          {textoBotaoNovo}
        </Button>)}
      {mostrarBotaoNovoCarregando && (<Skeleton width={108} height={60} />)}

      {mostrarBotaoVoltar && (<Divider variant='middle' orientation='vertical' />)}

      {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={aoClicarEmVoltar}
          startIcon={<Icon>arrow_back</Icon>}>
          Voltar
        </Button>)}
      {mostrarBotaoVoltarCarregando && (<Skeleton width={108} height={60} />)}
    </Box >
  );
};