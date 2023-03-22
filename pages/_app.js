import { CartContext } from '/components/context/cartcontext'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { Poppins, Roboto, Lato, Oswald, Tangerine } from '@next/font/google'
import Typewriter from 'typewriter-effect/dist/core'
import { unProtect } from '/components/unprotected'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '700'],
})
const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
})
const tangerine = Tangerine({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
})
const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: '700',
})
const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

const app = ({ Component, pageProps, categories }) => {
  return (
    <>
      <CartContext className={poppins.className}>
        <Layout pageProps={pageProps}>
          <Component
            {...pageProps}
            fonts={{ poppins, oswald, roboto, lato, tangerine }}
          />
        </Layout>
      </CartContext>
    </>
  )
}

export default app
