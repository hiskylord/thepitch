import { React, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaSearch, FaTimes, FaCaretDown } from 'react-icons/fa'
import { MdShoppingCart, MdOutlineLogout } from 'react-icons/md'

const Header = () => {
  let [Sidebar, setSidebar] = useState(false)
  let [categories, setCategories] = useState([])
  let [Catmenu, setCatmenu] = useState(false)
  const [islogged, setLogged] = useState(false)
  const [cartitms, setCartitms] = useState([])
  function logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('User')
    sessionStorage.removeItem('/admin')
    window.location = '/'
  }
  function logged() {
    return (
      sessionStorage.getItem('token') &&
      sessionStorage.getItem('token').length > 0
    )
  }
  useEffect(() => {
    setLogged(logged())
  })
  console.log(islogged)
  function setShow(opt) {
    switch (opt) {
      case 'Sidebar':
        setSidebar(!Sidebar)
        break
      default:
        break
    }
  }

  return (
    <>
      <div
        className={
          (Sidebar ? 'visible ' : 'hidden ') +
          'right-0 absolute z-50 bg-white w-64 h-full drop-shadow-md'
        }
      >
        <div className="flex flex-row items-center  justify-between border-b-ash-400 w-full">
          <Image
            src="/assets/logo.png"
            alt={process.env.SITENAME}
            width="120"
            height="70"
          />
          <a href="#" onClick={(e) => setShow('Sidebar')} className="mx-1">
            <FaTimes className="text-red-500 block mr-2 hover:text-red-200" />
          </a>
        </div>
        <div className="flex uppercase  mt-10 flex-col justify-items-center px-4 drop-shadow-md">
          <Link legacyBehavior href="/admin/dashboard">
            <a className="hover:bg-yellow-100 border-y-2 border-ash-100 py-2 text-yellow-500 hover:text-black">
              Dashboard
            </a>
          </Link>
          <Link legacyBehavior href="/admin/investors">
            <a className="hover:bg-yellow-100 border-y-2 border-ash-100 py-2 text-yellow-500 hover:text-black">
              Investors
            </a>
          </Link>
          <Link legacyBehavior href="/admin/additem">
            <a className="hover:bg-yellow-100 border-b-2 border-ash-100 py-2 text-yellow-500 hover:text-black">
              Add Item
            </a>
          </Link>
          <Link legacyBehavior href="/admin/items">
            <a className="hover:bg-yellow-100 border-b-2 border-ash-100 py-2 text-yellow-500 hover:text-black">
              All Items
            </a>
          </Link>
          <Link legacyBehavior href="/admin/orders">
            <a className="hover:bg-yellow-100 border-b-2 border-ash-100 py-2 text-yellow-500 hover:text-black">
              Orders
            </a>
          </Link>
          <Link legacyBehavior href="/admin/support">
            <a className="hover:bg-yellow-100 border-b-2 border-ash-100 py-2 text-yellow-500 hover:text-black">
              Support
            </a>
          </Link>
          <Link legacyBehavior href="/admin/settings">
            <a className="hover:bg-yellow-100 border-b-2 border-ash-100 py-2 text-yellow-500 hover:text-black">
              Settings
            </a>
          </Link>
          <div className="flex justify-center">
            <Link legacyBehavior href="/admin/dashboard">
              <a
                title="Home"
                className="inline-block mx-1 text-sm px-4 py-2 leading-none border rounded text-black border-dark hover:border-transparent hover:text-yellow-500 hover:bg-black mt-4 lg:mt-0"
              >
                Home
              </a>
            </Link>
            <Link legacyBehavior href="/admin/dashboard">
              <a
                title="Logout"
                className="flex mx-1 text-sm px-4 py-2 leading-none border rounded text-black border-dark hover:border-transparent hover:text-red-500 hover:bg-black mt-4 lg:mt-0"
              >
                <span className="mr-1">
                  <MdOutlineLogout />
                </span>
                <span>Logout</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <nav className="flex items-center justify-between flex-wrap bg-black py-4 uppercase">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Image
            src="/assets/logo.png"
            alt={process.env.SITENAME}
            width="120"
            height="70"
          />
        </div>

        <div className="flex items-center justify-around lg:hidden w-48">
          <button
            onClick={(e) => setShow('Sidebar')}
            className="flex items-center px-3 py-2 border rounded  hover:text-white text-yellow-500 border-yellow-400 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex relative w-full bg-ash-700 flex-grow bg-transparent items-center w-auto">
          <div className="text-sm flex-grow flex flex-row text-left">
            <Link legacyBehavior href="/admin/dashboard">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-white mr-4">
                Dashboard
              </a>
            </Link>
            <Link legacyBehavior href="/admin/investors">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-white mr-4">
                Investors
              </a>
            </Link>
            <Link legacyBehavior href="/admin/additem">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-white mr-4">
                Add Item
              </a>
            </Link>
            <Link legacyBehavior href="/admin/items">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-white mr-4">
                All Items
              </a>
            </Link>
            <Link legacyBehavior href="/admin/orders">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-white mr-4">
                Orders
              </a>
            </Link>
            <Link legacyBehavior href="/admin/support">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-white mr-4">
                Support
              </a>
            </Link>
            <Link legacyBehavior href="/admin/settings">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-white mr-4">
                Settings
              </a>
            </Link>
            <Link legacyBehavior href="/admin/mailer">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-white mr-4">
                Mailer
              </a>
            </Link>
          </div>
          <div className="flex justify-center">
            <Link legacyBehavior href="/admin/dashboard">
              <a
                title="Home"
                className="inline-block mx-1 text-sm px-4 py-2 leading-none  rounded text-white border-yellow-200 border-2 hover:border-transparent hover:text-yellow-500 hover:bg-white mt-4 lg:mt-0"
              >
                Home
              </a>
            </Link>
            <Link legacyBehavior href="/">
              <a
                onClick={() => {
                  logout()
                }}
                title="signup"
                className="flex  mx-1 text-sm px-4 py-2 leading-none  rounded text-white  border-yellow-200 border-2 text-red-500 bg-w mt-4 hover:border-transparent  hover:text-red-500 hover:bg-white lg:mt-0"
              >
                <span className="mr-1">
                  <MdOutlineLogout />
                </span>
                <span>LOGOUT</span>
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
