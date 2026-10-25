import { createContext, useContext, useEffect, useState } from 'react'
import { PRODUCTS, ORDERS } from './data'

// Global app state (products, cart, orders, admin login) shared through context.
// Everything is saved to localStorage, so it survives a page refresh.

const StoreContext = createContext()
export const useStore = () => useContext(StoreContext)

// localStorage keys (keep these the same, or saved data will be lost)
const STORAGE_KEYS = {
  products: 'mx_p2',
  cart: 'mx_c',
  orders: 'mx_o',
  admin: 'mx_a',
}

function loadFromStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

// Same as useState, but the value is read from / written to localStorage
function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => loadFromStorage(key, initialValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export function StoreProvider({ children }) {
  const [products, setProducts] = usePersistentState(STORAGE_KEYS.products, PRODUCTS)
  const [cart, setCart] = usePersistentState(STORAGE_KEYS.cart, [])
  const [orders, setOrders] = usePersistentState(STORAGE_KEYS.orders, ORDERS)
  const [admin, setAdmin] = usePersistentState(STORAGE_KEYS.admin, false)

  // Adding the same helmet in the same size again just bumps the quantity
  const addToCart = (product, size) =>
    setCart((items) => {
      const index = items.findIndex((item) => item.id === product.id && item.size === size)

      if (index > -1) {
        return items.map((item, i) => (i === index ? { ...item, qty: item.qty + 1 } : item))
      }

      return [
        ...items,
        {
          id: product.id,
          name: `${product.brand} ${product.name}`.toUpperCase(),
          img: product.img,
          price: product.price,
          size,
          qty: 1,
        },
      ]
    })

  // change is +1 or -1, quantity never goes below 1
  const changeQuantity = (index, change) =>
    setCart((items) =>
      items.map((item, i) =>
        i === index ? { ...item, qty: Math.max(1, item.qty + change) } : item,
      ),
    )

  const removeFromCart = (index) => setCart((items) => items.filter((_, i) => i !== index))

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  // customer = { name, email, phone, address }. Returns the new order id.
  const placeOrder = (customer) => {
    const id = 'MTX-' + (1000 + orders.length + 1 + Math.floor(Math.random() * 90))

    const newOrder = {
      id,
      ...customer,
      total: cartTotal,
      status: 'Pending',
      items: cart.map(({ name, size, qty, price }) => ({ name, size, qty, price })),
    }

    setOrders((existing) => [newOrder, ...existing])
    setCart([])
    return id
  }

  const value = {
    products,
    setProducts,
    cart,
    orders,
    setOrders,
    admin,
    setAdmin,
    addToCart,
    changeQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    placeOrder,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
