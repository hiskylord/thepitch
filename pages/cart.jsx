import Header from './Header'
import Footer from './Footer'
import Link from 'next/link'
import Axios from 'axios'
import Image from 'next/image'
import Swal from 'sweetalert2'
import countries from '/components/countries'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  FaHome,
  FaAngleDoubleLeft,
  FaArrowRight,
  FaTrashAlt,
  FaShoppingCart,
  FaCreditCard,
  FaBitcoin,
} from 'react-icons/Fa'
import { useCartcontext } from '/components/context/cartcontext'
function Cartdetails({ data, fonts }) {
  const { roboto, oswald } = fonts
  const { cart, setCart } = useCartcontext()
  const [cartitems, setCartItems] = useState([])
  const [sumtotal, setSumtotal] = useState(0)
  const [pmethod, setPMethod] = useState('bitcoin')
  useEffect(() => {
    document
      .querySelector('.processpay')
      .addEventListener('submit', function (e) {
        e.preventDefault()
        const data = new FormData(e.target)
        Axios({
          data,
          url: '/api/' + e.target.getAttribute('action'),
          method: e.target.getAttribute('method'),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err.message)
          })
      })
  }, [cart])
  useEffect(() => {
    Axios.post('/api/carts/fetch', { cart: cart })
      .then((res) => {
        setCartItems([...res.data.data.cartitems])
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [cart])

  useEffect(() => {
    let total = cartitems.reduce(
      (a, b) => a + (b.price * (100 - b.discount)) / 100,
      0,
    )
    setSumtotal(total)
  }, [cartitems])
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  if (searchParams.get('canceled') || searchParams.get('success')) {
    Swal.fire(
      'PAYMENT PROCESSING',
      searchParams.get('canceled')
        ? 'Payment was cancelled'
        : 'Payment was successfully received.Order is now being processed',
      searchParams.get('canceled') ? 'warning' : 'success',
    )
  }
  const [shipping, setShipping] = useState(0)
  const [COUPON, setCOUPON] = useState([])

  const applycoupon = () => {
    if (COUPON.length < 1) {
      fetch(
        process.env.BACK_SERVER +
          '/coupon/' +
          document.querySelector('.appliedcoupon').value,
      )
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((data) => {
          if (data.coupon.length < 1) {
            document.querySelector('.coupon-feedback').style.display = 'block'
          }
          setCOUPON(data.coupon)
        })
    } else {
      document.querySelector('.appliedcoupon').value = ''
      setCOUPON([])
    }
  }
  if (COUPON.length > 0) {
    total = (COUPON[0].val.includes('%')
      ? total * eval(1 - Math.abs(parseInt(COUPON[0].val)) * 0.01)
      : eval(total - Math.abs(COUPON[0].val))
    ).toFixed(2)
  }

  return (
    <>
      <Header />
      <div className="p-4">
        <div className="px-2  w-[96%] mx-auto shadow-lg rounded">
          <div className="flex justify-left bg-slate-50">
            <Link href="/" className="flex">
              <FaHome className="my-auto mx-1" /> <span> Home</span>
            </Link>{' '}
            <FaAngleDoubleLeft className="my-auto mx-4" />{' '}
            <Link href="/" className="flex">
              <FaShoppingCart className="my-auto mx-1" />{' '}
              <span> Cart ({cart.length})</span>
            </Link>{' '}
          </div>
          <div className="block lg:flex justify-between w-full">
            <div className="w-full  lg:w-[55%] p-4 border-r-2">
              {cartitems.map((c) => (
                <div className="flex w-full justify-between gap-2  border-b-2 border-slate-200 py-2">
                  <div className="relative w-[80px] lg:w-[100px] h-[100px]">
                    <Image
                      src={'/uploads/items/temp/' + c.photos[0]}
                      alt="Slider"
                      fill={true}
                    />
                  </div>
                  <div className="relative h-[100px] text-left w-[160px] mx-3 flex justify-between">
                    <div className="flex flex-col">
                      {' '}
                      <p
                        className={
                          'legend my-auto uppercase font-light text-sm text-left truncate ' +
                          roboto.className
                        }
                      >
                        {c.title}
                      </p>
                      <p
                        className={
                          'legend my-auto uppercase font-semibold text-sm truncate flex ' +
                          roboto.className
                        }
                      >
                        <span>Cost:</span>{' '}
                        <span>
                          $
                          {Number(
                            (c.price * (100 - c.discount)) / 100,
                          ).toLocaleString(2)}
                        </span>
                      </p>
                      {c.discount > 0 && (
                        <p
                          className={
                            'legend my-auto uppercase font-semibold text-sm truncate flex ' +
                            roboto.className
                          }
                        >
                          <span>Saved:</span>{' '}
                          <span>
                            $
                            {Number(
                              (c.price * c.discount) / 100,
                            ).toLocaleString(2)}
                          </span>
                        </p>
                      )}
                    </div>
                    <button
                      className="bg-transparent w-[10px] mt-0"
                      type="button"
                      title="Remove Item"
                      onClick={() => {
                        Swal.fire({
                          title: 'Click Ok remove the item?',
                          showCancelButton: true,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            setCart(c._id)
                          }
                        })
                      }}
                    >
                      <FaTrashAlt className="text-red-200 mt-0" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between mt-4 uppercase bg-blue-200 p-4 font-semibold">
                <span>Total</span> <span>${sumtotal.toLocaleString(2)}</span>
              </div>
            </div>
            <div className="w-full lg:w-[45%] p-4">
              <form method="post" action="carts/pay" className="processpay">
                <div className="bg-indigo-50 py-1 px-1 font-bold text-xl text-center">
                  <span>CONTACT INFO</span>
                </div>{' '}
                <div className="input-group mt-1 p-2">
                  <label className="font-semibold uppercase">Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="pl-1 py-1  w-full rounded-lg  border-2 border-ash-200"
                  />
                </div>
                <div className="input-group mt-1 p-2">
                  <label className="font-semibold uppercase">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="pl-1 py-1  w-full rounded-lg  border-2 border-ash-200"
                  />
                </div>
                <div className="input-group mt-1 p-2">
                  <label className="font-semibold uppercase">Country:</label>
                  <select
                    name="country"
                    className="pl-1 py-1  w-full rounded-lg border-2 border-ash-200"
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map((country, key) => (
                      <option key={key}>{country.name}</option>
                    ))}
                  </select>
                  <input name="cart" value={cart} type="hidden" />
                </div>
                <div className="input-group mt-1 p-2 flex gap-4">
                  <span
                    onClick={() => setPMethod('bitcoin')}
                    for="bitcoin"
                    className={
                      pmethod === 'bitcoin' ? 'border-2 border-slate-300' : ''
                    }
                  >
                    <FaBitcoin className="text-3xl text-yellow-400" />
                    <input
                      type="hidden"
                      name="method"
                      value={pmethod}
                      id="bitcoin"
                      style={{ display: 'none' }}
                    />
                  </span>
                  <span
                    for="card"
                    onClick={() => setPMethod('card')}
                    className={
                      pmethod === 'card' ? 'border-2 border-slate-300' : ''
                    }
                  >
                    <FaCreditCard className="text-3xl text-green-400" />
                  </span>
                </div>
                <div className="input-group mt-2">
                  <button
                    type="submit"
                    className="p-3 bg-blue-300 hover:bg-blue-400  rounded-xl w-full text-center mx-auto"
                  >
                    PROCEED
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Cartdetails
