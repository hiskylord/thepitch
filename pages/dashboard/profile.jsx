import { useEffect, useReducer, useRef, useState } from 'react'
import Header from './Head'
import Footer from '../Footer'
import { Protect } from '/components/protected'
import Form from '/components/Form'
import axios from 'axios'
import Swal from 'sweetalert2'
function Profile({ data }) {
  function hookform() {
    document.querySelectorAll('form:not(.unlink)').forEach((form) => {
      form.addEventListener('submit', Form)
    })
  }
  useEffect(() => {
    hookform()
    data.createdAt =
      new Date(data.createdAt).toLocaleDateString() +
      ' ' +
      new Date(data.createdAt).toLocaleTimeString()
    data.loggedAt =
      new Date(data.loggedAt).toLocaleDateString() +
      ' ' +
      new Date(data.loggedAt).toLocaleTimeString()
  })
  const [propic, setPropic] = useState(data.photo)
  const UploadProfile = async (file) => {
    if (!file) return
    try {
      const formData = new FormData()
      formData.append('profilepic', file)
      const res = await axios.patch('/api/users/profileupload', formData)
      Swal.fire('Profile Update', res.data.msg, 'success').then(() => {
        if (res.data.photo) setPropic(res.data.photo)
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
      <Header />
      <div className="w-full mx-auto py-5 px-2 rounded-lg">
        <div className="shadow w-full shadow-lg mx-auto  py-5 bg-green-50">
          <div className="mx-auto lg:w-[60%] w-full py-5 px-5 rounded-lg bg-white">
            <h2 className="font-semibold w-full font-semibold text-lg">
              PERSONAL DATA
            </h2>
            <form
              method="post"
              className="mb-2"
              acceptCharset="UTF-8"
              encType="multipart/form-data"
            >
              <label htmlFor="profilepic">
                <img
                  src={propic ? '/uploads/' + propic : '/assets/avatar.png'}
                  className="rounded-full w-[100px] h-[100px]"
                  alt="Profile Photo"
                />
              </label>
              <input
                type="file"
                id="profilepic"
                name="profilepic"
                className="invisible"
                onChange={({ target }) => {
                  if (target.files) {
                    UploadProfile(target.files[0])
                  }
                }}
              />
            </form>
            <div className="flex w-full mx-auto border-2 my-1 border-slate-50">
              <div className="w-[50%] bg-slate-50 py-2 px-1 rounded-l uppercase text-sm">
                Name:
              </div>
              <div className="w-[50%] bg-slate-50 py-2 px-1 rounded-r text-left text-sm">
                {data.name.toUpperCase()}
              </div>
            </div>
            <div className="flex w-full mx-auto border-2 my-1  border-slate-50">
              <div className="w-[50%] bg-slate-50 py-2 px-1 rounded-l uppercase text-sm">
                Email:
              </div>
              <div className="w-[50%] bg-slate-50 py-2 px-1 rounded-r text-left text-sm">
                {data.email}
              </div>
            </div>
            <div className="flex w-full mx-auto border-2 my-1 border-slate-50">
              <div className="w-[50%] bg-slate-50 py-2 px-1 rounded-l uppercase text-sm">
                Country:
              </div>
              <div className="w-[50%] bg-slate-50 py-2 px-1 rounded-r text-left text-sm">
                {data.country.toUpperCase()}
              </div>
            </div>

            <div className="flex w-full mx-auto border-2 my-1 border-slate-50">
              <div className="w-[50%] bg-slate-50 py-2 px-1 rounded-l uppercase text-sm">
                Phone:
              </div>
              <div className="w-[50%] bg-slate-50 py-2 px-1 rounded-r text-left text-sm">
                {data.phone}
              </div>
            </div>

            <div className="flex w-full mx-auto border-2 my-1 border-slate-50">
              <div className="w-[50%] bg-slate-50 py-2 px-1 rounded-l uppercase text-sm">
                Account Created:
              </div>
              <div className="w-[50%] bg-slate-50 py-2 px-1 rounded-r text-left text-sm">
                {data.createdAt}
              </div>
            </div>
            <div className="flex w-full mx-auto border-2 my-1 border-slate-50">
              <div className="w-[50%] bg-slate-50 py-2 px-1 rounded-l uppercase text-sm">
                Last Access:
              </div>
              <div className="w-[50%] bg-slate-50 py-2 px-1 rounded-r text-left text-sm">
                {data.loggedAt}
              </div>
            </div>
            <div className="flex w-full mx-auto border-2 my-1 border-slate-50">
              <div className="w-[50%] bg-slate-50 py-2 px-1 rounded-l uppercase text-sm">
                Account Status:
              </div>
              <div className="w-[50%] bg-slate-50 py-2 px-1 rounded-r text-left text-sm">
                {data.status.toUpperCase()}
              </div>
            </div>
          </div>

          <div className="mx-auto lg:w-[60%] w-full py-5 px-5 rounded-lg bg-white">
            <h2 className="font-semibold w-full font-semibold mt-3 text-lg uppercase text-sm">
              PASSWORD UPDATE
            </h2>

            <form method="post" action="users/profile">
              <div className="flex w-full mx-auto border-2 my-1 border-slate-50 my-2">
                <input
                  className="w-[50%] bg-slate-50 py-2 px-1 rounded-l"
                  placeholder="New Password"
                  name="password"
                  type="password"
                />
                <input
                  className="w-[50%] bg-slate-50 py-2 px-1 rounded-r text-left text-sm"
                  placeholder="Confirm New Password"
                  name="cpassword"
                  type="password"
                />
              </div>
              <div className="w-full flex justify-center">
                <button
                  className="lg:w-[50%] w-full px-1 py-2 mx-auto bg-blue-200 rounded-lg"
                  type="submit"
                >
                  CHANGE PASSWORD
                </button>
              </div>
            </form>
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
export default Profile
