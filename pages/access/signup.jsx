import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../Header'
import Footer from '../Footer'
import * as FA from 'react-icons'
import countries from '../../components/countries'
import Form from '../../components/Form'
import { FaUser } from 'react-icons/fa'
export default function Signup() {
  function fixdail(e) {
    const country = countries.filter(function (country) {
      return country.name === e.target.value
    })
    document.querySelector('.phonecode').value = country[0]['dialCode']
  }
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
              <div className="bg-indigo-50 py-3 px-3 font-bold text-xl text-center">
                <span>SIGNUP ACCOUNT</span>
              </div>
              <form method="post" action="/users/register">
                <div className="input-group mt-2 p-4">
                  <label className="font-semibold uppercase">Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="pl-2 py-2  w-full rounded-lg  border-2 border-ash-200"
                    required
                  />
                </div>
                <div className="input-group mt-2 p-4">
                  <label className="font-semibold uppercase">
                    Email Address:
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="pl-2 py-2  w-full rounded-lg  border-2 border-ash-200"
                    required
                  />
                </div>
                <div className="input-group mt-2 p-4">
                  <label className="font-semibold uppercase">Country:</label>
                  <select
                    name="country"
                    onChange={fixdail}
                    className="pl-2 py-2  w-full rounded-lg border-2 border-ash-200"
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map((country, key) => (
                      <option key={key}>{country.name}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group mt-2 p-4">
                  <label className="font-semibold uppercase" htmlFor="su-phone">
                    Phone:
                  </label>
                  <div className="phone-toggle">
                    <input
                      className="pl-2 py-2  w-full rounded-lg border-2 border-ash-200 phonecode"
                      type="tel"
                      name="phone"
                      id="su-phone"
                      placeholder="+1900098888"
                      required
                    />
                  </div>
                </div>
                <div className="input-group mt-2 p-4">
                  <label className="font-semibold uppercase">Password:</label>
                  <input
                    type="password"
                    name="password"
                    className="pl-2 py-2  w-full rounded-lg border-2 border-ash-200"
                    placeholder="*******"
                    required
                  />
                </div>
                <div className="input-group mt-2 p-4">
                  <label className="font-semibold uppercase">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    className="pl-2 py-2  w-full rounded-lg border-2 border-ash-200"
                    placeholder="*******"
                    required
                  />
                </div>
                <div className="flex"></div>
                <div className="input-group mt-2">
                  <button
                    type="submit"
                    className="p-3 bg-blue-300 hover:bg-blue-400  rounded-xl w-full text-center mx-auto"
                  >
                    SIGNUP
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
