import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from './Header'
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
function Mailer() {
  const router = useRouter()
  return (
    <>
      <Header />
      <div className="w-full mx-auto">
        <div className="shadow rounded-lg lg:w-full shadow-lg mx-auto  py-5 bg-green-50">
          <h2 className="ml-5 font-semibold w-full">MAILER</h2>
        </div>
      </div>
    </>
  )
}

export default Mailer
