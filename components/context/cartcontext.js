import { set } from 'mongoose'
import React, { useState, useContext } from 'react'
const cartcxt = React.createContext()
export function useCartcontext() {
  return useContext(cartcxt)
}
export const CartContext = ({ children }) => {
  const [cart, setCarts] = useState([])
  const setCart = (id) =>
    !cart.includes(id)
      ? setCarts([...cart, id])
      : setCarts(cart.filter((itm) => itm !== id))
  return (
    <cartcxt.Provider value={{ cart: cart, setCart: setCart }}>
      {children}
    </cartcxt.Provider>
  )
}
