import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Pizzeria from './Pizzeria.js';
import Cart from './Cart.js';
// import Checkout from './Checkout.js';
// import Error from './Error.js';

import { PizzaProvider } from './PizzaContext';
import { CartProvider } from './CartContext';

function App() {
  // const value = useContext(PizzaContext);

  return (
    <Router>
      <Route exact path="/">
        <CartProvider>
          <PizzaProvider>
            <div className="App">
              <Pizzeria></Pizzeria>
            </div>
          </PizzaProvider>
        </CartProvider>
      </Route>

      <Route exact path="/cart">
        <Cart/>
      </Route>
    </Router>
  );
}

export default App;
