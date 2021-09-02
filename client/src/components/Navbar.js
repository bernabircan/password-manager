import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/mainContext"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: ' rgb(2, 40, 115) ',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 700,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 550,
    color: 'inherit',
  },
  inputInput: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 550,
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    //paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
   // transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  button: {
    backgroundColor: "Transparent",
    backgroundRepeat: "no-repeat",
    border: "white",
    cursor: "pointer",
    overflow: "hidden",
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 550,
    color: "white",
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
}));


export default function SearchAppBar(props) {
  const {setOpen,search,getPasswordList } = props
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (searchText == "") {
      getPasswordList();
    }
    search(searchText);
  }, [searchText]);

  return (
    <div className={classes.root}>
      <React.Fragment>
        <AppBar position="fixed" className={classes.root}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              PASSWORD MANAGER
            </Typography>
            <div>
              <Button className={classes.button} onClick={handleClickOpen} >
                Add Password
              </Button>
            </div>
            <div className={classes.search}>
              <SearchIcon />
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event) => { setSearchText(event.target.value); }}/>
            </div>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </div>
  );
}