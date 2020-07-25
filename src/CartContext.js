import React, { useState, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = props => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  React.useEffect(() => {
    // TODO: Local storage
    let newCartItems = cart.reduce((total, cartItem) => {
      // console.log({total, cartItem});

      return (total += cartItem.price);
      // return total;
    }, 0);

    setTotal(newCartItems);
  }, [cart]);

  // // TODO: Remove item
  // const removeItem = id => {};
  // // TODO: Increase amount
  // const increaseAmount = id => {};
  // // TODO: Decrease amount
  // const decreaseAmount = id => {};
  // // TODO: Add to cart
  const addToCart = e => {
    // const {id, name, price} = product;
    const newPizza = JSON.parse(e.target.parentElement.value);
    setCart(prevCartPizzas => [...prevCartPizzas, newPizza]);
  };
  // // TODO: Clear cart
  // const clearCart = () => {};

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        total
      }}>{ props.children }</CartContext.Provider>
  )
}