import { useSearchParams } from 'next/navigation'
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
import { useRouter } from 'next/navigation'
export function Searchlist({ data }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [count, setCount] = useState(32)
  const query = searchParams.get('query')
  const [p, setPage] = useState(
    searchParams.get('p') && searchParams.get('p') > 1
      ? searchParams.get('p')
      : 1,
  )
  const all = data[0].all
  const [items, setItems] = useState([...all])
  const querysearch = () => {
    if (query && query.split('').length > 0) {
      const matches = []
      query.split(' ').forEach((q) => {
        let mtch = all
          .slice((p - 1) * count, p * count)
          .filter(
            (i) =>
              i.title.includes(q) ||
              i.content.includes(q) ||
              i.guide.includes(q),
          )
        if (mtch.length > 0) matches.push(...mtch)
      })
      return [...matches]
    }
  }
  useEffect(() => {
    if (query) setItems(querysearch())
  }, [p])
  return (
    <>
      <Head>
        <title>
          Search: Query:{query} page:{p}-{process.env.SITENAME}
        </title>
      </Head>
      <Header />
      <div className="block">
        <div className="bg-blue-200 w-full py-3">
          <div className="mx-5 text-lg font-semibold uppercase flex justify-between">
            <span>Latest Listings :page ({p})</span>
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
            {items.length < 1 ? (
              <p className="p-1">No Matches for search query</p>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="flex justify-center my-2">
          {parseInt(p) > 1 && (
            <Link
              href={`/listings/?query=${query}&p=${parseInt(p) - 1}`}
              onClick={() => setPage(parseInt(p) - 1)}
            >
              <FaRegArrowAltCircleLeft className="text-3xl  hover:text-yellow-300" />
            </Link>
          )}
          {parseInt(p) < Math.ceil(all.length / count) && (
            <Link
              href={`/listings/?query=${query}&p=${parseInt(p) + 1}`}
              onClick={() => setPage(parseInt(p) + 1)}
            >
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

export default Searchlist
