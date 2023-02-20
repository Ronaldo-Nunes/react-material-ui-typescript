import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';

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
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  return (
    <Box gap={1} marginX={1} padding={1} paddingX={2} display='flex' alignItems='center' height={theme.spacing(5)} component={Paper}>

      {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
        <Button
          size='medium'
          variant='contained'
          color='primary'
          disableElevation
          onClick={aoClicarEmSalvar}
          startIcon={<Icon>save</Icon>}>
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Salvar
          </Typography>
        </Button>)}
      {mostrarBotaoSalvarCarregando && (<Skeleton width={108} height={60} />)}

      {(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando && !mdDown) && (
        <Button
          size='medium'
          variant='outlined'
          color='primary'
          disableElevation
          onClick={aoClicarEmSalvarEVoltar}
          startIcon={<Icon>save</Icon>}>
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Salvar e voltar
          </Typography>
        </Button>)}
      {(mostrarBotaoSalvarEVoltarCarregando && !mdDown) && (<Skeleton width={180} height={60} />)}

      {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
        <Button
          size='medium'
          variant='outlined'
          color='primary'
          disableElevation
          onClick={aoClicarEmApagar}
          startIcon={<Icon>delete</Icon>}>
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Apagar
          </Typography>
        </Button>)}
      {mostrarBotaoApagarCarregando && (<Skeleton width={108} height={60} />)}

      {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (
        <Button
          size='medium'
          variant='outlined'
          color='primary'
          disableElevation
          onClick={aoClicarEmNovo}
          startIcon={<Icon>add</Icon>}>
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            {textoBotaoNovo}
          </Typography>
        </Button>)}
      {(mostrarBotaoNovoCarregando && !smDown) && (<Skeleton width={108} height={60} />)}

      {mostrarBotaoVoltar && (<Divider variant='middle' orientation='vertical' />)}

      {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
        <Button
          size='medium'
          variant='outlined'
          color='primary'
          disableElevation
          onClick={aoClicarEmVoltar}
          startIcon={<Icon>arrow_back</Icon>}>
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Voltar
          </Typography>
        </Button>)}
      {mostrarBotaoVoltarCarregando && (<Skeleton width={108} height={60} />)}
    </Box >
  );
};