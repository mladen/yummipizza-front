import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link as RouterLink} from 'react-router-dom';
import Pizzeria from './Pizzeria.js';
import Cart from './Cart.js';
// import Checkout from './Checkout.js';
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
import { red, yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: red.A700,
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'white'
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  // const { pizzas } = React.useContext(PizzaContext);
  const { cart, cartItems, total } = React.useContext(CartContext);
  console.log("cart is: ", cart);

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

          <RouterLink to="/cart" className={classes.linkStyle}>
            <MenuItem align="right">
              <IconButton aria-label="show 11 new notifications" color="inherit">
                <Badge badgeContent={cartItems} color="secondary">
                  <YourPizzasIcon />
                </Badge>
              </IconButton>
              <p>Your pizzas (${total})</p>
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
    </Router>
  );
}

export default App;
