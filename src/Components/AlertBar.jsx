import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const AlertBar = ({ open, handleClose, alertId }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      {alertId == 0 ? (
        <Alert
          onClose={handleClose}
          severity='info'
          color='info'
          sx={{ width: '100%' }}
        >
          Product Deleted Successfully !
        </Alert>
      ) : alertId == 1 ? (
        <Alert
          onClose={handleClose}
          severity='success'
          color='success'
          sx={{ width: '100%' }}
        >
          Product Edited Successfully !
        </Alert>
      ) : alertId == 2 ? (
        <Alert
          onClose={handleClose}
          severity='info'
          color='success'
          sx={{ width: '100%' }}
        >
          Product Created Successfully !
        </Alert>
      ) : null}
    </Snackbar>
  );
};

export default AlertBar;
