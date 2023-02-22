import { useState } from 'react';
import { Button, Card, CardActions, CardContent, TextField, Typography, Box, CircularProgress } from '@mui/material';
import * as yup from 'yup';
import { useAuthContext } from '../../contexts';

interface ILoginProps {
  children: React.ReactNode;
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();
  const [isLoading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
  });

  const handleLogin = () => {
    setLoading(true);

    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then(dadosValidados => {
        login(dadosValidados.email, dadosValidados.password)
          .then(() => {
            setLoading(false);
            setEmail('');
            setPassword('');
          });
      })
      .catch((errors: yup.ValidationError) => {
        setLoading(false);

        errors.inner.forEach(error => {
          if (error.path === 'email') {
            setEmailError(error.message);
          } else if (error.path === 'password') {
            setPasswordError(error.message);
          }
        });
      });
  };

  if (isAuthenticated) return (
    <>{children}</>
  );

  return (
    <Box width='100vw' height='100vh' display='flex' justifyContent='center' alignItems='center'>
      <Card>
        <CardContent>
          <Box display='flex' flexDirection='column' gap={2} width={250}>
            <Typography variant='h6' align='center'>Identifique-se</Typography>

            <TextField
              fullWidth
              disabled={isLoading}
              size='small'
              label='Email'
              type='email'
              value={email}
              helperText={emailError}
              error={emailError !== ''}
              onKeyDown={() => setEmailError('')}
              onChange={event => setEmail(event.target.value)}
            />

            <TextField
              fullWidth
              disabled={isLoading}
              size='small'
              label='Senha'
              type='password'
              value={password}
              error={passwordError !== ''}
              helperText={passwordError}
              onKeyDown={() => setPasswordError('')}
              onChange={event => setPassword(event.target.value)}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center'>
            <Button
              disabled={isLoading}
              variant='contained'
              onClick={handleLogin}
              endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={24} /> : undefined}
            >
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};