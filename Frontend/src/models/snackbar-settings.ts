import { AlertColor } from '@mui/material';

export interface SnackbarSettings {
  open: boolean;
  message: string;
  severity: AlertColor;
}
