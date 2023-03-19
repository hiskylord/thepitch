import { CartContext } from '/components/context/cartcontext'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { Poppins } from '@next/font/google'
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '700'],
})
const app = ({ Component, pageProps }) => {
  return (
    <CartContext className={poppins.className}>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </CartContext>
  )
}
export default app
