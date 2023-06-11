import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../Head'
import Footer from '../../Footer'
import { FaAngleDoubleRight, FaTimesCircle } from 'react-icons/Fa'
import { Protect } from '/components/protected'
import { ListedItemcard } from '/components/Itemcard'
import Link from 'next/link'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { MyBarChart, MyLineChart, MyPieChart } from '/components/Charts'
import {
  MdAccountBalanceWallet,
  MdShoppingCart,
  MdRemoveRedEye,
  MdViewList,
} from 'react-icons/Md'
function Listed({ data }) {
  const { listed } = data
  const [list, setList] = useState([...listed])
  const router = useRouter()
  return (
    <>
      <Header />
      <div className="w-full mx-auto">
        <div className="shadow rounded-lg lg:w-full shadow-lg mx-auto  py-5 bg-green-50">
          <h2 className="ml-5 font-semibold w-full text-lg">LISTED ASSETS</h2>
        </div>
        <div className="mx-2 grid grid-cols-2 lg:grid-cols-4 gap-2">
          {list?.map((item, key) => (
            <ListedItemcard data={item} key={key} setList={setList} />
          ))}
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps(context) {
  return await Protect(context, '/api/users/items/list')
}
export default Listed
