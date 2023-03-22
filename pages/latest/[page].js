import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../Header'
import Footer from '../Footer'
import { PItemcard, NItemcard } from '/components/Itemcard'
import {
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
  FaRegArrowAltCircleLeft,
} from 'react-icons/Fa'
import { unProtect } from '/components/unprotected'
import { useRouter } from 'next/router'
export function Latest({ data }) {
  const [count, setCount] = useState(16)
  const router = useRouter()
  const { page } = router.query
  const all = data[0].all
  const items = all.slice((page - 1) * count, page * count)
  return (
    <>
      <Head>
        <title>
          Latest Items: Page {page}-{process.env.SITENAME}
        </title>
      </Head>
      <Header />
      <div className="block">
        <div className="bg-blue-200 w-full py-3">
          <div className="mx-5 text-lg font-semibold uppercase flex justify-between">
            <span>Latest Listings</span>
            <span className="flex">
              <select
                onChange={(e) => setCount(e.target.value)}
                className="p-1 text-md bg-white"
              >
                <option>32</option>
                <option>16</option>
                <option>8</option>
                <option>4</option>
              </select>
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full lg:w-[95%] mx-auto shadow">
          <div className="pt-5 mx-3 lg:mx-1">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {items.map((item) => (
                <NItemcard data={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center my-2">
          {parseInt(page) > 1 && (
            <Link href={'/latest/' + (parseInt(page) - 1)}>
              <FaRegArrowAltCircleLeft className="text-3xl  hover:text-yellow-300" />
            </Link>
          )}
          {parseInt(page) < Math.ceil(all.length / count) && (
            <Link href={'/latest/' + (parseInt(page) + 1)}>
              <FaArrowAltCircleRight className="text-3xl  hover:text-yellow-300" />
            </Link>
          )}
        </div>
        <Footer className="flex-[4]" />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  return await unProtect(context, [`/api/item/index/all`])
}

export default Latest
