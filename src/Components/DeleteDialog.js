import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export default function DeleteDialog({deleteData,deleteHandleClose,deleteSubmitHandler}) {

  return (
    <div>
        <Dialog
        open={deleteData}
        TransitionComponent={Transition}
        keepMounted
        onClose={deleteHandleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ background: "#2E3B55" , color:"#FFFFFF" }}>{"DELETE RECORDS ?"}</DialogTitle>
        <DialogContent style={{ background: "#2E3B55" }}>
          <DialogContentText id="alert-dialog-slide-description" style={{ color:"#FFFFFF"}}>
            Are you sure you want to delete these record[s] ?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ background: "#2E3B55" , color:"#FFFFFF" }}>
          <Button  variant="outlined" onClick={deleteHandleClose} style={{ width: "45%", color:"#FFFFFF" ,borderColor:"#FFFFFF", marginRight:"2vmin" }}>CANCEL</Button>
          <Button  variant="outlined" onClick={deleteSubmitHandler}style={{ width: "45%", color:"#FFFFFF",borderColor:"#FFFFFF" }}>DELETE</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
