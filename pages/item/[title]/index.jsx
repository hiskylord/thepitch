import Head from "next/head";
import { useState,useEffect } from "react";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer  from "../../../components/Footer";
import {PItemcard,NItemcard} from "../../../components/Itemcard"
import Image from "next/image";
import {FaCartPlus,FaEye,FaAngleRight,FaHeart,FaRegGem}   from 'react-icons/fa';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import  lg from "../../../public/assets/logo.png"
 function Promotions({data,title}) {
  let [categories,setCategories]=useState([])
  useEffect(async ()=>{
    const res = await fetch('https://dummyjson.com/products/categories');
const catgories  = await res.json();
setCategories(catgories);
    },[])
  return (
    <>
    <Header/>
    <div className="block lg:flex">
    <div className='leftsidebar  shadow relative hidden lg:block w-2/3 lg:w-1/6'> <div className='flex flex-row justify-items-between'>
      </div>{categories.map((category)=>  <div className="py-1" role="none">
      <Link href={'/item/'+category}><a  className="text-gray-700 block px-5 border border-2 text-center py-2 lg:py-4 text-sm hover:bg-yellow-100 border-y-1 border-ash-200  text-yellow-500 hover:text-black flex justify-between"> <span className="my-auto flex"> <FaRegGem className='mx-1 my-auto text-xl'/> <span className="my-auto">{category.toUpperCase()}</span></span> <FaAngleRight className="text-yellow my-auto"/></a></Link>
    </div>)}</div>
    <div className="flex flex-col justify-between w-full lg:w-5/6 lg:h-screen overflow-auto mx-2">
    <p className="rounded-top-lg shadow-lg uppercase bg-yellow-300 py-3 mb-3  rounded-t text-center"><h2 className="ml-3">{title}</h2> </p>
<div className="pt-5 mx-3 lg:mx-1">
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
   {data.map((item)=><NItemcard data={item}/>)}
</div>


</div>
<Footer className='flex-[4]'/>
    </div>
  
    </div>
    
    </>
  );
}
export async function getServerSideProps(context) {
  const { title } = context.query;
  const res = await fetch(`https://dummyjson.com/products/category/${title}`)
  const data = await res.json();
      return {
        props: {'data':data.products,title},
      }
    }
export default Promotions;