import React from 'react';
import { Alert, Snackbar } from '@mui/material';

interface IAlertSnackbarProps {
  exibir: boolean;
  message?: string;
  tipo?: 'error' | 'warning' | 'info' | 'success',
  handleClose: () => void;
}
export const AlertSnackbar: React.FC<IAlertSnackbarProps> = ({
  exibir = false,
  message,
  tipo,
  handleClose
}) => {

  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={exibir} autoHideDuration={5000} onClose={handleClose}>
      <Alert variant='filled' severity={tipo} onClose={handleClose} sx={{ width: '100%' }}>{message}</Alert>
    </Snackbar>
  );
};