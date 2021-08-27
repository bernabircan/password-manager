import React, { useState, useEffect, useContext } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const  DialogForm=(props) =>{
  
const {labPasswordValues, handleSave, open, updatePassword, handleClose, password, setPassword, lab ,setLab, name, setName, address, setAddress,val} = props;
//console.log("props",labPasswordValues);
console.log("props",labPasswordValues);
console.log("open", open);
console.log("val", val);

useEffect(() => {
  console.log("TESTTTT")
  if(val) {
    console.log('SETTINGLAB: ', val)
    setLab(val.lab)
  }
}, [val])


  return (
    <>
       
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{val?.id ?  "Edit": "Add Password"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add password to this website, please enter your lab, name,address,password here.
          </DialogContentText>
            <TextField type="text" value={lab} placeholder="Ex. lab"
              onChange={(event) => { setLab(event.target.value); }}
              fullWidth
              margin="dense"
            />
            <TextField type="text" value={val?.name} placeholder="Ex. name"
              onChange={(event) => { setName(event.target.value); }}
              fullWidth
              margin="dense"
            />
            <TextField type="text" value={val?.address} placeholder="Ex. address"
              onChange={(event) => { setAddress(event.target.value); }}
              fullWidth
              margin="dense"
            />
            <TextField type="text" value={val?.password} placeholder="Ex. password123"
              onChange={(event) => { setPassword(event.target.value); }}
              fullWidth
              margin="dense"
            />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSave(val)} name={val?.id ? 'edit' : 'add'}>{val?.id ? 'edit' : 'add'} </Button>
        </DialogActions>
      </Dialog> 
    
      </>
  );
}

export default DialogForm