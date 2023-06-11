import React, { Component, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartcontext } from '/components/context/cartcontext'
import { FaCartPlus, FaEye, FaHeart, FaTrash, FaEdit } from 'react-icons/Fa'
import {
  MdShoppingCart,
  MdFileDownload,
  MdRemoveShoppingCart,
} from 'react-icons/Md'
import { FcAdvertising } from 'react-icons/Fc'
import Swal from 'sweetalert2'
import Axios from 'axios'
export let Strtolink = (str) => {
  return str
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s/g, '-')
}
export const baseurl = () => {
  const [location, setLocation] = useState('')
  useEffect(() => {
    setLocation(
      window.location.protocol +
        '://' +
        window.location.hostname +
        process.env.env ==
        'Production'
        ? '3001'
        : '',
    )
  })
  return location
}
export function AdsItemcard({ data }) {
  return (
    <div className="hover:scale-[105%]">
      <Link
        href={'/item/' + Strtolink(data.title) + '/' + data._id}
        title={data.title}
      >
        <div className="relative w-full lg:w-full/2 h-[200px] shadow-lg">
          <Image
            src={'/uploads/items/temp/' + data.photos[0]}
            alt="Slider"
            fill={true}
          />
        </div>
        <p className="legend my-auto">{data.title}</p>
      </Link>
    </div>
  )
}
export function PItemcard({ data }) {
  data.thumbnail =
    '/uploads/items/temp/' + data.photos[0].split('.')[0] + '_thumbnail.jpeg'
  return (
    <div className="bg-light-100 lg:w-full rounded-lg shadow-lg border-2 hover:border-yellow-200 my-2">
      <div className="hotitem relative  lg:w-full rounded-lg">
        <div className="relative lg:w-full h-[200px] rounded-lg">
          <Image src={data.thumbnail} fill={true} alt={data.title} />
        </div>
        <span className="bg-yellow-400 rounded-full absolute right-0 top-0">
          {data.discount > 0
            ? '-' + Number(data.discount).toFixed(1) + '%'
            : ''}
        </span>
        <div className="hotitemdesc absolute w-full h-[200px] top-0 flex flex-col justify-between rounded-lg shadow-lg">
          <div className="mt-1 py-3 text-white bg-black opacity-70">
            <span className="mx-2 uppercase text-sm truncate">
              {data.title}!
            </span>
          </div>
          <div className="mt-4 relative h-">
            <div className="flex w-full justify-between bottom-5 mt-2">
              <div className="my-auto bg-slate-100 hover:bg-slate-200 flex justify-between text-indigo p-2 rounded-full opacity-70 my-1">
                <div className="mx-2 my-auto ">
                  <div className="text-black-900 flex justify-between">
                    <span className="font-semibold">
                      $
                      {Number(
                        (data.price * (100 - data.discount)) / 100,
                      ).toLocaleString(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href={`/item/${Strtolink(data.title)}/${data._id}`}
                className="bg-yellow-400 hover:bg-yellow-600 flex justify-between text-white px-2 rounded-full my-1"
              >
                <span className="mx-2 my-auto">VIEW</span>{' '}
                <FaEye className="my-auto text-white-300 my-auto" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export function NItemcard({ data }) {
  const { cart, setCart } = useCartcontext()
  data.thumbnail =
    '/uploads/items/temp/' + data.photos[0].split('.')[0] + '_thumbnail.jpeg'
  return (
    <div className="hover:scale-[105%] bg-light-100 lg:w-full  relative shadow-lg border-2 hover:border-yellow-200 rounded-lg">
      {' '}
      <div className="bg-white rounded-lg shadow-lg">
        <Link
          href={`/item/${Strtolink(data.title)}/${data._id}`}
          title={data.title}
        >
          <div className="relative rounded-t-lg border-slate-200 border-2 rounded-lg item-card-Image h-[250px]">
            <Image src={data.thumbnail} alt={data.title} fill={true} />
          </div>
        </Link>
        <div className="py-1">
          <div className="flex justify-end">
            <Link
              href={'/categories/' + data.category}
              className="text-xs text-slate-400 hover:text-slate-500 uppercase font-light"
            >
              {data.category}
            </Link>
          </div>
          <Link
            className="text-gray-700  uppercase  text-sm mt-1  py-1 truncate mx-2"
            href={`/item/${Strtolink(data.title)}/${data._id}`}
            title={data.title}
          >
            {data.title}!
          </Link>
          <div className="flex justify-center py-1">
            <span
              className={
                'bg-slate-300 flex justify-between text-black py-2 pl-2 pr-[30px] mr-[-30px] rounded-l-full  text-center font-semibold text-sm'
              }
            >
              $
              {Number(
                (data.price * (100 - data.discount)) / 100,
              ).toLocaleString(2)}
              <del className="mx-1">
                {data.discount > 0 ? data.price.toLocaleString() : ''}
              </del>
            </span>
            <div onClick={() => setCart(data._id)}>
              <button className="text-black flex justify-between bg-yellow-400 hover:bg-yellow-300 p-2 rounded-full">
                {cart.includes(data._id) ? (
                  <>
                    <span className="mx-2">REMOVE </span>{' '}
                    <MdRemoveShoppingCart className="text-white-300 my-auto" />
                  </>
                ) : (
                  <>
                    <span className="mx-2">CART</span>{' '}
                    <FaCartPlus className="text-white-300 my-auto" />{' '}
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-between"></div>
        </div>
      </div>
    </div>
  )
}

export function PurchasedItemcard({ data }) {
  if (data.title) data.ltitle = data.title.replace(/[^a-zA-Z0-9]/g, '_')
  data.thumbnail = data.photos[0]
  return (
    <div className="bg-light-100 lg:w-full pb-3 relative">
      <div className="bg-white rounded-lg shadow-lg">
        <div
          className="relative rounded-t-lg w-full"
          style={{ height: '300px' }}
        >
          {' '}
          <Image
            src={'/uploads/items/temp/' + data.thumbnail}
            alt={data.title}
            fill={true}
          />
        </div>
        <div className="py-6">
          <div className="flex justify-between">
            <Link legacyBehavior href="#">
              <a className="text-black-900 text-lg font-bold ml-2">
                $
                {Number(
                  (data.price * (100 - data.discount)) / 100,
                ).toLocaleString(2)}{' '}
                {data.discount > 0 ? <del>{data.price}</del> : ''}
              </a>
            </Link>{' '}
            <Link
              legacyBehavior
              href="#"
              className="text-sm text-purple-600 hover:text-purple-500 uppercase"
            >
              <a>{data.category}</a>
            </Link>
          </div>
          <p className="text-purple-700 py-1 truncate ml-3">{data.title}</p>
          <div className="flex flex-col justify-center py-1">
            <div className="pl-2 py-2 hover:bg-slate-100  flex justify-between   w-full   border-t-2 border-ash-200 mt-3">
              <span className="my-auto ml-2">
                <FaEye className="text-white-300 text-lg my-auto" />
              </span>
              <Link
                data-bs-toggle="tooltip"
                title=""
                data-bs-original-title="View"
                aria-label="View"
                href={'/item/' + Strtolink(data.title) + '/' + data._id}
                className="my-auto font-bold bg-blue-300 rounded p-[3px] mr-2"
              >
                View
              </Link>
            </div>
            <div className="pl-2 py-2 flex justify-between  hover:bg-slate-100  w-full  border-t-2 border-ash-200">
              <span className="my-auto ml-2">
                <MdFileDownload className="text-green-300 text-lg my-auto" />
              </span>
              <Link
                data-bs-toggle="tooltip"
                title=""
                data-bs-original-title="View"
                aria-label="View"
                href={'/install/' + Strtolink(data.title) + '/' + data._id}
                className="my-auto font-bold bg-blue-300 rounded p-[3px] mr-2"
              >
                INSTALL
              </Link>
            </div>
            <div className="pl-2 py-2 hover:bg-slate-100  w-full  border-y-2 border-ash-200 flex justify-between">
              <FaTrash className="text-red-500 ml-2" />
              <Link
                data-bs-toggle="tooltip"
                title=""
                data-bs-original-title="Delete"
                onClick={(e) => {
                  e.preventDefault()
                  Swal.fire({
                    title: 'Cancel Item',
                    html: 'Are you sure you want to cancel this?',
                    cancelButtonText: 'No',
                    confirmButtonText: 'Yes',
                    showCloseButton: true,
                    showCancelButton: true,
                  }).then((opt) => {
                    if (opt.value) {
                      Axios.post(
                        process.env.REACT_APP_SERVER + '/admin/cancel',
                        { id: data._id },
                      )
                        .then((res) => {
                          console.log(res)
                          fetchitem()
                        })
                        .catch((err) => {
                          console.error({ err })
                        })
                    }
                  })
                }}
                aria-label="Cancel"
                href={'/admin/cancel/' + data._id}
                className="my-auto font-bold bg-red-300 rounded p-[3px] mr-2"
              >
                Cancel
              </Link>
            </div>
            <Link
              className="px-2 py-2 my-2 mx-auto hover:bg-blue-300 bg-blue-200 rounded-lg  border-2 border-ash-200 mt-3"
              data-bs-toggle="tooltip"
              title=""
              data-bs-original-title="View"
              aria-label="View"
              href={'/item/' + Strtolink(data.title) + '/' + data._id}
            >
              VIEW
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ListedItemcard({ data, setList }) {
  return (
    <div className="bg-light-100 lg:w-full pb-3 relative">
      <div className="bg-white rounded-lg shadow-lg">
        <div
          className="relative rounded-t-lg w-full"
          style={{ height: '300px' }}
        >
          <Image
            src={'/uploads/items/temp/' + data.thumbnails[0]}
            alt={data.title}
            fill={true}
          />
        </div>
        <div className="py-6">
          <div className="flex justify-between">
            <Link legacyBehavior href="#">
              <a className="text-black-900 text-lg font-bold ml-2">
                $
                {Number(
                  (data.price * (100 - data.discount)) / 100,
                ).toLocaleString(2)}{' '}
                {data.discount > 0 ? <del>{data.price}</del> : ''}
              </a>
            </Link>
            <Link
              href={'/categories/' + data.category}
              className="text-sm text-purple-600 hover:text-purple-500 uppercase"
            >
              {data.category}
            </Link>
          </div>
          <p className="text-purple-700 py-1 truncate ml-3">{data.title}</p>
          <div className="flex flex-col justify-center py-1">
            <Link
              className="pl-2 py-2 hover:bg-slate-100  flex justify-between   w-full   border-t-2 border-ash-200 mt-3"
              data-bs-toggle="tooltip"
              title=""
              data-bs-original-title="View"
              aria-label="View"
              href={'/item/' + Strtolink(data.title) + '/' + data._id}
            >
              <span className="my-auto ml-2">
                <FaEye className="text-white-300 text-lg my-auto" />
              </span>
              <span className="my-auto font-bold bg-blue-300 rounded-full p-[3px] mr-2">
                {data.views.toLocaleString()}
              </span>
            </Link>
            <Link
              className="pl-2 py-2 flex justify-between  hover:bg-slate-100  w-full  border-t-2 border-ash-200"
              data-bs-toggle="tooltip"
              title=""
              data-bs-original-title="View"
              aria-label="View"
              href={'/item/' + Strtolink(data.title) + '/' + data._id}
            >
              <span className="my-auto ml-2">
                <MdShoppingCart className="text-green-300 text-lg my-auto" />
              </span>
              <span className="my-auto font-bold bg-blue-300 rounded-full p-[3px] mr-2">
                {data.likes}
              </span>
            </Link>
            <Link
              className="pl-2 py-2 hover:bg-slate-100 w-full border-t-2 border-ash-200 flex justify-between"
              data-bs-toggle="tooltip"
              title=""
              data-bs-original-title="Edit"
              aria-label="Edit"
              href={'/dashboard/listed/edit/' + data._id}
            >
              <span className="my-auto ml-2">
                <FaEdit className="text-blue-300 my-auto" />
              </span>
              <span className="my-auto uppercase mr-2 font-bold bg-blue-100 hover:bg-yellow-100 p-1 rounded">
                Edit
              </span>
            </Link>
            <Link
              className="pl-2 py-2 hover:bg-slate-100  w-full  border-y-2 border-ash-200 flex justify-between"
              data-bs-toggle="tooltip"
              title=""
              data-bs-original-title="Promote"
              onClick={(e) => {
                e.preventDefault()
                Axios.post('/api/users/items/promote', {
                  id: data._id,
                  promote: data.promoted,
                })
                  .then(({ data }) => {
                    Swal.fire(
                      'ITEM PROMOTED',
                      data.data.msg,
                      'success',
                    ).then(() => setList(data.data.listed))
                  })
                  .catch((err) => {
                    console.error({ err })
                  })
              }}
              aria-label="Promote"
              href={'/dashboard/listed/' + data._id}
            >
              <FcAdvertising className="text-red-500 ml-2" />
              <span
                className={
                  data.promoted
                    ? 'bg-red-200 hover:bg-red-100 mr-2 uppercase font-bold  p-1 rounded'
                    : 'bg-blue-300 hover:bg-yellow-100 mr-2 uppercase font-bold  p-1 rounded'
                }
              >
                {data.promoted ? 'Pause Promotion' : 'Start Promotion'}
              </span>
            </Link>
            <Link
              className="pl-2 py-2 hover:bg-slate-100  w-full  border-y-2 border-ash-200 flex justify-between"
              data-bs-toggle="tooltip"
              title=""
              data-bs-original-title="Delete"
              onClick={(e) => {
                e.preventDefault()
                Swal.fire({
                  title: 'Delete Item',
                  html: 'Are you sure you want to delete this?',
                  cancelButtonText: 'No',
                  confirmButtonText: 'Yes',
                  showCloseButton: true,
                  showCancelButton: true,
                }).then((opt) => {
                  if (opt.value) {
                    Axios.post('/api/users/items/delete', {
                      id: data._id,
                    })
                      .then(({ data }) => {
                        Swal.fire(
                          'ITEM DELETED',
                          data.data.msg,
                          'success',
                        ).then(() => setList(data.data.listed))
                      })
                      .catch((err) => {
                        console.error({ err })
                      })
                  }
                })
              }}
              aria-label="Delete"
              href={'/admin/trash/' + data._id}
            >
              <FaTrash className="text-red-500 ml-2" />
              <span className="mr-2 uppercase font-bold bg-blue-100 p-1 rounded hover:bg-yellow-100">
                Delete
              </span>
            </Link>
            <Link
              className="px-2 py-2 my-2 mx-auto hover:bg-blue-300 bg-blue-200 rounded-lg  border-2 border-ash-200 mt-3"
              data-bs-toggle="tooltip"
              title=""
              data-bs-original-title="View"
              aria-label="View"
              href={'/item/' + Strtolink(data.title) + '/' + data._id}
            >
              VIEW
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ANItemcard({ data }) {
  if (data.title) data.ltitle = data.title.replace(/[^a-zA-Z0-9]/g, '_')
  data.thumbnail = data.photos[0]
  return (
    <div className="bg-light-100 lg:w-full pb-3 relative">
      {' '}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="w-full lg:w-full/2">
          <div className="relative rounded-t-lg" height="300px">
            {' '}
            <Image
              src={process.env.BACK_SERVER + '/static/' + data.thumbnail}
              alt={data.title}
              fill={true}
            />
          </div>
        </div>
        <div className="py-6">
          <div className="flex justify-between">
            <Link legacyBehavior href="#">
              <a className="text-black-900">
                ${Number((data.price * (100 - data.discount)) / 100).toFixed(2)}{' '}
                <del>{data.price}</del>
              </a>
            </Link>{' '}
            <Link legacyBehavior href="#" className="text-sm">
              <a className="text-purple-600 hover:text-purple-500 uppercase">
                {data.category}
              </a>
            </Link>
          </div>
          <p className="text-purple-700 my-2  py-3 truncate">{data.title}!</p>
          <div className="flex flex-col justify-center py-3">
            <Link
              className="pl-2 py-2  hover:bg-slate-100  flex justify-between   w-full rounded-lg  border-2 border-ash-200 mt-3"
              data-bs-toggle="tooltip"
              title=""
              data-bs-original-title="View"
              aria-label="View"
              href={'/item/' + Strtolink(data.title) + '/' + data._id}
            >
              <span className="my-auto ml-2">
                <FaEye className="text-white-300 text-lg my-auto" />
              </span>
              <span className="my-auto font-bold bg-blue-300 rounded-full p-[3px] mr-2">
                {data.views}
              </span>
            </Link>
            <Link
              className="pl-2 py-2  hover:bg-slate-100  w-full rounded-lg  border-2 border-ash-200 flex justify-between"
              data-bs-toggle="tooltip"
              title=""
              data-bs-original-title="Edit"
              aria-label="Edit"
              href={'/admin/products/edit/' + data._id}
            >
              <span className="my-auto ml-2">
                <FaEdit className="text-blue-300 my-auto" />
              </span>
              <span className="my-auto uppercase mr-2 font-bold">Edit</span>
            </Link>
            <Link
              className="pl-2 py-2  hover:bg-slate-100   w-full rounded-lg  border-2 border-ash-200 flex justify-between"
              data-bs-toggle="tooltip"
              title=""
              data-bs-original-title="Delete"
              onClick={(e) => {
                e.preventDefault()
                Swal.fire({
                  title: 'Delete Item',
                  html: 'Are you sure you want to delete this?',
                  cancelButtonText: 'No',
                  confirmButtonText: 'Yes',
                  showCloseButton: true,
                  showCancelButton: true,
                }).then((opt) => {
                  if (opt.value) {
                    Axios.post(
                      process.env.REACT_APP_SERVER + '/admin/delete',
                      { id: data._id },
                      {
                        headers: {
                          token: sessionStorage.getItem('token'),
                        },
                      },
                    )
                      .then((res) => {
                        console.log(res)
                        fetchitem()
                      })
                      .catch((err) => {
                        console.error({ err })
                      })
                  }
                })
              }}
              aria-label="Delete"
              href={'/admin/trash/' + data._id}
            >
              <FaTrash className="text-red-500 ml-2" />
              <span className="mr-2 uppercase font-bold">Delete</span>
            </Link>
            <Link
              className="pl-2 py-2 flex justify-between  hover:bg-slate-100  w-full rounded-lg  border-2 border-ash-200 mt-3"
              data-bs-toggle="tooltip"
              title=""
              data-bs-original-title="View"
              aria-label="View"
              href={'/item/' + Strtolink(data.title) + '/' + data._id}
            >
              <span className="my-auto ml-2">
                <FaHeart className="text-red-500 text-lg my-auto" />
              </span>
              <span className="my-auto font-bold bg-blue-300 rounded-full p-[3px] mr-2">
                {data.likes}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
