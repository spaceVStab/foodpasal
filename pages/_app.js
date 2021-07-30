import 'tailwindcss/tailwind.css'
import { UserConextProvider } from '../utils/useUser'

function MyApp({ Component, pageProps }) {
  return (
    <UserConextProvider>
    <Component {...pageProps} />
    </UserConextProvider>
  )
}

export default MyApp
