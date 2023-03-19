import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from './Head'
import Footer from '../Footer'
import { FaAngleDoubleRight, FaTimesCircle } from 'react-icons/Fa'
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
} from 'react-icons/Md'
const baseurl = () =>
  typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : ''
function Dashboard({ hotitems }) {
  const router = useRouter()
  return (
    <>
      <Header />
      <div className="w-full mx-auto">
        <div className="bg-blue-200 pb-[50px]">
          <div className="container  py-12 mx-auto px-4 md:px-12 top-menu">
            <div className="grid grid-cols-1 lg:grid-cols-4  grid-flow-rows gap-4 w-full">
              {/* BALANCE */}
              <div className="card bg-blue-100 rounded-lg shadow-lg pt-3">
                <div className="card-body  border-t-blue px-3 py-3 flex justify-between">
                  <div>
                    <p className="text-[#999] uppercase text-sm">
                      Total Balance
                    </p>
                    <div className="card-title">18383</div>
                  </div>
                  <span className="card-img my-auto bg-white p-2 rounded-full">
                    <MdAccountBalanceWallet />
                  </span>
                </div>
                <div className="card-footer bg-blue-50 py-2 px-2  flex justify-between rounded">
                  <span>1% </span>
                  <span className="text-sm"> Last 7 days</span>
                </div>
              </div>
              {/* BALANCE */}
              {/* PURCHASE */}
              <div className="card bg-blue-100 rounded-lg shadow-lg pt-3">
                <div className="card-body  border-t-blue px-3 py-3 flex justify-between">
                  <div>
                    <p className="text-[#999] uppercase text-sm">
                      Total Purchase
                    </p>
                    <div className="card-title">18383</div>
                  </div>
                  <span className="card-img my-auto bg-cyan-200 p-2 rounded-full">
                    <MdShoppingCart />
                  </span>
                </div>
                <div className="card-footer bg-blue-50 py-2 px-2 flex justify-between rounded">
                  <span>1% </span>
                  <span className="text-sm"> Last 7 days</span>
                </div>
              </div>
              {/* PURCHASE */}
              {/* SELLS */}
              <div className="card bg-blue-100 rounded-lg shadow-lg pt-3">
                <div className="card-body  border-t-blue px-3 py-3 flex justify-between">
                  <div>
                    <p className="text-[#999] uppercase text-sm">Total Sales</p>
                    <div className="card-title">18383</div>
                  </div>
                  <span className="card-img my-auto bg-green-100 p-2 rounded-full">
                    <MdShoppingCart />
                  </span>
                </div>
                <div className="card-footer bg-blue-50 py-2 px-2 flex justify-between rounded">
                  <span>1% </span>
                  <span className="text-sm"> Last 7 days</span>
                </div>
              </div>
              {/* SELLS */}
              {/* ITEM HITS */}
              <div className="card bg-blue-100 rounded-lg shadow-lg pt-3">
                <div className="card-body  border-t-blue px-3 py-3 flex justify-between">
                  <div>
                    <p className="text-[#999] uppercase text-sm">Items Views</p>
                    <div className="card-title">18383</div>
                  </div>
                  <span className="card-img my-auto bg-white p-2 rounded-full">
                    <MdRemoveRedEye />
                  </span>
                </div>
                <div className="card-footer bg-blue-50 py-2 px-2 flex justify-between rounded">
                  <span>1% </span>
                  <span className="text-sm"> Last 30 days</span>
                </div>
              </div>
              {/* ITEM HITS */}
            </div>
          </div>
        </div>
        <div className="shadow-lg lg:flex block mt-[-50px]">
          <div className="shadow rounded-lg lg:w-[50%] shadow-lg mx-2  py-5 bg-green-50">
            <h2 className="ml-5 font-semibold w-full">PENDING PURCHASE</h2>
            <table className="min-w-full bg-green-50">
              <thead className="border-b uppercase">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Item
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-white">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    1
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    Title
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    $1000
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    PENDING
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link
                      className="flex justify-center bg-slate-200 rounded-lg py-1"
                      href="dashboard/view/id"
                    >
                      <span className="font-semibold uppercase text-sm">
                        View
                      </span>{' '}
                      <MdRemoveRedEye className="my-auto text-green" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="shadow rounded-lg lg:w-[50%] shadow-lg mx-2  py-5 bg-green-50">
            <h2 className="ml-5 font-semibold w-full">ORDER HISTORY</h2>
            <table className="min-w-full bg-green-50">
              <thead className="border-b uppercase">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Item
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-white">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    1
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    Title
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    $1000
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    PENDING
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link
                      className="flex justify-center bg-slate-200 rounded-lg py-1"
                      href="dashboard/view/id"
                    >
                      <span className="font-semibold uppercase text-sm">
                        View
                      </span>{' '}
                      <MdRemoveRedEye className="my-auto text-green" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="shadow-lg lg:flex block mt-5">
          <div className="w-full lg:w-[50%] py-5 bg-blue-50">
            <h2 className="ml-5 font-semibold border-0 text-sm mb-2">
              RECENT ASSETS
            </h2>
            <div className="mx-2 grid grid-cols-2 lg:grid-cols-3 gap-2">
              {hotitems?.map((item) => (
                <PItemcard data={item} />
              ))}
            </div>
          </div>
          <div className="shadow-lg rounded-lg lg:w-[50%] shadow-lg mx-2 py-5 bg-blue-50">
            <div className="shadow flex justify-between border-0">
              {' '}
              <h2 className="ml-5 font-semibold border-0 text-sm mb-2">
                VISITORS/SALES CHART
              </h2>{' '}
              <div>
                <a
                  href="/dashboard"
                  className="bg-[#82ca9d] mx-1 rounded p-1 text-sm font-semibold hover:bg-blue-200"
                >
                  SALES
                </a>
                <a
                  href="/dashboard"
                  className="bg-[#587fdb] mx-1 rounded p-1 text-sm font-semibold hover:bg-blue-200"
                >
                  VIEWS
                </a>
              </div>{' '}
            </div>
            <MyBarChart />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  return await Protect(context, '/api/users/profile')
}
export default Dashboard
