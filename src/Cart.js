import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { lightGreen } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import ArrowUp from '@material-ui/icons/ArrowUpwardSharp';
import ArrowDown from '@material-ui/icons/ArrowDownwardSharp';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Contexts
import { CartContext } from './CartContext';

const DELIVERY_COST = 3;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: lightGreen[500],
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  table: {
    width: '90%',
    margin: '35px auto 0 auto',
    minWidth: 700,
    boxShadow: 'none',
  },
  orderButton: {
    margin: '20px auto 0'
  }
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Cart() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const {
    cart,
    addToCart,
    total,
    increaseAmount,
    decreaseAmount
  } = React.useContext(CartContext);

  return (
    <React.Fragment>
      <TableContainer component={Paper} className={classes.margin} elevation={0}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            {/* Details and Price */}
            <StyledTableRow>
              <StyledTableCell align="center" colSpan={3}>Receipt details</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
            </StyledTableRow>

            {/* Desc */}
            <StyledTableRow>
              <StyledTableCell>Desc</StyledTableCell>
              <StyledTableCell align="right">Qty.</StyledTableCell>
              <StyledTableCell align="right">Unit price</StyledTableCell>
              <StyledTableCell align="right">Sum</StyledTableCell>
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {cart.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell>{item.name}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowUp />}
                    onClick={() => {
                      increaseAmount(item.id);
                    }}>More</Button>
                  &nbsp;&nbsp;{item.amount}&nbsp;&nbsp;
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowDown />}
                    onClick={() => {
                      decreaseAmount(item.id, item.amount);
                    }}>Less</Button>
                </StyledTableCell>
                <StyledTableCell align="right">{item.price}</StyledTableCell>
                <StyledTableCell align="right">{ccyFormat(item.price * item.amount)}</StyledTableCell>
              </StyledTableRow>
            ))}

            {/* Subtotal */}
            <TableRow>
              <StyledTableCell rowSpan={3} />
              <StyledTableCell colSpan={2}>Subtotal</StyledTableCell>
              <StyledTableCell align="right">{ccyFormat(total)}</StyledTableCell>
            </TableRow>

            {/* Tax */}
            <TableRow>
              <StyledTableCell>Delivery cost</StyledTableCell>
              <StyledTableCell align="right">
                {`${
                  total > 5
                  ? "No delivery charge for receipts bigger than 5 Euros"
                  : "3"}`}
              </StyledTableCell>
              <StyledTableCell align="right">
                {`${
                  total > 5
                  ? 0
                  : ccyFormat(DELIVERY_COST)}`}
              </StyledTableCell>
            </TableRow>

            {/* Total */}
            <TableRow>
              <StyledTableCell colSpan={2}>Total</StyledTableCell>
              <StyledTableCell align="right">
                <strong>
                  {`${
                    (total > 5)
                    ? ccyFormat(total)
                    : ccyFormat(total + DELIVERY_COST)}`}
                </strong>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        onClick={handleClick}
        size="large"
        variant="contained"
        color="secondary"
        startIcon={<ShoppingBasket />}
        className={classes.orderButton}>
        Confirm order
      </Button>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Your order is confirmed!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}