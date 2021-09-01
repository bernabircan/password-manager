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

  const { labPasswordValues, open, updatePassword,
    val, setVal, setOpen, setIsLoading, addPassword } = props;


  const [password, setPassword] = useState("");
  const [lab, setLab] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedLab, setSelectedLab] = React.useState('');
  const [errorLab, setErorrLab] = React.useState('');
  const [errorName, setErorrName] = React.useState('');
  const [errorAddress, setErorrAddress] = React.useState('');
  const [errorPassword, setErorrPassword] = React.useState('');
  const [isValid,setIsValid]=React.useState(true);

  useEffect(() => {
    setErorrPassword('')
  }, [open])

  useEffect(() => {
    if (val?.id) {
      setLab(val.lab);
      setName(val.name);
      setAddress(val.address);
      setPassword(val.password);
      setSelectedLab(val.lab)
    }
    else {
      setSelectedLab('');
    }
  }, [val])


  useEffect(() => {
    setIsValid(true)
    
    if (name === null || name === "") {
      setErorrName('dldldldldlldldld')
      setIsValid(false)
    } else {
      setErorrName('')
    }
    if (address === null || address === "") {
      setErorrAddress('dldldldldlldldld')
      setIsValid(false)
    }
    else { 
      setErorrAddress('')
     }
    if (lab === null || lab === "") { 
      setErorrLab('dldldldldlldldld')
      setIsValid(false)
     }
    else {
       setErorrLab('')
       }
  }, [password, name, address, lab])




  const handleClose = () => {
    setOpen(false);
    setVal(null);
  };



  const handleSave = (val) => {
    if(isValid){
    if (val?.id == null) {
      setIsLoading(true)
      addPassword(lab, password, name, address).then(() => {
        handleClose()
        setIsLoading(false)
      })
    } else {
      setIsLoading(true)
      
      updatePassword(lab, password, name, address, val.id).then(() => {
        handleClose()
        setIsLoading(false)
      });
    }
  }
  };








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
              if (event.target.value === null || event.target.value === "") {
                setErorrLab('Please enter your lab')
                setIsValid(false)
              } else {
                setErorrLab('')
              } 
              
            }}
            id="standard-select-currency"
            select
            label="Select"
            value={selectedLab}
            helperText="Please select your lab"
            fullWidth
            margin="dense"
            error={errorLab ? true : false}
            helperText={errorLab ? errorLab : "bosluk yok"}


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
            onChange={(event) => { 
              setName(event.target.value);
              if (event.target.value === null || event.target.value === "") {
                setErorrName('Please enter your name')
                setIsValid(false)
              } else {
                setErorrName('')
              } 
            }}
            fullWidth
            margin="dense"
            error={errorName ? true : false}
            helperText={errorName ? errorName : "bosluk yok"}
          />
          <TextField
            type="text"
            defaultValue={val?.address}
            placeholder="Ex. address"
            onChange={(event) => {
              setAddress(event.target.value);
               if (event.target.value === null || event.target.value === "") {
                setErorrAddress('Please enter your address')
                setIsValid(false)
              } else {
                setErorrAddress('')
              }
              
            }}
            fullWidth
            margin="dense"
            error={errorAddress ? true : false}
            helperText={errorAddress ? errorAddress : "bosluk yok"}
          />
          <TextField
            type="text"
            defaultValue={val?.password}
            placeholder="Ex. password123"
            onChange={(event) => {
               setPassword(event.target.value); 
               if (event.target.value === null || event.target.value === "") {
                setErorrPassword('Please select your password')
                setIsValid(false)
              } else {
                setErorrPassword('')
              }
            }}
            fullWidth
            margin="dense"
            error={errorPassword ? true : false}
            helperText={errorPassword ? errorPassword : "bosluk yok"}
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