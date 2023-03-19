import { useEffect, useRef, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Header from '../../Head'
import Footer from '../../../Footer'
import 'react-quill/dist/quill.snow.css'
import Form from '/components/Form'
import { FaAngleDoubleLeft } from 'react-icons/Fa'
import Link from 'next/link'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { unProtect } from '/components/unprotected'
import { Strtolink } from '/components/Itemcard'
function Additem({ data }) {
  const router = useRouter()
  function hookform() {
    document.querySelectorAll('form:not(.unlink)').forEach((form) => {
      form.addEventListener('submit', Form)
    })
  }
  useEffect(() => {
    hookform()
  })
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  )
  const { categories } = data[0]
  const { item, reviews } = data[1]
  const [category, setCategory] = useState(item.category)
  const subcategories = categories.filter((cat) => cat.category == category)
  const [guide, setGuide] = useState(item.guide)
  const [description, setDesciption] = useState(item.content)
  return (
    <>
      <Header />
      <div className="shadow w-full mx-auto">
        <div className="rounded-lgw-full  mx-auto  py-5 bg-blue-200 flex justify-between">
          <h2 className="ml-5 font-semibold w-full">EDIT ASSETS</h2>
          <Link href={`/dashboard/listed`} className="flex">
            <FaAngleDoubleLeft className="my-auto" />{' '}
            <span className="font-semibold">BACK</span>
          </Link>
        </div>
        <div className="bg-blue-50 px-2 py-5">
          <form
            method="post"
            className="mx-auto border-blue-300 bg-white border-radius-lg px-5 w-full lg:w-[70%] shadow-lg  py-5 rounded-lg"
            action={`/users/items/edit`}
            encType="multipart/form-data"
          >
            <h2 className="font-semibold mx-auto text-center text-xl">
              FILL TO EDIT ITEM
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
              defaultValue={item.title}
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
              defaultValue={item.price}
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
                    <option
                      value={cat.category}
                      key={key}
                      selected={item.category == cat.category}
                    >
                      {cat.category.toUpperCase()}
                    </option>
                  ))}
                </select>
                <input type="hidden" name="id" value={router.query.id} />
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
                    <option
                      value={subcategory}
                      key={key}
                      selected={item.subcategory === subcategory}
                    >
                      {subcategory.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <label className="font-semibold mt-1 uppercase text-sm">
              Discount(%):
            </label>
            <input
              name="discount"
              placeholder="Percentage Discount"
              className="mb-2 w-full p-2 border-2 border-slate-150 rounded"
              type="number"
              min={0}
              max={90}
              required
              defaultValue={item.discount}
            />
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
              defaultValue={item.preview}
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
                <option selected={item.license == 'No'}>No</option>
                <option selected={item.license == 'Yes'}>Yes</option>
              </select>
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
              defaultValue={item.tags}
            />
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="bg-blue-200 p-2 lg:w-[50%] w-full mx-auto"
                id="sellpostbtn"
              >
                UPDATE ITEM
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
  const { id } = context.query
  return await unProtect(context, [
    '/api/sitedata/categories',
    `/api/item/${id}/get`,
  ])
}
export default Additem
