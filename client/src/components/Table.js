import React from 'react';
import { withStyles, makeStyles,useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';


import { Context } from "../context/mainContext"
import { useEffect, useContext } from "react";
import { purple } from '@material-ui/core/colors';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
        
    },
    iconButton:{
        color:'white',
    },
    
    
    
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => { //ilk sayfaya gitmek için 
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => { //geri
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => { //ileri
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => { //son sayfaya gitmek için
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton  className={classes.iconButton}
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton  className={classes.iconButton} onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page" >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton   className={classes.iconButton}
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton  className={classes.iconButton}
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}


TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};



const StyledTableCell = withStyles((theme) => ({
    head: {

        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,

    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,


        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
        
       

    },
    header: {
        
       background: 'rgb(46, 45, 89,1)',
        fontFamily:'Roboto, sans-serif',
        fontWeight: 700,

    },
    body: {
        
        
         fontFamily: 'Roboto, sans-serif',
         fontWeight: 500,
         
 
     },
    footer: {
        
        color:'white',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 700,
        background: 'rgba(46, 45, 89,0.85)',
       
        

    },
    buttonEdit:{
        color:"white",
        
        fontFamily: 'Roboto, sans-serif',
        fontSize: 15,
        background: 'rgb(89,156,144,0.93)',
        borderRadius:4,
        border:0,
        
        marginRight: 10,
        padding:5,
         
        
    },
    buttonDelete:{
        color:"white",
        
        fontFamily: 'Roboto, sans-serif',
        fontSize: 15,
        background: 'rgb(242, 172, 172)',
        borderRadius:4,
        border:0,
        
        marginRight: 10,
        padding:5,
         
        
    }

});

export default function CustomizedTables(props) {
    const classes = useStyles();
    const {setOpen,setVal}= props
    const {
        state,
        getPasswordList,
        deletePassword,
    } = useContext(Context)

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
   const handleClickOpen = (val) => {
    setOpen(true);
    setVal(val);
  };

    useEffect(() => {
        getPasswordList()
    }, []);


    useEffect(() => {
        getPasswordList()
    }, [state.success]);

    useEffect(() => {
        
    }, [getPasswordList]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const log = (rowsPerPage) => {
        console.log(rowsPerPage);
        
    };
    

   
    return (
        <>
            <TableContainer component={Paper}   >
                <Table className={classes.table} aria-label="customized table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell className={classes.header}>Lab</StyledTableCell>
                            <StyledTableCell  className={classes.header} align="right">Name</StyledTableCell>
                            <StyledTableCell className={classes.header}  align="right">Adress</StyledTableCell>
                            <StyledTableCell  className={classes.header} align="right">Password</StyledTableCell>
                            <StyledTableCell className={classes.header} align="right">Options</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        
                        {(rowsPerPage > 0
                            ? state.passwords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : state.passwords
                        ).map((val) => (
                            <StyledTableRow key={val.id}>
                                <StyledTableCell className={classes.body} component="th" scope="row">
                                    {val.lab}
                                </StyledTableCell>
                                <StyledTableCell className={classes.body} align="right">{val.name}</StyledTableCell>
                                <StyledTableCell className={classes.body} align="right">{val.address}</StyledTableCell>
                                <StyledTableCell className={classes.body} align="right">{val.password}</StyledTableCell>
                                <StyledTableCell  className={classes.body} align="right">
                                    <Button  className={classes.buttonEdit} onClick={() => {handleClickOpen(val)}} >Edit</Button>
                                    <Button  className={classes.buttonDelete} onClick={() => { deletePassword(val.id) }}>Delete</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        
                       



                    </TableBody>
                    <TableFooter>
                        <StyledTableRow className={classes.footer}>
                            <TablePagination className={classes.footer}
                                rowsPerPageOptions={[5, 10, 20, { label: 'All', value: -1 }]}
                                
                                colSpan={5}
                                count={state.passwords.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </StyledTableRow>
                    </TableFooter>
                </Table>
            </TableContainer>



        </>
    );

}



