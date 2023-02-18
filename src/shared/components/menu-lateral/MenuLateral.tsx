import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { useDrawerContext } from '../../contexts';


interface IDrawerProviderProps {
  children: ReactNode;
}
export const MenuLateral: React.FC<IDrawerProviderProps> = ({ children }) => {
  const theme = useTheme(); // Consegue acessar todas as propriedades do tema base
  const smDown = useMediaQuery(theme.breakpoints.down('sm')); // Retornará serdadeiro se a largura de tela for inferior a 'sm' (600px)

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

  // BREAKPOINTS -> Tamanhos de telas definidos no Material UI [https://mui.com/material-ui/customization/breakpoints/#default-breakpoints]
  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
          <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
            <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://pbs.twimg.com/profile_images/1294819965632163840/zL35EMhv_400x400.jpg" />
          </Box>

          <Divider />
          <Box flex={1}>
            <List component="nav" >
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Página inicial" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};