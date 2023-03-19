import Head from "next/head";
import { useState,useEffect } from "react";
import Link from "next/link";
import Header  from "./Header";
import Footer  from "./Footer";
import {PItemcard,NItemcard} from "../components/Itemcard"
import {FaArrowAltCircleRight} from "react-icons/fa"
 function Promotions({items}) {
  return (
    <>
    <Header/>
    <div className="block">
        <div className="bg-blue-200 w-full py-3"><p className="mx-5 text-lg font-semibold">Hot Listings</p></div>
    <div className="flex flex-col justify-between w-full lg:w-5/6 mx-auto shadow">
<div className="pt-5 mx-3 lg:mx-1">
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
   {items.map((item)=><NItemcard data={item}/>)}
</div>

</div>

    </div>
    <Footer className='flex-[4]'/>
    </div>
    
    </>
  );
}
// export async function getStaticProps() {
//   return { props: { title: 'HomePage' } }
// }
export async function getServerSideProps(context) {
  let items= await fetch(process.env.BACK_SERVER+'/hotitems/16').then(res=>{
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

  
export default Promotions;