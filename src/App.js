import React from 'react';
import './App.css';
import Pizzeria from './Pizzeria.js';

import { PizzaProvider } from './PizzaContext';

function App() {
  // const value = useContext(PizzaContext);

  return (
    <PizzaProvider>
      <div className="App">
        <Pizzeria></Pizzeria>
      </div>
    </PizzaProvider>
  );
}

export default App;
