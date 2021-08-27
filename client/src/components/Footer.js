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
    },
    
}));


export default function Footer() {
    const classes = useStyles();
    return (
        <AppBar position="relative" color="primary">
            <Container maxWidth="md">
                <Toolbar>
                    <Typography variant="body1" color="inherit">
                        &copy; 2019 Gistia
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}