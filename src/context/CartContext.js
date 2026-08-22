"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem('lumina_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('lumina_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    // Generate a unique ID based on path and size
    const cartItemId = `${item.path}_${item.size}`;
    
    setCartItems(prev => {
      // Check if already in cart
      const exists = prev.find(i => i.cartItemId === cartItemId);
      if (exists) return prev; // Do not add duplicates of the same photo + size
      
      return [...prev, { ...item, cartItemId }];
    });
    
    // Open cart automatically when adding item
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      isCartOpen,
      toggleCart,
      openCart,
      closeCart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
