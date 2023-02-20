import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface IAlertDialogProps {
  exibirDialog: boolean;
  titulo: string;
  mensagem: string;
  textoBotaoPositivo?: string;
  textoBotaoNegativo?: string;

  mostrarBotaoNegativo?: boolean;

  aoClicarBotaoPositivo?: () => void;
  aoClicarBotaoNegativo?: () => void;
}
export const AlertDialog = ({
  exibirDialog,
  titulo,
  mensagem,
  textoBotaoPositivo = 'OK',
  textoBotaoNegativo = 'Cancelar',
  mostrarBotaoNegativo = true,
  aoClicarBotaoPositivo,
  aoClicarBotaoNegativo
}: IAlertDialogProps) => {

  return (
    <Dialog
      open={exibirDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id='alert-dialog-title'>{titulo}</DialogTitle>

      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {mensagem}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        {mostrarBotaoNegativo && <Button onClick={aoClicarBotaoNegativo}>{textoBotaoNegativo}</Button>}
        <Button onClick={aoClicarBotaoPositivo} autoFocus>{textoBotaoPositivo}</Button>
      </DialogActions>
    </Dialog>
  );
};