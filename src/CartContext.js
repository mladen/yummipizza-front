import React, { useState, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = props => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = React.useState(0);

  React.useEffect(() => {
    // Cart items
    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);
    setCartItems(newCartItems);

    // Cart total
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
  }, [cart]);

  // * Remove item
  const removeItem = id => {
    let newCart = [...cart].filter(item => item.id !== id);
    setCart(newCart);
  };

  // * Increase amount
  const increaseAmount = id => {
    console.log("Increasing amount for id: ", id);
    const newCart = [...cart].map(item => {
      return item.id === id
        ? { ...item, amount: item.amount + 1 }
        : { ...item };
    });

    setCart(newCart);
  };

  // * Decrease amount
  const decreaseAmount = (id, amount) => {
    console.log("Decreasing amount for id: ", id);

    if (amount === 1) {
      removeItem(id);
      return;
    } else {
      const newCart = [...cart].map(item => {
        return item.id === id
          ? { ...item, amount: item.amount - 1 }
          : { ...item };
      });
      setCart(newCart);
    }
  };

  // * Add to cart
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
        total,
        increaseAmount,
        decreaseAmount
      }}>{ props.children }</CartContext.Provider>
  )
}