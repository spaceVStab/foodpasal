import 'tailwindcss/tailwind.css'
import { UserConextProvider } from '@/utils/useUser'
import { CartContext } from '@/components/CartContext'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {

  const [cartItems, setCartItems] = useState({})

  return (
    <UserConextProvider>
      <CartContext.Provider value={{cartItems, setCartItems}}>
        <Component {...pageProps} />
      </CartContext.Provider>
    </UserConextProvider>
  )
}

export default MyApp
