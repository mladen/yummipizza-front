import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';


// Contexts
import { CartContext } from './CartContext';
import { PizzaContext } from './PizzaContext';

// Alert
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const DELIVERY_COST = 3;
const USD_RATE = 1.1713;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    // margin: theme.spacing(1),
    width: '90%',
    margin: '35px auto 0 auto',
    minWidth: 700,
    boxShadow: 'none',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  orderButton: {
    margin: '20px auto 0'
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Checkout() {
  const classes = useStyles();

  const { currency, setCurrency } = React.useContext(PizzaContext);

  const {
    cart,
    addToCart,
    total,
    increaseAmount,
    decreaseAmount
  } = React.useContext(CartContext);

  const [values, setValues] = React.useState({
    yourname: '',
    deliveryaddress: '',
    contactphonenumber: '',
    amount: ''
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // * Alert functions
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

  return (
    <React.Fragment>
      <FormControl fullWidth className={classes.margin} variant="filled">
        <InputLabel htmlFor="filled-adornment-yourname">Your name:</InputLabel>
        <FilledInput
          id="filled-adornment-yourname"
          value={values.yourname}
          onChange={handleChange('yourname')}
          startAdornment={<InputAdornment position="start">Name</InputAdornment>}
        />
      </FormControl>

      <FormControl fullWidth className={classes.margin} variant="filled">
        <InputLabel htmlFor="filled-adornment-deliveryaddress">Delivery address:</InputLabel>
        <FilledInput
          id="filled-adornment-deliveryaddress"
          value={values.deliveryaddress}
          onChange={handleChange('deliveryaddress')}
          startAdornment={<InputAdornment position="start">Address</InputAdornment>}
        />
      </FormControl>

      <FormControl fullWidth className={classes.margin} variant="filled">
        <InputLabel htmlFor="filled-adornment-contactphonenumber">Contact phone number:</InputLabel>
        <FilledInput
          id="filled-adornment-contactphonenumber"
          value={values.contactphonenumber}
          onChange={handleChange('contactphonenumber')}
          startAdornment={<InputAdornment position="start">Phone</InputAdornment>}
        />
      </FormControl>

      <FormControl fullWidth className={classes.margin} variant="filled" disabled>
        <InputLabel htmlFor="filled-adornment-amount">Total amount</InputLabel>
        <FilledInput
          id="filled-adornment-amount"
          value=
            {
              (total > 0 && total <= 5)
              ? (currency === "usd" ? ((total + DELIVERY_COST) * USD_RATE).toFixed(2) : (total + DELIVERY_COST).toFixed(2))
              : (currency === "usd" ? (total * USD_RATE).toFixed(2) : total.toFixed(2))
            }
          onChange={handleChange('amount')}
          startAdornment={<InputAdornment position="start">
                  {
                    currency === "usd" ? "USD" : "EUR"
                  }
          </InputAdornment>}
        />
      </FormControl>

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