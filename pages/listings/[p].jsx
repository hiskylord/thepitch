import Head from "next/head";
import { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header  from "../../Header";
import Footer  from "../../Footer";
import {PItemcard,NItemcard} from "../../components/Itemcard"
import {FaArrowAltCircleLeft,FaArrowAltCircleRight}   from 'react-icons/fa';
 function Listings({sitems}) {
    const router = useRouter();
    const { p } = router.query;
    const [items,setItems]=useState(sitems);
    const fetchitems=()=>{
        const { p } = router.query;
        fetch(process.env.BACK_SERVER+'/listings/'+Number(p)).then(res=>{
            if(res.ok){
              return res.json();
            }
          }).then(data=> {
              console.log(data.items);
        setItems(data.items);
          }).catch(err => {
              console.error({err})})
    }
    useEffect(()=>{
        fetchitems()},[p])

   return (  <>
    <Header/>
    <div className="block">
        <div className="bg-blue-200 w-full py-3"><p className="mx-5 text-lg font-semibold">Latest Listings</p></div>
    <div className="flex flex-col justify-between w-full lg:w-5/6 mx-auto shadow">
<div className="pt-5 mx-3 lg:mx-1">
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
   {items.map((item)=><NItemcard data={item}/>)}
</div>
<div className="w-4/6 mx-auto flex justify-center"><Link href={'/listings/'+(Number(p)-1)}   className={p<1?'hidden':''}><FaArrowAltCircleLeft  className="text-4xl hover:text-blue-200"/></Link><Link href={'/listings/'+(Number(p)+1)}><FaArrowAltCircleRight className="text-4xl hover:text-blue-200"/></Link></div>
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
    const p=context.query;
  let sitems= await fetch(process.env.BACK_SERVER+'/listings/'+p).then(res=>{
    if(res.ok){
      return res.json()
    }
  }).then(data => { 
return data && data.items?data.items:[];
  }).catch(err => {
      console.error({err})})
          
  return {
    props: {sitems},
     // will be passed to the page component as props
  }

 
  }

  
export default Listings;