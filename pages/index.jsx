import Head from "next/head";
import { useState,useEffect } from "react";
import Link from "next/link";
import Header  from "../components/Header";
import Footer  from "../components/Footer";
import {PItemcard,NItemcard} from "../components/Itemcard"
import Image from "next/image";
import {FaCartPlus,FaEye,FaAngleRight,FaHeart,FaRegGem}   from 'react-icons/fa';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import  lg from "../public/assets/logo.png"
 function Home({products,fcartcount}) {
  let [categories,setCategories]=useState([])
  let [cartcount,setCartCount]=useState(fcartcount>0?fcartcount:0);
  useEffect(async ()=>{
    const res = await fetch('https://dummyjson.com/products/categories');
const catgories  = await res.json();
setCategories(catgories);
    },[])
  let Indexslides=[{href:products[0]['thumbnail'],desc:products[0]['title']},{href:products[1]['thumbnail'],desc:products[1]['title']},{href:products[2]['thumbnail'],desc:products[2]['title']}]
  return (
    <>
    <Header fcartcount={fcartcount}/>
    <div className="block">
    <div className="flex flex-col justify-between w-full lg:w-5/6   mx-auto">
    <div className='mx-auto flex lg:flex-row-reverse flex-col'>
      <Carousel autoPlay interval="2500" transitionTime="2500" className="drop-shadow-lg" showThumbs={false}>
      { Indexslides.map((slide)=>
        <div className="relative">
                    <img src={slide.href} alt='Slider'  className='w-full lg:w-full/2 h-96 lg:h-[450px]' />
                    <p className="legend my-auto">{slide.desc}</p>
                </div>
                 )}
              
            </Carousel>  
    </div>
<div className="pt-5 mx-3 lg:mx-1">
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
   {products.map((item)=><NItemcard data={item}/>)}
</div>

 <div className="bg-light-300 shadow"><p className="rounded-top-lg shadow-lg uppercase bg-yellow-300 py-3 mb-3  rounded-t flex justify-between"><h2 className="ml-3">Hot Deals</h2> <span>Time Left: 2:44:40</span> <Link href='/promotions'><a className="flex"><span className="my-auto text-white">View All</span> <FaAngleRight className="my-auto text-white"/></a></Link></p>
<div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
   {products.filter(pro=>pro.stock>60).map((item)=><PItemcard data={item}/>)}
</div>
</div>
<div className="bg-light-300 shadow mt-10"><p className="rounded-top-lg shadow-lg uppercase bg-light-300 py-3 mb-3  rounded-t flex justify-between"><h2 className="ml-3">Customers Picks</h2> <Link href='/listings'><a className="flex rounded-full bg-yellow-400 hover:bg-yellow-300"><span className="my-auto text-white pl-2">All</span> <FaAngleRight className="my-auto text-white"/></a></Link></p>
<div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
   {products.map((item)=><NItemcard data={item}/>)}
</div></div>

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
  let products= await fetch('https://dummyjson.com/products').then(res=>{
    if(res.ok){
      return res.json()
    }
  }).then(data => {
return data.products;
  }).catch(err => {
      console.error({err})})
      let fcartcount= await fetch('https://dummyjson.com/carts/user/5').then(res=>{
        if(res.ok){
          return res.json()
        }
      }).then(data => {
        console.log(data.carts[0].products)
    return data.carts[0].products.length;
      }).catch(err => {
          console.error({err})})
  return {
    props: {products,fcartcount},
     // will be passed to the page component as props
  }

 
  }

  
export default Home;