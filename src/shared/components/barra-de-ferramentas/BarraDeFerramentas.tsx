import { Search } from '@mui/icons-material';
import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from '@mui/material';
import React from 'react';

interface IBarraDeFerramentasProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarBotaoNovo?: () => void;
}
export const BarraDeFerramentas: React.FC<IBarraDeFerramentasProps> = ({
  textoDaBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoBusca,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  aoClicarBotaoNovo
}) => {
  const theme = useTheme();

  return (
    <Box gap={1} marginX={1} padding={1} paddingX={2} display='flex' alignItems='center' height={theme.spacing(5)} component={Paper}>

      {mostrarInputBusca && (
        <TextField
          size='small'
          placeholder='Pesquisar...'
          value={textoDaBusca}
          onChange={(event) => aoMudarTextoBusca?.(event.target.value)}
          InputProps={{
            startAdornment: (<InputAdornment position='start'>
              <Search />
            </InputAdornment>)
          }} />
      )}

      <Box flex={1} display='flex' justifyContent='end'>
        {mostrarBotaoNovo &&
          (<Button
            variant='contained'
            color='primary'
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={aoClicarBotaoNovo}>
            {textoBotaoNovo}
          </Button>)}
      </Box>
    </Box>
  );
};