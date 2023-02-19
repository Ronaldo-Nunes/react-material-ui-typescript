import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
  titulo: string;
  barraDeFerramentas?: ReactNode;
  children: ReactNode;
}
export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ titulo, children, barraDeFerramentas }: ILayoutBaseDePaginaProps) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext(); // Hook personalizado que fornece o contexto especificado

  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1}>

      <Box display='flex' alignItems='center' gap={1} padding={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} >
        {smDown && <IconButton onClick={toggleDrawerOpen}>
          <Icon>menu</Icon>
        </IconButton>}
        <Typography
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
        > 
          {titulo}
        </Typography>
      </Box>

      {barraDeFerramentas && <Box >
        {barraDeFerramentas}
      </Box>}

      <Box flex={1} overflow='auto'> {/**O scroll da página ficará retido a este box (overflow=auto), que receberá os layouts diversos da aplicação */}
        {children}
      </Box>
    </Box>
  );
};

// Cada unidade de valor no material ui vale 8px (exemplo: 1 = 8px, 2 = 16px...)