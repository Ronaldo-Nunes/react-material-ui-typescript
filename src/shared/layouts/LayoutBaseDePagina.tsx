import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
  titulo: string;
  children: ReactNode;
}
export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo }: ILayoutBaseDePaginaProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { toggleDrawerOpen } = useDrawerContext(); // Hook personalizado que fornece o contexto especificado

  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1}>

      <Box display='flex' alignItems='center' padding={1} height={theme.spacing(8)} gap={1}>
        {smDown && <IconButton onClick={toggleDrawerOpen}>
          <Icon>menu</Icon>
        </IconButton>}
        <Typography variant='h5'>
          {titulo}
        </Typography>
      </Box>

      <Box>
        Barra de ferramentas
      </Box>

      <Box>
        {children}
      </Box>
    </Box>
  );
};

// Cada unidade de valor no material ui vale 8px (exemplo: 1 = 8px, 2 = 16px...)