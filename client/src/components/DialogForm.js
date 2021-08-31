import React, { useState, useEffect, useContext } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const labList = [
  {
    value: 'KVS',
    label: 'KVS',
  },
  {
    value: 'NDS',
    label: 'NDS',
  },
  {
    value: 'NVC',
    label: 'NVC',
  },

];

const useStyles = makeStyles((theme) => ({
  root: {

  },
}));

const DialogForm = (props) => {
  const classes = useStyles();

  const { labPasswordValues, handleSave, open, updatePassword, handleClose, password, setPassword, lab, setLab, name, setName, address, setAddress, val, setVal } = props;
  //console.log("props",labPasswordValues);
  console.log("props", labPasswordValues);
  console.log("open", open);
  console.log("val", val);
  const [selectedLab, setSelectedLab] = React.useState('');
  


  useEffect(() => {
    if (open) {
      //setVal(null)
    }
  }, [open])

  /*
    useEffect(() => {
      console.log("TESTTTT")
      if (val) {
        console.log('SETTINGLAB: ', val)
        setLab(val.lab)
      }
    }, [val])
  */
    
    useEffect(() => {
      if(val?.id ){
        setLab(val.lab);
        setName(val.name);
        setAddress(val.address);
        setPassword(val.password);
        setSelectedLab(val.lab)          
      }
      else{
        setSelectedLab('');
      }
    }, [val])
  
     console.log("selectedlab",selectedLab);










  return (
    <>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{val?.id ? "Edit" : "Add Password"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add password to this website, please enter your lab, name,address,password here.
          </DialogContentText>

          <TextField type="text" placeholder="Ex. lab"

            onChange={(event) => {
              setSelectedLab(event.target.value);
              setLab(event.target.value);
            }}
            id="standard-select-currency"
            select
            label="Select"
            value={selectedLab}
            helperText="Please select your lab"
            fullWidth
            margin="dense"
            

          >
            {labList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="text"
            defaultValue={val?.name}
            placeholder="Ex. name"
            onChange={(event) => { setName(event.target.value); }}
            fullWidth
            margin="dense"
          />
          <TextField
            type="text"
            defaultValue={val?.address}
            placeholder="Ex. address"
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            fullWidth
            margin="dense"
          />
          <TextField
            type="text"
            defaultValue={val?.password}
            placeholder="Ex. password123"
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