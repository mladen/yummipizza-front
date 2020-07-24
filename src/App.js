import React from 'react';
import './App.css';
import Pizzeria from './Pizzeria.js';

import { PizzaProvider } from './PizzaContext';
import { CartProvider } from './CartContext';

function App() {
  // const value = useContext(PizzaContext);

  return (
    <CartProvider>
      <PizzaProvider>
        <div className="App">
          <Pizzeria></Pizzeria>
        </div>
      </PizzaProvider>
    </CartProvider>
  );
}

export default App;
