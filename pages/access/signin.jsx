import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import * as FA from 'react-icons'
import { FaUser } from 'react-icons/fa'
import Form from '../../components/Form'
export default function Signin() {
  function hookform() {
    document.querySelectorAll('form:not(.unlink)').forEach((form) => {
      form.addEventListener('submit', Form)
    })
  }
  useEffect(() => {
    hookform()
  })
  return (
    <>
      <Header />
      <div className="container mx-auto shadow" title="contact">
        <div className="container row card mx-auto account p-4">
          {' '}
          <div className="col-12">
            <div className="w-[96%] lg:w-[48%] mt-6 mx-auto shadow-lg p-3">
              <form method="post" action="/users/login">
                <div className="bg-indigo-50 py-3 px-3 font-bold text-xl text-center">
                  <span>LOGIN ACCOUNT</span>
                </div>{' '}
                <div className="input-group mt-2 p-4">
                  <label className="font-semibold uppercase">
                    Email Address:
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="pl-2 py-2  w-full rounded-lg  border-2 border-ash-200"
                  />
                </div>
                <div className="input-group mt-2 p-4">
                  <label className="font-semibold uppercase">Password:</label>
                  <input
                    type="password"
                    name="pwd"
                    className="pl-2 py-2  w-full rounded-lg border-2 border-ash-200"
                    placeholder="*******"
                  />
                </div>
                <div className="flex"></div>
                <div className="input-group mt-2">
                  <button
                    type="submit"
                    className="p-3 bg-blue-300 hover:bg-blue-400  rounded-xl w-full text-center mx-auto"
                  >
                    SIGNIN
                  </button>
                </div>
              </form>{' '}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
