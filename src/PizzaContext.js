import React, { useState, createContext } from 'react';
import axios from 'axios';

export const PizzaContext = createContext();

export const PizzaProvider = props => {
  const [pizzas, setPizzas] = useState([
    // {
    //   id: 1,
    //   name: "Bacon Pizza",
    //   description: "Lot's of Bacon I guess :)",
    //   price: "6",
    //   path_to_photo: "",
    // },
    // {
    //   id: 2,
    //   name: "Black Oliva v1",
    //   description: "Black olives, paprika, onion",
    //   price: "8",
    //   path_to_photo: "",
    // },
    // {
    //   id: 3,
    //   name: "Eggs",
    //   description: "Eggs, a bit of prosciutto, cheese",
    //   price: "5",
    //   path_to_photo: "",
    // },
    // {
    //   id: 4,
    //   name: "Black Oliva v2",
    //   description: "Black olives, paprika, corn",
    //   price: "8",
    //   path_to_photo: "",
    // },
    // {
    //   id: 5,
    //   name: "Mr. Pepper",
    //   description: "Pepperoni, cheese",
    //   price: "7",
    //   path_to_photo: "",
    // },
    // {
    //   id: 6,
    //   name: "Mrs. Sausage",
    //   description: "Sausage, cheese",
    //   price: "11",
    //   path_to_photo: "",
    // },
    // {
    //   id: 7,
    //   name: "Tomata",
    //   description: "Tomatoes, green olives, a bit of cheese",
    //   price: "6",
    //   path_to_photo: "",
    // },
    // {
    //   id: 8,
    //   name: "Combined",
    //   description: "Pepperoni, cheese, black olives, green paprika",
    //   price: "8",
    //   path_to_photo: "",
    // },
  ]);

  // * Mocky's test API
  // const url = "https://run.mocky.io/v3/06276abe-6134-444a-a100-83e0c8093bae";

  // * Data from the DB
  const url = "http://127.0.0.1:8000/api/meals";

  // * Data from the test DB I made on remotemysql.com
  // const url = "https://yummipizza-api-test.herokuapp.com/api/meals";

  React.useEffect(() => {
    axios.get(`${url}`).then(response => {
      console.log(response);
      setPizzas(response.data);
    });
    return () => {};
  }, []);

  return <PizzaContext.Provider value={{pizzas}}>{ props.children }</PizzaContext.Provider>;
}