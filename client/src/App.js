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

//snack bar dialog form deli karışmış heee
function App() {

  const {
    state,
    getPasswordList,
    addPassword,
    deletePassword,
    updatePassword,
    search,
  } = useContext(Context) //bunu yaptıktan sonra methodları ve state'İ bu sayfada kullanabiliyoz sanırım

  const [isLoading, setIsLoading] = useState(true)

  const [password, setPassword] = useState("");
  const [lab, setLab] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [val, setVal] = useState(null);

 

  const [open, setOpen] = React.useState(false); //snack barda böyle tanımlanıyo bu ya neden burda
  useEffect(() => {
    getPasswordList().then(() => {
      setIsLoading(false)
    })
  }, []);

  const handleClose = () => {
    setOpen(false);
    setVal(null);

  };

  const handleSave = (val) => {
    if(val?.id==null){
      setIsLoading(true)
      addPassword(lab, password, name, address).then(() => {
        handleClose()
        setIsLoading(false)
        
      })
    }else {
      setIsLoading(true)
      updatePassword(val).then(() => {
        handleClose()
        setIsLoading(false)
        
      });
      console.log("val",val);


    }
    
   
  };
  //surdan sonrası karışmıs bende

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
    console.log('STATE-Success: ', state)
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


  /*
    const decryptPassword = (encryption) => {
      Axios.post("http://localhost:3001/decryptpassword", {
        password: encryption.password,
        iv: encryption.iv,
      }).then((response) => {
        console.log(response.data);
  
        setPasswordList(passwordList.map((val) => {
          return val.id === encryption.id
            ? {
              id: val.id,
              iv: val.iv,
              lab: response.data,
              password: val.password,
            }
            : val;
        })
        );
  
      });
  
  
    };
   */
  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="App">
      <Grid container spacing={4}
        alignItems="center"
        justify="center"
        style={{ marginTop: 45 }}


      >
        <SnackBar
          isOpen={snackBar.isOpen}  //sunlar initial snack barın özellikleri mi???
          severity={snackBar.severity}
          hideDuration={snackBar.hideDuration}
          message={snackBar.message}
          onCloseFunc={snackBar.onCloseFunc}

        />
        <Grid item xs={12}>
          <Navbar open={open}
            setOpen={setOpen}/>
        </Grid>
        <Grid item xs={12}>
          
          <DialogForm
            
            labPasswordValues={state.labPasswordValues} //labpasswordvalues?????
            
            handleSave={handleSave}
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            password={password}
            setPassword={setPassword}
            lab={lab}
            setLab={setLab}
            name={name}
            setName={setName}
            address={address}
            setAddress={setAddress}
            val={val}
            updatePassword={updatePassword}
           
          />
        </Grid>

        <Grid item xs={12} >
          <Table setOpen={setOpen} setVal={setVal} />
        </Grid>
        
        <Footer />
      </Grid>

    </div>
  );
}

export default App;
