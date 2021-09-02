import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {  makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        background: ' rgb(2, 40, 115) ',
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        bottom: 0
    },
    font: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 700,
        marginLeft: 350,
    },
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <AppBar className={classes.root} position="center" color="primary">
            <Container maxWidth="md" >
                <Toolbar>
                    <Typography className={classes.font}  >
                        ORION INNOVATION
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}