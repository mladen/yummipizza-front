import React, { useState, createContext } from 'react';

export const PizzaContext = createContext();

export const PizzaProvider = props => {
  const [pizzas, setPizzas] = React.useState([
    {
      id: 1,
      name: "Bacon Pizza",
      description: "Lot's of Bacon I guess :)",
      path_to_photo: "",
    },
    {
      id: 2,
      name: "Black Oliva v1",
      description: "Black olives, paprika, onion",
      path_to_photo: "",
    },
    {
      id: 3,
      name: "Eggs",
      description: "Eggs, a bit of prosciutto, cheese",
      path_to_photo: "",
    },
    {
      id: 4,
      name: "Black Oliva v2",
      description: "Black olives, paprika, corn",
      path_to_photo: "",
    },
    {
      id: 5,
      name: "Mr. Pepper",
      description: "Pepperoni, cheese",
      path_to_photo: "",
    },
    {
      id: 6,
      name: "Mrs. Sausage",
      description: "Sausage, cheese",
      path_to_photo: "",
    },
    {
      id: 7,
      name: "Tomata",
      description: "Tomatoes, green olives, a bit of cheese",
      path_to_photo: "",
    },
    {
      id: 8,
      name: "Combined",
      description: "Pepperoni, cheese, black olives, green paprika",
      path_to_photo: "",
    },
  ]);

  return <PizzaContext.Provider value={[pizzas, setPizzas]}>{ props.children }</PizzaContext.Provider>;
}