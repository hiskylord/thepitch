import { React, useState, useEffect, useContext } from 'react'
import { useCartcontext } from '/components/context/cartcontext'
import Image from 'next/image'
import Link from 'next/link'
import { FaSearch, FaTimes, FaCaretDown } from 'react-icons/Fa'
import { MdShoppingCart, MdOutlineLogout } from 'react-icons/Md'
import Axios from 'axios'
import sha256 from 'crypto-js/md5'
import { Strtolink } from '/components/Itemcard'
import { useRouter } from 'next/navigation'
const Header = () => {
  const router = useRouter()
  const { cart, setCart } = useCartcontext()
  const [categories, setCategories] = useState([])
  useEffect(() => {
    fetch(
      window.location.protocol +
        '//' +
        window.location.host +
        '/api/sitedata/categories',
    )
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => {
        setCategories(data.data.categories)
      })
      .catch((err) => {
        console.error({ err })
      }, [])
  }, [])
  let [Sidebar, setSidebar] = useState(false)
  let [Catmenu, setCatmenu] = useState(false)
  const [islogged, setLogged] = useState(false)
  let [Search, setSearch] = useState(false)
  function setShow(opt) {
    switch (opt) {
      case 'Sidebar':
        setSidebar(!Sidebar)
        break
      case 'Catmenu':
        setCatmenu(!Catmenu)
        console.log(opt)
        break
      case 'Search':
        setSearch(!Search)
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
          <Link legacyBehavior href="/">
            <a className="hover:bg-yellow-100 border-y-2 border-ash-100 py-2 text-yellow-500 hover:text-black">
              Home
            </a>
          </Link>
          <Link legacyBehavior href="/about_us">
            <a className="hover:bg-yellow-100 border-b-2 border-ash-100 py-2 text-yellow-500 hover:text-black">
              About
            </a>
          </Link>
          <Link legacyBehavior href="/contact">
            <a className="hover:bg-yellow-100 border-b-2 border-ash-100 py-2 text-yellow-500 hover:text-black">
              Contact
            </a>
          </Link>
          <Link legacyBehavior href="/faq">
            <a className="hover:bg-yellow-100 border-b-2 border-ash-100 py-2 text-yellow-500 hover:text-black">
              Faq
            </a>
          </Link>
          <Link legacyBehavior href="/blog">
            <a className="hidden hover:bg-yellow-100 border-b-2 border-ash-100 py-2 text-yellow-500 hover:text-black">
              Blog
            </a>
          </Link>

          <div className="border-b-2 border-ash-100 py-2 text-yellow-500 hover:text-black">
            <a
              href="#"
              id="categories-menu"
              onClick={(e) => setShow('Catmenu')}
              aria-haspopup="true"
              aria-expanded="true"
            >
              <span className="flex items-center">
                Categories <FaCaretDown />
              </span>
            </a>
            <div
              className={
                (Catmenu ? 'visible ' : 'hidden ') +
                'categories-menu  mt-2 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
              }
              role="menu"
              aria-orientation="vertical"
              arialabelledby="catergoies-menu"
              tabIndex="-1"
            >
              {categories.map((cat, k) => (
                <div key={k} className="py-1" role="none">
                  <Link
                    href={'/categories/' + Strtolink(cat.category) + '/1'}
                    className="hover:bg-yellow-100 text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={k == 1 ? '-1' : '1'}
                    id="menu-item-0"
                  >
                    {cat.category}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            {!islogged ? (
              <>
                <Link
                  href="/access/signup"
                  title="signup"
                  className="inline-block  mx-1 text-sm px-4 py-2 leading-none  rounded text-yellow  border-dark text-yellow-500 bg-black mt-4 hover:bg-yellow-500  hover:text-white hover:border-white lg:mt-0"
                >
                  Signup
                </Link>
                <Link
                  href="/access/signin"
                  title="signin"
                  className="inline-block mx-1 text-sm px-4 py-2 leading-none border rounded text-black border-dark hover:border-transparent hover:text-yellow-500 hover:bg-black mt-4 lg:mt-0"
                >
                  signin
                </Link>
              </>
            ) : (
              <>
                <Link legacyBehavior href="/admin/dashboard">
                  <a
                    title="Account Dashboard"
                    className="inline-block mx-1 text-sm px-4 py-2 leading-none border rounded text-black border-dark hover:border-transparent hover:text-yellow-500 hover:bg-black mt-4 lg:mt-0"
                  >
                    Dashboard
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
              </>
            )}
          </div>
        </div>
      </div>
      <nav className="flex items-center justify-between flex-wrap bg-gray-800 py-4 uppercase">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Image
            src="/assets/logo.png"
            alt={process.env.SITENAME}
            width="120"
            height="70"
          />
        </div>

        <div className="flex items-center justify-around lg:hidden w-48">
          <Link legacyBehavior href="/cart">
            <a className="relative mr-6">
              <MdShoppingCart className="text-xl text-yellow-500 hover:text-white justify-items-stretch" />
              <span
                className="absolute text-sm text-yellow-500 hover:text-white"
                style={{ top: '-10px', right: '-10px' }}
              >
                {cart.length}
              </span>
            </a>
          </Link>
          <button onClick={(e) => setShow('Search')}>
            <FaSearch className="text-yellow-500 hover:text-white justify-items-stretch" />
          </button>
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
            <Link legacyBehavior href="/">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-white mr-4">
                Home
              </a>
            </Link>
            <Link legacyBehavior href="/about_us">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-white mr-4">
                About
              </a>
            </Link>
            <Link legacyBehavior href="/contact">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-white mr-4">
                Contact
              </a>
            </Link>
            <Link legacyBehavior href="/faq">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-white mr-4">
                Faq
              </a>
            </Link>
            <Link legacyBehavior href="/blog">
              <a className="hidden mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-white mr-4">
                Blog
              </a>
            </Link>
            <div className="relative inline-block text-left text-center">
              <a
                href="#"
                className="block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-white mr-4"
                id="categories-menu"
                onClick={(e) => setShow('Catmenu')}
                aria-haspopup="true"
                aria-expanded="true"
              >
                <span className="flex items-center">
                  Categories <FaCaretDown />
                </span>
              </a>
              <div
                className={
                  (Catmenu ? 'visible ' : 'hidden ') +
                  'categories-menu absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                }
                role="menu"
                aria-orientation="vertical"
                arialabelledby="catergoies-menu"
                tabIndex="-1"
              >
                {categories.map((cat, k) => (
                  <div key={k} className="py-1" role="none">
                    <Link
                      href={'/categories/' + Strtolink(cat.category) + '/1'}
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-3"
                    >
                      {cat.category}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <form
            method="get"
            onSubmit={(e) => {
              e.preventDefault()
              router.push(`/listings/?query=${e.target.query.value}`)
            }}
            className="flex mr-6"
            action="/listings"
          >
            <input
              name="query"
              className="pl-2 py-2 rounded-l focus:outline-none"
              placeholder="Search"
            />
            <button className="pr-3 py-3 rounded-r bg-white">
              <FaSearch className="text-yellow" />
            </button>
          </form>
          <Link legacyBehavior href="/cart" className="">
            <a className="relative mr-6">
              <MdShoppingCart className="text-xl text-yellow-200 hover:text-white justify-items-stretch" />
              <span
                className="absolute text-sm text-yellow-200 hover:text-white"
                style={{ top: '-10px', right: '-10px' }}
              >
                {cart.length}
              </span>
            </a>
          </Link>
          <div className="flex justify-center">
            {!islogged ? (
              <>
                {' '}
                <Link legacyBehavior href="/access/signup">
                  <a
                    title="signup"
                    className="inline-block  mx-1 text-sm px-4 py-2 leading-none  rounded text-white  border-yellow-200 border-2 text-yellow-500 bg-w mt-4 hover:border-transparent  hover:text-yellow-500 hover:bg-white lg:mt-0"
                  >
                    Signup
                  </a>
                </Link>
                <Link legacyBehavior href="/access/signin">
                  <a
                    title="signin"
                    className="inline-block mx-1 text-sm px-4 py-2 leading-none  rounded text-white border-yellow-200 border-2 hover:border-transparent hover:text-yellow-500 hover:bg-white mt-4 lg:mt-0"
                  >
                    signin
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link legacyBehavior href="/dashboard">
                  <a
                    title="Dashboard"
                    className="inline-block mx-1 text-sm px-4 py-2 leading-none  rounded text-white border-yellow-200 border-2 hover:border-transparent hover:text-yellow-500 hover:bg-white mt-4 lg:mt-0"
                  >
                    Dashboard
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
              </>
            )}
          </div>
        </div>
      </nav>
      <div
        className={
          (Search ? 'visible ' : 'hidden ') +
          'searchform w-full absolute max-h-[100px] bg-slate-200/20 h-fit py-10  z-10  backdrop-blur transition-colors duration-500'
        }
      >
        <form
          method="get"
          className="flex h-fit mx-auto my-auto border-2 border-yellow-400 w-80 hover:w-96 rounded place-self-auto"
          action="/listings"
        >
          <input
            name="query"
            className="pl-2 py-2 rounded-l flex-grow  focus:w-96 focus:outline-none"
            placeholder="Search"
          />
          <button className="pr-auto p-2  py-3 rounded-r bg-white">
            <FaSearch className="text-yellow" />
          </button>
        </form>
      </div>
    </>
  )
}

export default Header
