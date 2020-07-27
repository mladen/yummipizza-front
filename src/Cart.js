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

const useStyles = makeStyles({
  table: {
    width: '90%',
    margin: '35px auto 0 auto',
    // padding: '25px',
    // display: 'flex',
    // flexDirection: 'column',
    minWidth: 700,
    boxShadow: 'none',
  },
});

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

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

// const invoiceSubtotal = total; //subtotal(rows);
// const DELIVER = DELIVERY_COST * invoiceSubtotal;
// const invoiceTotal = DELIVERY_COST + invoiceSubtotal;


export default function Cart() {
  const classes = useStyles();
  const { cart, addToCart, total } = React.useContext(CartContext);

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
                <StyledTableCell align="right">{item.price}</StyledTableCell>
                <StyledTableCell align="right">{item.price}</StyledTableCell>
                <StyledTableCell align="right">{ccyFormat(item.price)}</StyledTableCell>
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
    </React.Fragment>
  );
}