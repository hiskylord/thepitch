
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from './Header'
import Footer from '../Footer'
import { FaAngleDoubleRight,FaTimesCircle } from 'react-icons/fa'
import Axios  from 'axios';
import { useState, useEffect } from 'react'
import {MyBarChart,MyLineChart,MyPieChart} from '/components/Charts'
import {MdAccountBalanceWallet,MdShoppingCart,MdRemoveRedEye,MdViewList} from 'react-icons/md'
function Dashboard({items}){
// const [orders,setOrder]=useState([{}])
//   const [ordstats,setOrdstats]=useState([]);
//   const [visitstats,setVisitstats]=useState([]);
//   const [todaystats,setTodaystats]=useState([]);
  
//   const fetchorders=()=>{
//     Axios.get(process.env.BACK_SERVER+'/admin/orders', {
//       headers: {
//         'token':sessionStorage.getItem('token')
//       }
//   }).then(res => {
//      setOrder(res.data.orders);
//       }).catch(err => {
//           console.error({err})})
//   }
//   const fetchtodaystats=()=>{
//     Axios.get(process.env.REACT_APP_SERVER+'/admin/stats/tvisits', {
//       headers: {
//         'token':sessionStorage.getItem('token')
//       }
//   }).then(res => {
//     setTodaystats(res.data.visits);
//       }).catch(err => {
//           console.error({err})})
//   }
//   const fetchvisitstats=()=>{
//     Axios.get(process.env.REACT_APP_SERVER+'/admin/stats/visits', {
//       headers: {
//         'token':sessionStorage.getItem('token')
//       }
//   }).then(res => {
//     setVisitstats(res.data.visits);
//       }).catch(err => {
//           console.error({err})})
//   }
//   const fetchordstats=()=>{
//     Axios.get(process.env.REACT_APP_SERVER+'/admin/stats/orders', {
//       headers: {
//         'token':sessionStorage.getItem('token')
//       }
//   }).then(res => {
//     setOrdstats(res.data.ord);
//       }).catch(err => {
//           console.error({err})})
//   }
//   useEffect(()=>{fetchorders();fetchvisitstats();fetchordstats();fetchtodaystats()},[])
//   const [earned,setEarned]=useState(0);
//   const [pending,setPending]=useState(0);
//   const peningordersArry=[];let sumpendingorders=0;
//   let pdorders=orders.filter(order=>{return (order.status=='PENDING')});
// pdorders.forEach(order => {
//   order.cart.map((ord,index)=>{
//     let peningorders=items.filter(item=>{return (item.id==ord.id)});
//    if( peningorders.length>0){
//     sumpendingorders+=(parseInt(ord.qty)*parseInt(peningorders[0]['price']));
//     peningordersArry.push(peningorders[0]);}
//   })
// });
// const completeordersArry=[];let sumcompleteorders=0;
// let corders=orders.filter(order=>{return (order.status=='COMPLETE')});
// corders.forEach(order => {
// order.cart.map((ord,index)=>{
// let completeorders=items.filter(item=>{return (parseInt(item.id)==parseInt(ord.id))});
// if(completeorders.length>0){
//   sumcompleteorders+=(parseInt(ord.qty)*parseInt(completeorders[0]['price']));
//   completeordersArry.push(completeorders[0]);}
//   })
// });
// const processingeordersArry=[];let sumprocessingeorders=0;
// let porders=orders.filter(order=>{return order.status=='PROCESSING'});
// porders.forEach(order => {
//   order.cart.map((ord,index)=>{
// let processingeorders=items.filter(item=>{return (parseInt(item.id)==parseInt(ord.id))});;
// if(processingeorders.length>0){
//   sumprocessingeorders+=(parseInt(ord.qty)*parseInt(processingeorders[0]['price']));
//   processingeordersArry.push(processingeorders[0]);}
//   })
// });
return ( 
            <><Header/>
    <div className='w-full mx-auto'>
        
          <div className='bg-blue-200 pb-[50px]'><div className='container  py-12 mx-auto px-4 md:px-12 top-menu'>
          <div className='grid grid-cols-1 lg:grid-cols-4  grid-flow-rows gap-4 w-full'>
            {/* BALANCE */}
              <div className='card bg-blue-100 rounded-lg shadow-lg pt-3'>
              <div className='card-body  border-t-blue px-3 py-3 flex justify-between'><div><p className='text-[#999] uppercase text-sm'>Total Balance</p><div className='card-title'>18383</div></div><span className='card-img my-auto bg-white p-2 rounded-full'><MdAccountBalanceWallet/></span></div>
              <div className='card-footer bg-blue-50 py-2 px-2  flex justify-between rounded'><span >1% </span><span className='text-sm'> Last 7 days</span></div>
            </div>
            {/* BALANCE */}
            {/* PURCHASE */}
            <div className='card bg-blue-100 rounded-lg shadow-lg pt-3'>
              <div className='card-body  border-t-blue px-3 py-3 flex justify-between'><div><p className='text-[#999] uppercase text-sm'>Total Purchase</p><div className='card-title'>18383</div></div><span className='card-img my-auto bg-cyan-200 p-2 rounded-full'><MdShoppingCart/></span></div>
              <div className='card-footer bg-blue-50 py-2 px-2 flex justify-between rounded'><span>1% </span><span className='text-sm'> Last 7 days</span></div>
            </div>
            {/* PURCHASE */}
            {/* SELLS */}
            <div className='card bg-blue-100 rounded-lg shadow-lg pt-3'>
              <div className='card-body  border-t-blue px-3 py-3 flex justify-between'><div><p className='text-[#999] uppercase text-sm'>Total Sales</p><div className='card-title'>18383</div></div><span className='card-img my-auto bg-green-100 p-2 rounded-full'><MdShoppingCart/></span></div>
              <div className='card-footer bg-blue-50 py-2 px-2 flex justify-between rounded'><span>1% </span><span className='text-sm'> Last 7 days</span></div>
            </div>
            {/* SELLS */}
            {/* ITEM HITS */}
            <div className='card bg-blue-100 rounded-lg shadow-lg pt-3'>
              <div className='card-body  border-t-blue px-3 py-3 flex justify-between'><div><p className='text-[#999] uppercase text-sm'>Items Views</p><div className='card-title'>18383</div></div><span className='card-img my-auto bg-white p-2 rounded-full'><MdRemoveRedEye/></span></div>
              <div className='card-footer bg-blue-50 py-2 px-2 flex justify-between rounded'><span>1% </span><span className='text-sm'> Last 30 days</span></div>
            </div>
       {/* ITEM HITS */}
            </div>
          
        </div></div>
        <div className='shadow-lg lg:flex block mt-[-50px]'>
          <div className='shadow rounded-lg lg:w-[50%] shadow-lg mx-2  py-5 bg-green-50'>
            <h2 className='ml-5 font-semibold'>EARNING PIE CHART</h2>
            <MyPieChart />
          </div>
          <div className='shadow-lg rounded-lg lg:w-[50%] shadow-lg mx-2 py-5 bg-blue-50'>
            <div className='shadow flex justify-between border-0'>  <h2 className='ml-5 font-semibold border-0'>VISITORS/SALES CHART</h2> <div><a href='/dashboard' className='bg-[#82ca9d] mx-1 rounded p-1 text-sm font-semibold hover:bg-blue-200'>SALES</a><a href='/dashboard' className='bg-[#587fdb] mx-1 rounded p-1 text-sm font-semibold hover:bg-blue-200'>VIEWS</a></div> </div>
            <MyBarChart />
          </div>
          
        </div>
      </div>
      <div className='shadow-lg lg:flex block px-3 bg-blue-50 mt-[10px]'>
        <div className='w-full lg:w-[50%]'><h2 className='ml-5 font-semibold w-full'>ORDER HISTORY</h2>
        <table class="min-w-full bg-green-50">
          <thead class="border-b uppercase">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Item
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Price
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Status
                </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
               Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b bg-white">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Title
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                $1000
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                PENDING
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <Link className='flex justify-center bg-slate-200 rounded-lg py-1' href='dashboard/view/id'><span className='font-semibold uppercase text-sm'>View</span> <MdRemoveRedEye className='my-auto text-green'/></Link>
              </td>
            </tr>
            </tbody>
          </table></div>
        <div className='w-full lg:w-[50%] flex flex-col justify-center'>
         <div className='flex  flex-col justify-center  w-full text-center align-center'><h2 className='font-semibold'>HITS TODAY</h2> <div style={{lineHeight:'120px'}} className='bg-blue-100 border-[20px] border-red-100 mx-auto rounded-[50%] w-[150px] h-[150px] text-center text-3xl font-bolder'>
50000
          </div></div>
          <h2 className='ml-5 font-semibold w-full'>VISITORS BY REFERRERS ( LAST 30 DAYS)</h2>
        <table class="min-w-full bg-green-50">
          <thead class="border-b uppercase">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Site
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Count
              </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
               View
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b bg-white">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Site Name
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                1000
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <Link className='flex justify-center bg-slate-200 rounded-lg py-1' href='dashboard/view/id'><span className='font-semibold uppercase text-sm'>View</span> <MdRemoveRedEye className='my-auto text-green'/></Link>
              </td>
            </tr>
            </tbody>
          </table>
          <h2 className='ml-5 font-semibold w-full'>VISITORS BY COUNTRY(LAST 30 DAYS)</h2>
          <table class="min-w-full bg-green-50">
          <thead class="border-b uppercase">
            <tr>
              
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                COUNTRY
              </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Count
              </th>
                
            </tr>
          </thead>
          <tbody>
            <tr class="border-b bg-white">
              
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Site Name
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                1000
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <Link className='flex justify-center bg-slate-200 rounded-lg py-1' href='dashboard/view/id'><span className='font-semibold uppercase text-sm'>View</span> <MdRemoveRedEye className='my-auto text-green'/></Link>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
     </div>
     <Footer/>
     </>
    )
}

export async function getServerSideProps(context) {
    let items= await fetch(process.env.BACK_SERVER+'/admin/items').then(res=>{
      if(res.ok){
        return res.json()
      }
    }).then(data => {
  return data.items;
    }).catch(err => {
        console.error({err})})
        return {
            props: {items},
             // will be passed to the page component as props
          }
    }
    export default  Dashboard;