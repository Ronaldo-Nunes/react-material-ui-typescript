import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';

interface IListItemLinkProps {
  label: string;
  icon: string;
  navigateTo: string;
  onClick: (() => void) | undefined;
}
const ListItemLink: React.FC<IListItemLinkProps> = ({ navigateTo, icon, label, onClick }) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(navigateTo);
  const match = useMatch({ path: resolvedPath.pathname, end: false }); // Saberá se esta opçõ de menu corresponde à url atual

  const handleClick = () => {
    navigate(navigateTo);
    onClick?.(); // Também é possível utilizar null safety com funções
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

interface IDrawerProviderProps {
  children: ReactNode;
}
export const MenuLateral: React.FC<IDrawerProviderProps> = ({ children }) => {
  const theme = useTheme(); // Consegue acessar todas as propriedades do tema base
  const smDown = useMediaQuery(theme.breakpoints.down('sm')); // Retornará serdadeiro se a largura de tela for inferior a 'sm' (600px)

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

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
              {
                drawerOptions.map(drawerOption => (
                  <ListItemLink key={drawerOption.path}
                    icon={drawerOption.icon}
                    label={drawerOption.label}
                    navigateTo={drawerOption.path} 
                    onClick={smDown ? toggleDrawerOpen : undefined} />
                ))
              }
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