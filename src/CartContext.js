import React, { useState, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = props => {
  const [cart, setCart] = React.useState('');

  return <CartContext.Provider value={[cart, setCart]}>{ props.children }</CartContext.Provider>;
}