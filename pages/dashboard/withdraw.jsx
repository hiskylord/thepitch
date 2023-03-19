import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from './Head'
import Footer from '../Footer'
import { FaAngleDoubleRight, FaTimesCircle } from 'react-icons/fa'
import { Protect } from '/components/protected'
import { PItemcard } from '/components/Itemcard'
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
function Withdraw({ hotitems }) {
  const router = useRouter()
  return (
    <>
      <Header />
      <div className="w-full mx-auto">
        <div className="shadow rounded-lg lg:w-full shadow-lg mx-auto  py-5 bg-green-50">
          <h2 className="ml-5 font-semibold w-full">WITHDRAW</h2>
        </div>

        <div className="bg-blue-50 py-5 h-[80vh] px-5">
          <form
            method="post"
            className="mt-[5%] bg-white mx-auto lg:w-[50%] w-full shadow-lg px-5 rounded-lg"
          >
            <h2 className="font-semibold w-full py-2">WITHDRAW FUNDS</h2>
            <label className="font-semibold mt-1 uppercase text-sm">
              Amount:
            </label>
            <input
              name="amount"
              placeholder="Amount in USD"
              className="mb-2 w-full p-2 border-2 border-slate-150 rounded"
            />
            <label className="font-semibold mt-1 uppercase text-sm">
              Deposit Method:
            </label>
            <select
              name="method"
              className="mb-2 w-full p-2 border-2 border-slate-150 rounded"
            >
              <option>CRYPTO</option>
              <option>CARD</option>
            </select>
            <div className="w-full flex justify-center py-2">
              <button
                type="submit"
                className="bg-blue-200 p-2 lg:w-[50%] w-full mx-auto"
              >
                DEPOSIT FUNDS
              </button>
            </div>
          </form>
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
export default Withdraw
