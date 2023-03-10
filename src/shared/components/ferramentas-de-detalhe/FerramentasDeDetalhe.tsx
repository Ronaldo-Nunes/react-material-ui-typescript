import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEVoltarCarregando?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
}
export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoSalvarEFechar: mostrarBotaoSalvarEVoltar = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoSalvarEVoltarCarregando = false,

  aoClicarEmNovo,
  aoClicarEmSalvar,
  aoClicarEmApagar,
  aoClicarEmSalvarEFechar: aoClicarEmSalvarEVoltar,
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
        >
          <Icon fontSize='small'>save</Icon>
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
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
        >
          <Icon fontSize='small'>save</Icon>
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' sx={{ ml: 1, display: { xs: 'none', md: 'block' } }}>
            Salvar e fechar
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
        >
          <Icon fontSize='small'>delete</Icon>
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
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
        // startIcon={<Icon>add</Icon>}
        >
          <Icon fontSize='small'>add</Icon>
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
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
        >
          <Icon fontSize='small'>arrow_back</Icon>
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
            Voltar
          </Typography>
        </Button>)}
      {mostrarBotaoVoltarCarregando && (<Skeleton width={108} height={60} />)}
    </Box >
  );
};