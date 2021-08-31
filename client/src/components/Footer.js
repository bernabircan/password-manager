import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingBlockEnd:0,
        background: ' rgb(2, 40, 115) ',
        
    },
    font:{
        fontFamily:'Roboto, sans-serif',
        fontWeight: 700,
        marginLeft: 350,
    },
}));


export default function Footer() {
    const classes = useStyles();
    return (
        <AppBar  className={classes.root} position="center" color="primary">
            <Container maxWidth="md">
                <Toolbar>
                    <Typography   className={classes.font}  >
                        ORION INNOVATION
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}