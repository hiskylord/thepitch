import Head from 'next/head'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Axios from 'axios'
import Header from './Header'
import Footer from './Footer'
import { PItemcard, NItemcard, AdsItemcard } from '/components/Itemcard'
import { unProtect } from '/components/unprotected'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  FaSearch,
  FaAngleRight,
  FaAngleDoubleRight,
  FaRegGem,
} from 'react-icons/Fa'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import Typewriter from 'typewriter-effect/dist/core'

import lg from '../public/assets/logo.png'
function Home({ data, categories, fonts }) {
  const router = useRouter()
  const items = data[0].all
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const { roboto, tangerine, lato, oswald } = fonts
  useEffect(() => {
    new Typewriter('#apptext', {
      strings: [
        'Get that Online Business up and running now.',
        'We are your One Stop Partners',
      ],
      autoStart: true,
      loop: true,
    })
  })
  const [cartcount, setCartCount] = useState(0)
  const promoted = useMemo(
    () =>
      items
        .sort((a, b) => parseInt(b.discount) - parseInt(a.discount))
        .slice(-16),
    [items],
  )

  return (
    <>
      <Header cartcount={cartcount} setCartCount={setCartCount} />
      <div className="block w-full">
        <div className="lg:h-[550px] h-[500px] w-full">
          <div className="mx-auto flex lg:flex-row-reverse flex-col bg-gray-800 h-full">
            <Carousel
              autoPlay
              interval="2500"
              transitionTime="2500"
              className="drop-shadow-lg w-full lg:h-[600px] h-[450px]"
              showThumbs={false}
            >
              <div className="relative my-auto lg:h-[500px] h-[450px]">
                <img
                  src={'/assets/images/wave1.png'}
                  alt="Slider"
                  className="w-full lg:w-full/2 h-full lg:h-[500px]"
                  style={{ filter: 'invert(0.5)' }}
                />
                <div className="legend2">
                  <div className="my-auto">
                    <p
                      className={
                        'mx-auto lg:text-6xl text-4xl font-bold mt-10 text-yellow-500 ' +
                        roboto.className
                      }
                      style={{
                        textShadow: '4px 4px 4px #999',
                      }}
                    >
                      {process.env.SITENAME}
                    </p>
                    <p
                      className={
                        'lg:text-6xl text-3xl font-semibold mt-6 text-blue-100 ' +
                        tangerine.className
                      }
                      style={{
                        textShadow: '4px 4px 4px #dfbe5c',
                      }}
                    >
                      #1 Platform to Buy and Sell sophisticated and fully
                      customizable
                    </p>
                    <h2
                      className={
                        'lg:text-4xl text-2xl mt-7 font-bold text-blue-100 ' +
                        tangerine.className
                      }
                      style={{
                        fontSize: '48px',
                        textShadow: '4px 4px 4px #dfbe5c',
                      }}
                    >
                      Websites and Apps
                    </h2>
                  </div>

                  <div className="visible mt-10 searchform w-full  max-h-[200px] py-10  transition-colors duration-500 lg:w-[65%] w-[96%] mx-auto">
                    <form
                      method="get"
                      className="flex h-fit mx-auto my-auto border-2 border-yellow-400 hover:w-full w-[96%] rounded place-self-auto"
                      action="/listings"
                      onSubmit={(e) => {
                        e.preventDefault()
                        router.push(`/listings/?query=${e.target.query.value}`)
                      }}
                    >
                      <input
                        name="query"
                        className={
                          'pl-2 py-2 rounded-l flex-grow  focus:w-96 focus:outline-none ' +
                          lato.className
                        }
                        placeholder="Search..."
                      />
                      <button className="pr-auto p-2  py-3 rounded-r bg-white">
                        <FaSearch className="text-yellow" />
                      </button>
                    </form>
                    <small
                      id="apptext"
                      className={
                        'text-blue-100 text-sm uppercase ' + oswald.className
                      }
                    ></small>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full mx-auto ">
          {items.filter((t) => t.promoted).length > 0 && (
            <div className="my-2 rounded-top-lg shadow-lg uppercase bg-yellow-400 py-3 mb-3 border-2 border-slate-300 text-gray rounded-top-lg shadow-lg uppercase py-2">
              <div className="flex justify-between text-sm mx-2">
                <p className="font-semibold uppercase"> Promoted</p>
                <FaRegGem className="text-white font-bold text-xl rotate" />
              </div>
            </div>
          )}
          <div className="relative ads">
            {items
              .filter((t) => t.promoted)
              .slice(-3)
              .reverse()
              .map((data, k) => (
                <AdsItemcard key={k} data={data} />
              ))}
          </div>
          <div className="rounded-top-lg shadow-lg uppercase bg-yellow-400 py-3 my-3 border-2 border-slate-300 text-gray rounded-top-lg shadow-lg uppercase  py-2">
            <div className="flex justify-between text-sm mx-2">
              <p className="font-semibold uppercase"> Latest</p>
              <Link
                href="/latest/1"
                title="All Items"
                className="flex uppercase font-bold"
              >
                <span>All Items</span>
                <FaAngleDoubleRight className="my-auto text-xl" />
              </Link>
            </div>
          </div>
          <div className="my-2 mx-3 lg:mx-1">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
              {items
                .slice(-16)
                .reverse()
                .map((item, k) => (
                  <NItemcard data={item} key={k} />
                ))}
            </div>

            <div className="bg-light-300 shadow">
              <div className="rounded-top-lg shadow-lg uppercase bg-yellow-300 py-3 mb-3  rounded-t flex justify-between text-sm">
                <div className="flex justify-between text-sm mx-2 w-full">
                  <p className="font-semibold uppercase"> Hot Deals</p>
                  <Link
                    href="/promotions/1"
                    title="Promotions"
                    className="flex uppercase font-bold"
                  >
                    <span>Promotions</span>
                    <FaAngleDoubleRight className="my-auto text-xl" />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mx-auto">
                {promoted.map((itm, k) => (
                  <PItemcard data={itm} key={k} />
                ))}
              </div>
            </div>
            <div className="bg-light-300 shadow my-4">
              <div className="rounded-top-lg shadow-lg text-sm uppercase bg-yellow-300 py-3 mb-3  rounded-t">
                <h2 className="ml-3 font-semibold">Customers Picks</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {items
                  .sort((a, b) => a.likes - b.likes)
                  .slice(-16)
                  .map((itm, k) => (
                    <NItemcard data={itm} key={k} />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <Footer className="flex-[4]" categories={categories} />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  return await unProtect(context, [`/api/item/index/all`])
}
export default Home
