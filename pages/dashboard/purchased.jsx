import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from './Head'
import Footer from '../Footer'
import { FaAngleDoubleRight, FaTimesCircle } from 'react-icons/fa'
import { Protect } from '/components/protected'
import { PurchasedItemcard } from '/components/Itemcard'
import Link from 'next/link'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { MyBarChart, MyLineChart, MyPieChart } from '/components/Charts'
import {
  MdAccountBalanceWallet,
  MdShoppingCart,
  MdRemoveRedEye,
  MdViewList,
} from 'react-icons/md'
function Purchased({ data }) {
  const router = useRouter()
  return (
    <>
      <Header />
      <div className="w-full mx-auto">
        <div className="shadow rounded-lg lg:w-full shadow-lg mx-auto  py-5 bg-green-50">
          <h2 className="ml-5 font-semibold w-full">PURCHASED ASSETS</h2>
        </div>
        <div className="mx-2 grid grid-cols-2 lg:grid-cols-4 gap-2">
          {data?.map((item) => (
            <PurchasedItemcard data={item} />
          ))}
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps(context) {
  let hotitems = await fetch(process.env.BACK_SERVER + '/hotitems')
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
    })
    .then((data) => {
      return data.items
    })
    .catch((err) => {
      console.error({ err })
    })
  return await Protect(context, hotitems)
}
export default Purchased
