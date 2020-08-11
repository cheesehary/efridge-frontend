import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getCookie, setCookie } from '../util';

const UnderConstruction: React.FC<{}> = () => {
  const skipTip = getCookie('skipTip');
  const [open, setOpen] = useState(!skipTip);
  const closeTip = () => {
    setOpen(false);
    setCookie('skipTip', '1');
  };
  return (
    <Dialog open={open} onClose={closeTip}>
      <DialogTitle id="alert-dialog-title">Hi, there!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This website is still under construction...
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeTip} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnderConstruction;
