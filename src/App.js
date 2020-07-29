import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link as RouterLink} from 'react-router-dom';
import Pizzeria from './Pizzeria.js';
import Cart from './Cart.js';
import Checkout from './Checkout.js';
// import Error from './Error.js';

// Contexts
import { PizzaContext } from './PizzaContext';
import { CartContext } from './CartContext';

// Components
import AppBar from '@material-ui/core/AppBar';
import PizzaIcon from '@material-ui/icons/LocalPizza';
import YourPizzasIcon from '@material-ui/icons/LocalPizzaOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { red, yellow, green } from '@material-ui/core/colors';

import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

const DELIVERY_COST = 3;
const USD_RATE = 1.1713;

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: red.A700,
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'white',
    fontFamily: 'Leckerli One, cursive',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.common.white,
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: yellow[800],
        borderColor: yellow[800],
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${green[600]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: green[500],
  },
  checked: {},
}))(Switch);

function App() {
  const classes = useStyles();

  // const { pizzas } = React.useContext(PizzaContext);
  const { currency, setCurrency } = React.useContext(PizzaContext);
  const { cart, cartItems, total } = React.useContext(CartContext);

  console.log("cart is: ", cart);

  // * Switches
  const [state, setState] = React.useState({
    currencyEuro: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });

    // const newCurrency = [...currency, currency: 'usd'];
    // setCart(newCurrency);
    currency === 'usd'
      ? setCurrency('eur')
      : setCurrency('usd');
  };

  return (
    <Router>
      <AppBar position="relative" className={classes.header}>
        <Toolbar>
          <RouterLink to="/" className={classes.linkStyle}>
              <PizzaIcon className={classes.icon} />
          </RouterLink>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            <RouterLink to="/" className={classes.linkStyle}>
              The Yummi Pizza
            </RouterLink>
          </Typography>

          <MenuItem align="right">
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>$</Grid>
                <Grid item>
                  <AntSwitch checked={state.currencyEuro} onChange={handleChange} name="currencyEuro" />
                </Grid>
                <Grid item>&euro;</Grid>
              </Grid>
            </Typography>
          </MenuItem>

          <RouterLink to="/cart" className={classes.linkStyle}>
            <MenuItem align="right">
              <IconButton aria-label="show 11 new notifications" color="inherit">
                <Badge badgeContent={cartItems} color="secondary">
                  <YourPizzasIcon />
                </Badge>
              </IconButton>
              <p>Your cart (
                {
                  (total > 0 && total <= 5)
                  ? (
                      currency === "usd"
                        ? (total * USD_RATE).toFixed(2) + " + " + (DELIVERY_COST * USD_RATE).toFixed(2) + " USD (delivery)"
                        : total.toFixed(2) + " + " + DELIVERY_COST.toFixed(2) + " EUR (delivery)"
                    )
                  : (currency === "usd" ? (total * USD_RATE).toFixed(2) + " USD" : total.toFixed(2) + " EUR")
                }
              )</p>
            </MenuItem>
          </RouterLink>
        </Toolbar>
      </AppBar>

      <Route exact path="/">
        <div className="App">
          <Pizzeria></Pizzeria>
        </div>
      </Route>

      <Route exact path="/cart">
        <div className="App">
          <Cart></Cart>
        </div>
      </Route>

      <Route exact path="/checkout">
        <div className="App">
          <Checkout></Checkout>
        </div>
      </Route>
    </Router>
  );
}

export default App;
