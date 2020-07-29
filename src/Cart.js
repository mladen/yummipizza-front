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
import IconButton from '@material-ui/core/IconButton';
// import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/SendSharp';

import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

// Contexts
import { CartContext } from './CartContext';
import { PizzaContext } from './PizzaContext';

const DELIVERY_COST = 3;
const USD_RATE = 1.1713;

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
  checkoutButton: {
    margin: '20px auto 0'
  }
}));

export default function Cart() {
  const classes = useStyles();

  const { currency, setCurrency } = React.useContext(PizzaContext);

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
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      increaseAmount(item.id);
                    }}><ArrowUp /></IconButton>
                  &nbsp;&nbsp;{item.amount}&nbsp;&nbsp;
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      decreaseAmount(item.id, item.amount);
                    }}><ArrowDown /></IconButton>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {
                    currency === "usd"
                      ? (item.price * USD_RATE).toFixed(2)
                      : item.price
                  }
                </StyledTableCell>
                <StyledTableCell align="right">
                  {
                    currency === "usd"
                      ? (item.price * item.amount * USD_RATE).toFixed(2)
                      : item.price * item.amount
                  }
                </StyledTableCell>
              </StyledTableRow>
            ))}

            {/* Subtotal */}
            <TableRow>
              <StyledTableCell rowSpan={3} />
              <StyledTableCell colSpan={2}>Subtotal</StyledTableCell>
              <StyledTableCell align="right">
                {
                  currency === "usd"
                    ? (total * USD_RATE).toFixed(2)
                    : total
                  }
              </StyledTableCell>
            </TableRow>

            {/* Tax */}
            <TableRow >
              <StyledTableCell>Delivery cost</StyledTableCell>
              <StyledTableCell align="right">
                {
                  (() => {
                    switch (true) {
                      case total === 0:
                        return "";
                      case (total > 0 && total <= 5):
                        return (currency === "usd" ? (3*USD_RATE).toFixed(2) : "3");
                      case total > 5:
                        return "No delivery charge for receipts bigger than " + (currency === "usd" ? (5*USD_RATE).toFixed(2) + " USD" : "5 EUR");
                      default:
                        break;
                    }
                  })()
                }
              </StyledTableCell>
              <StyledTableCell align="right">
                {
                  (() => {
                    switch (true) {
                      case total === 0:
                        return 0;
                      case (total > 0 && total <= 5):
                        return (currency === "usd" ? (3*USD_RATE).toFixed(2) : "3");
                      case total > 5:
                        return 0;
                      default:
                        break;
                    }
                  })()
                }
              </StyledTableCell>
            </TableRow>

            {/* Total */}
            <TableRow>
              <StyledTableCell colSpan={2}>Total</StyledTableCell>
              <StyledTableCell align="right">
                <strong>
                  {
                    (total > 0 && total <= 5)
                    ? (currency === "usd" ? ((total + DELIVERY_COST) * USD_RATE).toFixed(2) + " USD" : (total + DELIVERY_COST).toFixed(2) + " EUR")
                    : (currency === "usd" ? (total * USD_RATE).toFixed(2) + " USD" : total.toFixed(2) + " EUR")
                  }
                </strong>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        color="secondary"
        className={classes.checkoutButton}
        component={RouterLink}
        to="/checkout"
        variant="contained"
        endIcon={<SendIcon />}>
        Check out your receipt
      </Button>
    </React.Fragment>
  );
}