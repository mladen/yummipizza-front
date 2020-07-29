import React, { useState, createContext } from 'react';
import axios from 'axios';

export const PizzaContext = createContext();
const USD_RATE = 1.1713;

export const PizzaProvider = props => {
  // * Default currency is EUR
  const [currency, setCurrency] = useState('eur');
  const [pizzas, setPizzas] = useState([]);

  // * Mocky's test API
  // const url = "https://run.mocky.io/v3/06276abe-6134-444a-a100-83e0c8093bae";

  // * Data from the DB
  // const url = "http://127.0.0.1:8000/api/meals";

  // * Data from the test DB I made on remotemysql.com
  const url = "https://yummipizza-api-test.herokuapp.com/api/meals";

  React.useEffect(() => {
    async function fetchMeals() {
      const response = await axios.get(`${url}`).then(response => {
        console.log("response", response);

        // As soon as we get the data we add a priceusd
        // property that contains meal's value in USD
        // (this way further work and calculations will be easier)
        response.data.forEach((meal) => {
          meal.priceusd = parseFloat((meal.price * USD_RATE).toFixed(2));
        });

        setPizzas(response.data);
      });
    }

    // Async functions in React.useEffect must be done this way
    // (first the definition and then the invocation/call)
    fetchMeals();
  }, []);

  return <PizzaContext.Provider
    value={{
      pizzas,
      currency,
      setCurrency
    }}>{ props.children }</PizzaContext.Provider>;
}