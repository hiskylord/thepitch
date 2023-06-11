import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from './Head'
import Footer from '../Footer'
import { FaAngleDoubleRight, FaTimesCircle } from 'react-icons/fa'
import { Protect } from '/components/protected'
import { PItemcard } from '/components/Itemcard'
import Link from 'next/link'
import Swal from 'sweetalert2'
import Axios from 'axios'
import {MyBarChart,MyLineChart,MyPieChart} from '/components/Charts'
import {MdAccountBalanceWallet,MdShoppingCart,MdRemoveRedEye,MdViewList} from 'react-icons/md'
function Addfund({ hotitems }) {
    const router = useRouter()
    return (
        <><Header />
            <div className='w-full mx-auto'>
                     <div className='shadow rounded-lg lg:w-full shadow-lg mx-auto  pt-5 pb-[30px] bg-green-50'>
            <h2 className='ml-5 font-semibold w-full'>ADD FUNDS</h2></div>
          <div className='bg-blue-50 py-5 h-[80vh] px-5'>
           <form method='post' className='flex justify-center flex-col mt-[5%] bg-white mx-auto lg:w-[50%] w-full shadow-lg px-5 rounded-lg'>
              <h2 className='font-semibold w-full py-2'>BTC DEPOSIT</h2>

                <p className='font-semibold mt-1 uppercase text-sm mx-auto'>Send 0.2 BTC only</p>
    <img src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=bitcoin:1ArmoryXcfq7TnCSuZa9fQjRYwJ4bkRKfv?&amount=0.005' className='mb-1 w-[50%]  mx-auto'/>
                         <label className='font-semibold uppercase text-sm mx-auto'>1ArmoryXcfq7TnCSuZa9fQjRYwJ4bkRKfv</label>
  
              <div className='w-full flex justify-center pb-2'><button type='submit' className='bg-blue-200 p-2 lg:w-[50%] w-full mx-auto'>CONFIRM PAYMENT</button>
         </div>
            </form>
            
            <form method='post' className='mt-[5%] bg-white mx-auto lg:w-[50%] w-full shadow-lg px-5 rounded-lg'>
              <h2 className='font-semibold w-full py-2'>CRYPTO DEPOSIT</h2>
                           <label className='font-semibold mt-1 uppercase text-sm'>Deposit Method:</label>
              <select name='method' className='mb-2 w-full p-2 border-2 border-slate-150 rounded'><option>BTC</option><option>USDT</option><option>BNB</option><option>ETH</option></select>
                         <label className='font-semibold mt-1 uppercase text-sm'>Crypto Amount:</label>
              <input name='amount' placeholder='Amount in USD' className='mb-2 w-full p-2 border-2 border-slate-150 rounded' />
  
              <div className='w-full flex justify-center py-2'><button type='submit' className='bg-blue-200 p-2 lg:w-[50%] w-full mx-auto'>CONTINUE</button>
         </div>
</form>
         
            <form method='post' className='mt-[5%] bg-white mx-auto lg:w-[50%] w-full shadow-lg px-5 rounded-lg'>
              <h2 className='font-semibold w-full py-2'>DEPOSIT FUNDS</h2>
                         <label className='font-semibold mt-1 uppercase text-sm'>Amount:</label>
              <input name='amount' placeholder='Amount in USD' className='mb-2 w-full p-2 border-2 border-slate-150 rounded' />
               <label className='font-semibold mt-1 uppercase text-sm'>Deposit Method:</label>
              <select name='method' className='mb-2 w-full p-2 border-2 border-slate-150 rounded'><option>CRYPTO</option><option>CARD</option></select>
              <div className='w-full flex justify-center py-2'><button type='submit' className='bg-blue-200 p-2 lg:w-[50%] w-full mx-auto'>DEPOSIT FUNDS</button>
         </div>
</form>
          </div>
            </div></>
    )
}
export async function getServerSideProps(context) {
  let hotitems= await fetch(process.env.BACK_SERVER+'/hotitems').then(res=>{
    if(res.ok){
        return res.json()
      }
    }).then(data => {
    return data.items;
    }).catch(err => {
      console.error({ err })
    })
return await Protect(context,hotitems);
}
export default Addfund;