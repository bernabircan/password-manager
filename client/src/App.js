import './App.css';
import React, { useState, useEffect, useContext } from "react";
import { Context } from "./context/mainContext"
import Navbar from './components/Navbar';
import Table from './components/Table';
import Grid from '@material-ui/core/Grid';
import DialogForm from './components/DialogForm';
import SnackBar from './components/SnackBar';
import Loading from './components/Loading';
import Footer from './components/Footer';


function App() {
  const {
    state,
    getPasswordList,
    addPassword,
    deletePassword,
    updatePassword,
    search,
  } = useContext(Context) 

  const [isLoading, setIsLoading] = useState(true)
  const [val, setVal] = useState(null);
  const [open, setOpen] = React.useState(false);
  
  useEffect(() => {
    getPasswordList().then(() => {
      setIsLoading(false)
    })
  }, []);

  useEffect(() => {
    if (state.error) {
      setSnackBar({
        isOpen: true,
        message: "Transaction failed",
        severity: 'error',
        hideDuration: 15000,
        onCloseFunc: handleSnackBarClose,
      })
    }
  }, [state.error])

  useEffect(() => {
    if (state.success) {
      setSnackBar({
        isOpen: true,
        message: "Completed successfully",
        severity: 'success',
        hideDuration: 15000,
        onCloseFunc: handleSnackBarClose,
      })
    }
  }, [state.success])

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackBar(initialSnackBar)
  }
  
  const initialSnackBar = {
    isOpen: false,
    message: null,
    hideDuration: 6000,
    severity: 'error',
    onCloseFunc: handleSnackBarClose,
  }
  
  const [snackBar, setSnackBar] = useState(initialSnackBar)
  
  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="App">
      <Grid container spacing={4}
        alignItems="center"
        justify="center"
        style={{ marginTop: 20 }}
      >
        <Navbar 
          open={open}
          setOpen={setOpen} 
          search={search}
          getPasswordList={ getPasswordList}
        />
        <Grid item xs={12} >
        </Grid>
        <Grid item xs={12} >
          <Table 
           setOpen={setOpen} 
           setVal={setVal} 
          />
        </Grid>
        <Grid item xs={12}>
          <DialogForm
            open={open}
            setOpen={setOpen}
            val={val}
            setVal={setVal}
            updatePassword={updatePassword}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            addPassword={addPassword}
          />
        </Grid>
        <SnackBar
          isOpen={snackBar.isOpen}  
          severity={snackBar.severity}
          hideDuration={snackBar.hideDuration}
          message={snackBar.message}
          onCloseFunc={snackBar.onCloseFunc}
        />
        <Grid item xs={12}>
        <Footer />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
