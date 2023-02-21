import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';

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
export const AlertDialog: React.FC<IAlertDialogProps> = ({
  exibirDialog,
  titulo,
  mensagem,
  textoBotaoPositivo = 'OK',
  textoBotaoNegativo = 'Cancelar',
  mostrarBotaoNegativo = true,
  aoClicarBotaoPositivo,
  aoClicarBotaoNegativo
}) => {

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
        {mostrarBotaoNegativo && (<Button size='small' onClick={aoClicarBotaoNegativo}>
          <Typography variant='button'>{textoBotaoNegativo}</Typography>
        </Button>
        )}
        <Button size='small' onClick={aoClicarBotaoPositivo} autoFocus>
          <Typography variant='button'>{textoBotaoPositivo}</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};