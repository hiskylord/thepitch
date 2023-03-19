import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Footer from '../Footer'
import { FaAngleDoubleRight, FaTimesCircle } from 'react-icons/fa'
import { MdDelete, MdScatterPlot, MdEdit } from 'react-icons/md'
import { Protect } from '/components/protected'
import { PurchasedItemcard } from '/components/Itemcard'
import Header from './Header'
import Form from '/components/Form'
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
import axios from 'axios'
function Settings({ data }) {
  const router = useRouter()
  const getcategories = () => {
    Axios.get('/api/admin/category/list', {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      setCategories(res.data.data.categories)
    })
  }
  const [categories, setCategories] = useState(data.categories)
  const [category, setCategory] = useState(data.categories[0])
  const subcategories = category.subcategories

  function hookform() {
    document.querySelectorAll('form:not(.unlink)').forEach((form) => {
      form.addEventListener('submit', function (e) {
        Form(e)
        setTimeout(() => {
          getcategories()
          setCategory(category)
        }, 500)
      })
    })
  }
  useEffect(() => {
    hookform()
  }, [subcategories])
  useEffect(() => {
    getcategories()
  }, [])
  const [ActivePage, setPage] = useState('CATEGORIES')
  const handlePage = (e) => setPage(e.target.value)
  return (
    <>
      <Header />
      <div className="w-full mx-auto">
        <div className="shadow rounded-lg lg:w-full shadow-lg mx-auto  py-5 bg-green-50">
          <h2 className="ml-5 font-semibold w-full">SETTINGS</h2>
        </div>
        <div className="flex justify-evenly"> </div>
        <div className="mx-2 grid grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
          <label className="border-blue-50 border-2 py-3 bg-slate-100 font-bold text-center">
            CATEGORIES
            <input
              type="radio"
              name="page"
              className="hidden"
              value="CATEGORIES"
              onClick={handlePage}
            />
          </label>
          <label className="border-blue-50 border-2 py-3 bg-slate-100 font-bold text-center">
            SITE DATA
            <input
              type="radio"
              name="page"
              className="hidden"
              value="SITEDATA"
              onClick={handlePage}
            />
          </label>
          <label className="border-blue-50 border-2 py-3 bg-slate-100 font-bold text-center">
            COUPON
            <input
              type="radio"
              name="page"
              className="hidden"
              value="COUPON"
              onClick={handlePage}
            />
          </label>
          <label className="border-blue-50 border-2 py-3 bg-slate-100 font-bold text-center">
            NOTIFICATIONS
            <input
              type="radio"
              name="page"
              className="hidden"
              value="NOTIFICATIONS"
              onClick={handlePage}
            />
          </label>
        </div>
        <div
          className={
            (ActivePage == 'SITEDATA' ? '' : 'hidden ') +
            'w-full lg:w-[70%] mx-auto  px-3 py-5 rounded border-2 border-slate-100 mt-5'
          }
        >
          <h2 className="text-lg text-grey-100 uppercase font-bold">
            SITE DATA
          </h2>
          <br />
          <h2 className="text-lg text-grey-100 uppercase w-full">FEES </h2>

          <form
            method="post"
            action="/admin/sitedata"
            className="border-2 border-slate-50 mb-3 mt-2 px-3 py-3 w-full mx-auto"
          >
            <div className="w-full flex my-3">
              <div className="w-[50%]">
                <label>Sales Tax(%)</label>
                <input
                  className="px-2 py-2 rounded-lg w-[95%] border-2 border-grey-200"
                  placeholder="Sales Tax"
                  name="saletax"
                  type="number"
                  defaultValue={5}
                />
              </div>
              <div className="w-[50%]">
                <label>Verification Fee($)</label>
                <input
                  className="px-2 py-2 rounded-lg w-[95%] border-2 border-grey-200"
                  placeholder="verification"
                  name="verificationfee"
                  defaultValue="50"
                  type="number"
                />
              </div>
            </div>
            <div className="w-full flex my-3">
              <div className="w-[50%]">
                <label>Domain ($)</label>
                <input
                  className="px-2 py-2 rounded-lg w-[95%] border-2 border-grey-200"
                  placeholder="Setup Fee"
                  name="domain"
                  type="number"
                  defaultValue={11}
                />
              </div>
              <div className="w-[50%]">
                <label>Hosting ($)</label>
                <input
                  className="px-2 py-2 rounded-lg w-[95%] border-2 border-grey-200"
                  placeholder="hosting"
                  name="hosting"
                  type="number"
                  defaultValue={40}
                />
              </div>
            </div>

            <button
              className="px-5 py-3 rounded-lg bg-blue-100 w-[10%]"
              type="submit"
            >
              UPDATE
            </button>
          </form>

          <h2 className="text-lg text-grey-100 uppercase">DATA </h2>

          <form
            method="post"
            action="/admin/sitedata"
            className="border-2 border-slate-50 mb-3 mt-2 px-3 py-3 w-full mx-auto"
          >
            <div className="w-full flex my-3">
              <div className="w-[50%]">
                <label>Phone Number </label>
                <input
                  className="px-2 py-2 rounded-lg w-[95%] border-2 border-grey-200"
                  placeholder="Phone"
                  name="phone"
                />
              </div>
              <div className="w-[50%]">
                <label>Email </label>
                <input
                  className="px-2 py-2 rounded-lg w-[95%] border-2 border-grey-200"
                  placeholder="Email"
                  name="email"
                />
              </div>
            </div>
            <div className="w-full flex my-3">
              <div className="w-[50%]">
                <label>Instagram </label>
                <input
                  className="px-2 py-2 rounded-lg w-[95%] border-2 border-grey-200"
                  placeholder="instagram"
                  name="instagram"
                />
              </div>
              <div className="w-[50%]">
                <label>Facebook </label>
                <input
                  className="px-2 py-2 rounded-lg w-[95%] border-2 border-grey-200"
                  placeholder="facebook"
                  name="facebook"
                />
              </div>
            </div>
            <div className="w-full flex my-3">
              <div className="w-[97.5%]">
                <label>Address </label>
                <textarea
                  className="px-2 py-2 rounded-lg mx-auto w-full border-2 border-grey-200"
                  placeholder="Address"
                  name="address"
                />
              </div>
            </div>
            <button
              className="px-5 py-3 rounded-lg bg-blue-100 w-[10%]"
              type="submit"
            >
              UPDATE
            </button>
          </form>
        </div>

        <div
          className={
            (ActivePage == 'NOTIFICATIONS' ? '' : 'hidden ') +
            'w-full lg:w-[70%] mx-auto  px-3 py-5 rounded border-2 border-slate-100 mt-5'
          }
        >
          <h2 className="text-lg text-grey-100 uppercase">NOTIFICATIONS </h2>
        </div>

        <div
          className={
            (ActivePage == 'COUPON' ? '' : 'hidden ') +
            'w-full lg:w-[70%] mx-auto  px-3 py-5 rounded border-2 border-slate-100 mt-5'
          }
        >
          <h2 className="text-lg text-grey-100 uppercase">COUPON </h2>

          <form
            method="post"
            action="/admin/coupon"
            className="border-2 border-slate-50 mb-3 mt-2 px-3 py-3 w-full mx-auto"
          >
            <div className="w-full flex my-3">
              <div className="w-[50%]">
                <label>CODE</label>
                <input
                  className="px-2 py-2 rounded-lg w-[95%] border-2 border-grey-200"
                  placeholder="Coupon Code"
                  name="code"
                  type="text"
                />
              </div>
              <div className="w-[50%]">
                <label>VALUE ($/%)</label>
                <input
                  className="px-2 py-2 rounded-lg w-[95%] border-2 border-grey-200"
                  placeholder="eg -1000 OR 5%"
                  name="value"
                  type="text"
                />
              </div>
            </div>
            <div className="w-full flex my-3">
              <div className="w-[50%]">
                <label>Description</label>
                <input
                  className="px-2 py-2 rounded-lg w-[95%] border-2 border-grey-200"
                  placeholder="Setup Fee"
                  name="description"
                  defaultValue="Save Big with this coupon"
                />
              </div>
              <div className="w-[50%]">
                <label>Usage</label>
                <select
                  className="px-2 py-2 rounded-lg w-[95%] border-2 border-grey-200"
                  placeholder="Setup Fee"
                  name="usage"
                  defaultValue="Save Big with this coupon"
                >
                  <option>ONETIME</option>
                  <option>REOCCURENT</option>
                </select>
              </div>
            </div>
            <div className="w-full flex my-3">
              <div className="w-[50%]">
                <label>START DATE</label>
                <input
                  className="px-2 py-2 rounded-lg w-[95%] border-2 border-grey-200"
                  placeholder="Coupon Code"
                  name="code"
                  type="date"
                />
              </div>
              <div className="w-[50%]">
                <label>END DATE</label>
                <input
                  className="px-2 py-2 rounded-lg w-[95%] border-2 border-grey-200"
                  placeholder="eg -1000 OR 5%"
                  name="start"
                  type="date"
                />
              </div>
            </div>
            <button
              className="px-5 py-3 rounded-lg bg-blue-100 w-[10%]"
              type="submit"
            >
              UPDATE
            </button>
          </form>
        </div>
        <div
          className={
            (ActivePage == 'CATEGORIES' ? '' : 'hidden ') +
            'w-full lg:w-[70%] mx-auto  px-3 py-5 rounded border-2 border-slate-100 mt-5'
          }
        >
          <h2 className="text-lg text-grey-100 uppercase">Categories </h2>
          <form
            method="post"
            action="/admin/category/add"
            className="border-2 border-slate-50 mb-3 mt-2 px-3 py-3 w-full mx-auto"
          >
            <input
              className="px-2 py-2 rounded-l-lg w-[85%]"
              placeholder="New Category"
              name="category"
            />{' '}
            <button
              className="px-5 py-3 rounded-r-lg bg-blue-100 w-[10%]"
              type="submit"
            >
              ADD
            </button>
          </form>
          <div className="flex justify-between">
            <ul className="w-full border-2 border-slate-50">
              <li>
                <h2 className="text-lg text-grey-100 uppercase">Category</h2>
              </li>
              {categories.map((mcat, key) => (
                <li
                  className="border-2 py-2 px-2 flex justify-between w-full rounded"
                  key={key}
                >
                  <span className="my-auto uppercase">{mcat.category}</span>
                  <div className="ml-2 text-center font-light flex">
                    <button
                      type="submit"
                      className="bg-blue-100  px-2 py-2 rounded mx-1 text-sm flex  text-blue-800 font-semibold hover:text-white"
                      onClick={() => setCategory(mcat)}
                    >
                      <span className="my-auto">SUBCATS</span>
                      <MdScatterPlot className="my-auto" />
                    </button>

                    <form
                      method="post"
                      className="bg-red-300 px-2 py-2 text-sm rounded"
                      action="/admin/category/delete"
                    >
                      <input
                        value={category.category}
                        type="hidden"
                        name="category"
                      />
                      <button
                        type="submit"
                        className="flex text-red-800 font-semibold hover:text-white"
                      >
                        <span className="my-auto">DELETE</span>
                        <MdDelete className="my-auto" />
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="w-full border-2 border-slate-50">
              <li>
                <h2 className="text-lg text-grey-100 uppercase">
                  {category.category} Subcategories
                </h2>
              </li>
              <li>
                {' '}
                <form
                  method="post"
                  action="/admin/category/addsub"
                  className="border-2 border-slate-50 mb-3 mt-2 px-3 py-3 w-full mx-auto"
                >
                  <input
                    type="hidden"
                    name="category"
                    value={category['category']}
                  />
                  <input
                    className="px-2 py-2 rounded-l-lg w-[75%]"
                    placeholder="New SubCategory"
                    name="subcategory"
                  />{' '}
                  <button
                    className="px-5 py-3 rounded-r-lg bg-blue-100 w-[20%]"
                    type="submit"
                  >
                    ADD
                  </button>
                </form>
              </li>
              {subcategories?.length < 1 && (
                <li className="bg-blue-50 p-3 text-sm" key="1">
                  No Subcategory yet.
                </li>
              )}
              {subcategories?.map((subcategory, key) => (
                <li
                  className="border-2 py-2 px-2 flex justify-between w-full rounded"
                  key={key}
                >
                  <div className="ml-2 text-center font-light flex">
                    <form
                      action="/admin/category/editsub"
                      method="post"
                      className="flex rounded mr-2"
                    >
                      <input
                        name="nsubcat"
                        defaultValue={subcategory.toLowerCase()}
                        type="text"
                        className="mr-2"
                      />

                      <input
                        name="subcat"
                        value={subcategory.toLowerCase()}
                        type="hidden"
                        className="mr-2"
                      />
                      <input
                        name="category"
                        value={category['category'].toLowerCase()}
                        type="hidden"
                      />

                      <button
                        type="submit"
                        className="rounded flex bg-blue-100  px-2 py-2 text-blue-800 font-semibold hover:text-white"
                      >
                        <span className="my-auto">EDIT</span>
                        <MdEdit className="my-auto" />
                      </button>
                    </form>
                    <form
                      action="/admin/category/deletesub"
                      method="post"
                      className="flex bg-red-300 px-2 py-2 text-sm rounded"
                    >
                      <input
                        name="category"
                        value={category['category'].toLowerCase()}
                        type="hidden"
                      />
                      <input
                        name="subcategory"
                        value={subcategory.toLowerCase()}
                        type="hidden"
                      />
                      <button
                        type="submit"
                        className="flex text-red-800 font-semibold hover:text-white"
                      >
                        <span className="my-auto">DELETE</span>
                        <MdDelete className="my-auto" />
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps(context) {
  return await Protect(context, '/api/admin/category/list')
}
export default Settings
