import React, { useState, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = props => {
  const [cart, setCart] = useState([
    { id: 44, name: "Special test pizza 1", price: 1 },
    { id: 45, name: "Special test pizza 2", price: 4 },
    { id: 46, name: "Special test pizza 3", price: 3 }
  ]);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  // console.log(cart);

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
  // const addToCart = product => {
  //   // const {id, name, price} = product;
  //   debugger;
  // };
  // // TODO: Clear cart
  // const clearCart = () => {};

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        total,
        // setTotal,
        cartItems,
        // setCartItems
      }}>{ props.children }</CartContext.Provider>
  )
}