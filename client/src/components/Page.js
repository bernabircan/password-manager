import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from '@material-ui/core/Container';

const Page = ({ children, isLoading }) => {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="lg" className={classes.root}>
                {children}
            </Container>
        </>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));

export default Page;