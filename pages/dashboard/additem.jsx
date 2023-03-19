import { useEffect, useRef, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Header from './Head'
import Footer from '../Footer'
import 'react-quill/dist/quill.snow.css'
import Form from '../../components/Form'
import { FaAngleDoubleRight, FaTimesCircle } from 'react-icons/fa'
import Link from 'next/link'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { Protect } from '/components/protected'
import {
  MdAccountBalanceWallet,
  MdShoppingCart,
  MdRemoveRedEye,
  MdViewList,
} from 'react-icons/md'
function Additem({ data }) {
  function hookform() {
    document.querySelectorAll('form:not(.unlink)').forEach((form) => {
      form.addEventListener('submit', Form)
    })
  }

  useEffect(() => {
    hookform()
    document
      .querySelector('#sellimages')
      .addEventListener('change', function (e) {
        if (e.target.files.length > 3) {
          document.querySelector('#sellpostbtn').disabled = true
          Swal.fire('POST ITEM', 'Images must be a maximum of 3', 'warning')
        } else {
          document.querySelector('#sellpostbtn').disabled = false
        }
      })
  })
  const [guide, setGuide] = useState('')
  const [description, setDesciption] = useState('')
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  )
  const { categories } = data
  const [category, setCategory] = useState('')
  const subcategories = categories.filter((cat) => cat.category == category)
  const [images, setImages] = useState([])
  const [uploading, setUploadStatus] = useState(true)
  const [progress, setProgress] = useState(0)
  const [inputImages, setInputImages] = useState([])
  const [thumbnails, setThumbnail] = useState([])
  const UploadImage = async (file) => {
    const progressInt = setInterval(() => {
      setProgress(progress < 90 ? progress + 1 : progress)
    }, 1000)
    if (!file) return
    try {
      const formData = new FormData()
      formData.append('image', file)
      const { data } = await Axios.post('/api/item/imageupload', formData)
      if ((data.msg = 'UPLOAD COMPLETE')) {
        setInputImages([...inputImages, data.img])
        setThumbnail([...thumbnails, data.thumbnail])
        setProgress(100)
        clearInterval(progressInt)
      }
    } catch (e) {
      console.log(e.message)
    }
  }
  const router = useRouter()
  console.log(thumbnails)
  return (
    <>
      <Header />
      <div className="shadow w-full mx-auto">
        <div className="rounded-lgw-full  mx-auto  py-5 bg-blue-200">
          <h2 className="ml-5 font-semibold w-full">SELL ASSETS</h2>
        </div>
        <div className="bg-blue-50 px-2 py-5">
          <form
            method="post"
            className="mx-auto border-blue-300 bg-white border-radius-lg px-5 w-full lg:w-[70%] shadow-lg  py-5 rounded-lg"
            action="/users/items/add"
            encType="multipart/form-data"
          >
            <h2 className="font-semibold mx-auto text-center text-xl">
              FILL FORM TO ADD ITEM
            </h2>
            <label className="font-semibold mt-1 uppercase text-sm">
              Title:
            </label>
            <input
              name="title"
              placeholder="Website Title"
              className="mb-2 w-full p-2 border-2 border-slate-150 rounded"
              maxLength="70"
              required
            />
            <label className="font-semibold mt-1 uppercase text-sm">
              Amount($):
            </label>
            <input
              name="price"
              placeholder="Price in USD"
              className="mb-2 w-full p-2 border-2 border-slate-150 rounded"
              type="number"
              required
            />
            <div className="flex justify-between">
              <div className="px-1">
                {' '}
                <label className="font-semibold mt-1 uppercase text-sm">
                  Category:
                </label>
                <select
                  name="category"
                  className="mb-2 w-full p-2 border-2 border-slate-150 rounded bg-white"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">SELECT CATEGORY</option>
                  {categories.map((cat, key) => (
                    <option value={cat.category} key={key}>
                      {cat.category.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="px-1">
                {' '}
                <label className="font-semibold mt-1 uppercase text-sm">
                  SubCategory:
                </label>
                <select
                  name="subcategory"
                  className="mb-2 w-full p-2 border-2 border-slate-150 rounded bg-white"
                  required
                >
                  <option>SELECT SUBCATEGORY</option>
                  {subcategories[0]?.subcategories.map((subcategory, key) => (
                    <option value={subcategory} key={key}>
                      {subcategory.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <div className="mt-3 mb-10">
              <label className="font-semibold mt-1 uppercase text-sm">
                Description(
                <small>
                  ADD TECHNOLOGIES AND DEPENDENCIES WHERE APPLICABLE
                </small>
                ):
              </label>
              <ReactQuill
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                      { list: 'ordered' },
                      { list: 'bullet' },
                      { indent: '-1' },
                      { indent: '+1' },
                    ],
                    ['image', 'video'],
                    ['clean'],
                  ],
                }}
                formats={[
                  'header',
                  'bold',
                  'italic',
                  'underline',
                  'strike',
                  'blockquote',
                  'list',
                  'bullet',
                  'indent',
                  'image',
                  'video',
                ]}
                style={{
                  height:
                    description.split('').length < '1000' ? '150px' : 'auto',
                }}
                theme="snow"
                value={description}
                onChange={setDesciption}
              />
              <input type="hidden" name="content" value={description} />
            </div>
            <br />
            <div className="mt-10 mb-10">
              <label className="font-semibold mt-1 uppercase text-sm">
                SETUP Guide(<small>Add youtube guide where neccessary</small>):
              </label>
              <ReactQuill
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                      { list: 'ordered' },
                      { list: 'bullet' },
                      { indent: '-1' },
                      { indent: '+1' },
                    ],
                    ['image', 'video'],
                    ['clean'],
                  ],
                }}
                formats={[
                  'header',
                  'bold',
                  'italic',
                  'underline',
                  'strike',
                  'blockquote',
                  'list',
                  'bullet',
                  'indent',
                  'image',
                  'video',
                ]}
                style={{
                  height: guide.split('').length < '1000' ? '150px' : 'auto',
                }}
                theme="snow"
                value={guide}
                onChange={setGuide}
              />
              <input type="hidden" name="guide" value={guide} />
            </div>
            <br />
            <label className="font-semibold mt-1 uppercase text-sm">
              Live Preview:
            </label>
            <input
              name="preview"
              placeholder="https://demo.example.com/app"
              className="mb-2 w-full p-2 border-2 border-slate-150 rounded"
              type="url"
            />
            <div className="mt-5 mb-3">
              <label className="font-semibold mt-1 uppercase text-sm">
                Multiple Sale?:
              </label>
              <select
                name="license"
                className="mb-2 w-full p-2 border-2 border-slate-150 rounded bg-white"
                required
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            {progress > 0 && (
              <>
                {' '}
                <div className="mb-1 text-lg font-medium dark:text-white">
                  {progress < 100 ? 'Uploading..' : 'Upload Complete'}
                </div>
                <div className="w-full h-4 mb-4 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="h-4 bg-blue-600 rounded-full dark:bg-blue-500"
                    style={{ width: progress + '%' }}
                  ></div>
                </div>
              </>
            )}
            <div className="py-3 px-3 w-full flex">
              <input type="hidden" name="photos[]" value={inputImages} />
              <input type="hidden" name="thumbnails[]" value={thumbnails} />
              {images.map((img, key) => (
                <img src={img.url} className="w-[50px] h-[75px]" key={key} />
              ))}
            </div>
            <div className="py-3 px-3 w-full justify-center">
              <label className="mx-auto w-64 flex flex-col items-center px-4 py-6 bg-blue-50 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-400 hover:text-white">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  Add a photo
                </span>
                <input
                  onChange={({ target }) => {
                    setProgress(0)
                    if (target.files) {
                      images.length > 0
                        ? setImages([
                            ...images,
                            {
                              file: target.files[0],
                              url: URL.createObjectURL(target.files[0]),
                            },
                          ])
                        : setImages([
                            {
                              file: target.files[0],
                              url: URL.createObjectURL(target.files[0]),
                            },
                          ])
                      UploadImage(target.files[0])
                    }
                  }}
                  id="sellimages"
                  type="file"
                  className="hidden"
                  accept="image/gif, image/jpeg, image/png,image/jpg"
                  required
                />
              </label>
            </div>
            <label className="font-semibold mt-1 uppercase text-sm">
              Keywords(<small>Separated by commas</small>):
            </label>
            <input
              name="keywords"
              placeholder="e-commerce,shopping,cart,website"
              className="mb-2 w-full p-2 border-2 border-slate-150 rounded"
              type="text"
              required
            />
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="bg-blue-200 p-2 lg:w-[50%] w-full mx-auto"
                id="sellpostbtn"
              >
                POST ITEM
              </button>
            </div>{' '}
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
export async function getServerSideProps(context) {
  return await Protect(context, '/api/sitedata/categories')
}
export default Additem
