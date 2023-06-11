import Head from 'next/head'
import Link from 'next/link'
import Header from '../../Header'
import Footer from '../../Footer'
import { unProtect } from '/components/unprotected'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import moment, { now } from 'moment/moment'
import {
  FaStarHalfAlt,
  FaStar,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaCartPlus,
  FaRegEye,
} from 'react-icons/Fa'
import { RxDoubleArrowRight, RxHome } from 'react-icons/Rx'
import Image from 'next/image'
import { useEffect, useState, useMemo } from 'react'
import { Strtolink } from '/components/itemcard'
import Form from '/components/Form'
import { useCartcontext } from '/components/context/cartcontext'
import { comment } from 'postcss'
function Item({ data }) {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  )
  const [location, setLocation] = useState('')
  useEffect(() => {
    setLocation(window.location.href)
  })
  const { cart, setCart } = useCartcontext()
  const item = data[0].item
  const [reviews, setReview] = useState(data[0].reviews)
  const [reviewopt, setReviewOpt] = useState('reviews')
  const [photo, pushphoto] = useState(item?.photos[0])
  const [comment, setComment] = useState('')
  const [star, setStar] = useState(5)
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
      <Head>
        <title>{item.title + ':' + process.env.SITENAME}</title>
        <meta name="keywords" content={item.tags} />
      </Head>
      <Header />
      <div className="bg-slate-200 py-5">
        <h2 className="py-3 lg:py-[14px] mx-10 lg:mx-[30px] font-semibold text-xl">
          {item.title}
        </h2>
      </div>
      <div
        className="w-[96%] lg:w-[95%] rounded-xl mx-auto shadow  mt-[-10px] shadow bg-white lg:py-4"
        title="contact"
      >
        <div className="flex flex-col w-full mx-auto">
          <div className="w-full lg:h-[100px] flex flex-row mx-auto relative">
            {item.photos.map((im, key) => (
              <div
                key={key}
                className={
                  'h-[75px] lg:h-[150px] image-container mt-1 w-[50%] lg:w-[96%] relative'
                }
              >
                <Image
                  src={'/uploads/items/temp/' + im}
                  fill={true}
                  alt={item.title}
                  onClick={() => pushphoto(im)}
                  className="mr-1  opacity-60 hover:opacity-90"
                />
              </div>
            ))}
          </div>{' '}
          <div className="w-full h-[350px] lg:h-[450px]  mt-2 lg:mt-1 relative">
            <Image
              src={'/uploads/items/temp/' + photo}
              fill={true}
              alt={data.title}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="w-full  border-2 border-slate-50 mt-2 shadow rounded-tr-xl rounded-bl-xl py-1 px-2">
            <div className="w-full flex flex-left">
              <Link href="/" className="uppercase my-auto" title={'Home'}>
                <RxHome className="my-auto" />
              </Link>
              <RxDoubleArrowRight className="my-auto mx-2" />{' '}
              <Link
                href={'/categories/' + Strtolink(item.category)}
                className="uppercase"
                title={'Search all Items under ' + item.category + ' category'}
              >
                {item.category}
              </Link>
              <RxDoubleArrowRight className="my-auto mx-2" />{' '}
              <Link
                href={'/item/' + Strtolink(item.title) + '/' + item._id}
                className="uppercase"
                title={item.title}
              >
                {item.title}
              </Link>
            </div>
            <div className="lg:mx-4">
              {' '}
              <div className="font-semibold text-right">
                <span className="uppercase">Cost:</span>$
                {item.discount > 0 ? (
                  <span className="">
                    {item.price * (1 - 0.01 * item.discount)}{' '}
                    <strike className="font-light">{item.price}</strike>
                  </span>
                ) : (
                  <span>{item.price}</span>
                )}
              </div>
              <h3 className="pb-2 pt-5 text-lg font-semibold underline text-left">
                DETAILS:
              </h3>
              <div
                className="ml-2 pb-10 mb-4 mt-2"
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div>
            </div>
            <div className="lg:mx-4">
              {' '}
              <h3 className="pb-2 pt-5 text-lg font-semibold underline text-left">
                USAGE GUIDE:
              </h3>
              <div
                className="ml-2 pb-10 mb-4 mt-2"
                dangerouslySetInnerHTML={{ __html: item.guide }}
              ></div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setCart(item._id)}
                className="mr-3 inline bg-yellow-300 hover:bg-slate-200 font-semibold rounded-lg py-3 text-xs flex px-3 justify-center"
              >
                <span className="mr-1">
                  {cart.includes(item._id) ? 'REMOVE ITEM' : 'ADD TO CART'}
                </span>{' '}
                <FaCartPlus />
              </button>
              {item.preview !== '' && (
                <Link
                  href={'/item' + '/preview/' + item._id}
                  className="bg-yellow-300 hover:bg-slate-200 bg-yellow-300 font-semibold rounded-lg py-3 text-xs flex px-3 justify-center"
                >
                  <span className="mr-1">VIEW DEMO</span> <FaRegEye />
                </Link>
              )}
            </div>

            <div className="w-fit my-auto bg-white right-0">
              <p className="text-sm mb-2">SHARE:</p>{' '}
              <div className="flex">
                {' '}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${location}`}
                  className="py-2 mr-3 px-1 bg-blue-300 rounded-lg text-xs hover:text-white hover:bg-blue-700 flex justify-between"
                >
                  <FaFacebookF /> <span>FACEBOOK</span>
                </a>
                <a
                  href={`whatsapp://send?text=${location}`}
                  className="mr-3 py-2 px-1 bg-green-300 rounded-lg text-xs hover:text-white hover:bg-green-500 flex justify-between"
                >
                  <FaWhatsapp /> <span>WHATSAPP</span>
                </a>
                <a
                  href={`http://twitter.com/share?text=${item.title}&url=${location}&hashtags=3`}
                  className="py-2 px-1 bg-blue-200 rounded-lg text-xs hover:text-white hover:bg-indigo-500 flex justify-center"
                >
                  <FaTwitter /> <span>TWITTER</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <h4 className="font-semibold uppercase">Reviews</h4>
        <div className="flex">
          <label className="border-blue-200 w-[50%] border-2 py-3 px-3 bg-slate-100 font-bold text-center">
            REVIEW
            <input
              type="radio"
              className="hidden"
              onClick={(e) => setReviewOpt(e.target.value)}
              name="reviewopt"
              value="reviews"
            />
          </label>
          <label className="border-blue-200 border-2 w-[50%] px-3 py-3 bg-slate-100 font-bold text-center">
            ADD REVIEW
            <input
              className="hidden"
              type="radio"
              onClick={(e) => setReviewOpt(e.target.value)}
              name="reviewopt"
              value="addreview"
            />
          </label>
        </div>
        <div className={'w-full' + (reviewopt == 'addreview' ? '' : ' hidden')}>
          <form
            method="post"
            className="mx-auto border-blue-300 bg-white border-radius-lg px-5 w-full lg:w-[70%] shadow-lg  py-5 rounded-lg"
            action={`item/${item._id}/addreview`}
            onSubmit={(e) =>
              setReview([
                ...reviews,
                {
                  comment: e.target.comment.value,
                  star: e.target.star.value,
                  name: e.target.name.value,
                  createdAt: Date(now),
                },
              ])
            }
          >
            <h2 className="font-semibold mx-auto text-center text-xl">
              FILL FORM TO ADD COMMENT
            </h2>
            <label className="font-semibold mt-1 uppercase text-sm">
              Name:
            </label>
            <input
              name="name"
              placeholder="Preferred Name"
              className="mb-2 w-full p-2 border-2 border-slate-150 rounded"
              maxLength="70"
              required
            />
            <div className="mt-5 mb-3">
              <label className="font-semibold mt-1 uppercase text-sm">
                Stars:
              </label>
              <div className="flex">
                {[...Array(Math.floor(5)).keys()].map((i, k) => (
                  <FaStar
                    className={
                      'text-yellow-500 text-2xl' +
                      (i == star ? ' active-star' : '')
                    }
                    onClick={() => setStar(i)}
                    key={k}
                  />
                ))}
              </div>
              <input type="hidden" name="star" value={star} />
            </div>
            <div className="mt-5 mb-10">
              <label className="font-semibold mt-1 uppercase text-sm">
                Comment:
              </label>
              <ReactQuill
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                      { list: 'ordered' },
                      { list: 'bullet' },
                      { indent: '-1' },
                      { indent: '+1' },
                    ],
                    ['clean'],
                  ],
                }}
                formats={[
                  'bold',
                  'italic',
                  'underline',
                  'strike',
                  'blockquote',
                  'indent',
                ]}
                style={{
                  height: comment.split('').length < '1000' ? '150px' : 'auto',
                }}
                theme="snow"
                value={comment}
                onChange={setComment}
              />
              <input type="hidden" name="comment" value={comment} />
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="bg-blue-200 p-2 lg:w-[50%] w-full mx-auto"
              >
                POST COMMENT
              </button>
            </div>
          </form>
        </div>
        <div className={'w-full' + (reviewopt == 'reviews' ? '' : ' hidden')}>
          <ul className="list-none">
            {reviews.length < 1 ? (
              <p className="italic font-light mt-5 ml-3">
                No Reviews for this Item Yet
              </p>
            ) : (
              ''
            )}
            {reviews.map((comment, key) => (
              <li
                key={key}
                className="pl-2 pt-2 bg-white border-t-2 border-gray-100"
              >
                <div className="w-full flex justify-between">
                  <span
                    dangerouslySetInnerHTML={{ __html: comment.comment }}
                  ></span>
                  <span className="flex">
                    {[...Array(Math.floor(comment.star)).keys()].map((i, k) => (
                      <FaStar className="text-yellow-500" key={k} />
                    ))}
                    {comment.star - Math.floor(comment.star) > 0 ? (
                      <FaStarHalfAlt className="text-yellow-500" />
                    ) : (
                      ''
                    )}
                  </span>{' '}
                </div>

                <div className="flex justify-between bg-slate-50 bottom-0 opacity-50 italic">
                  <span className="text-xs">{comment.name}</span>{' '}
                  <span className="text-xs text-blue-300">
                    {moment(comment.createdAt).fromNow(true) + ' ago'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  )
}
export async function getServerSideProps(context) {
  const { id } = context.query
  return await unProtect(context, [`/api/item/${id}/get`])
}
export default Item
