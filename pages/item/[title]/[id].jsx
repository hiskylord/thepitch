import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import Header  from "../../../components/Header";
import Footer  from "../../../components/Footer";
import { server } from "../../config";
import {FaStarHalfAlt,FaStar,FaFacebookF,FaTwitter,FaWhatsapp,FaCartPlus,FaRegEye}  from 'react-icons/Fa';
import Image from "next/image";
import { useState } from "react";
function Item({data}) {
const demo=false;
const [photo,pushphoto]=useState(data.thumbnail)
 if(data && data.title) return (
      <>
    <Header/>
    <div className="bg-slate-200 py-5">
        <h2 className="py-3 lg:py-[14px] mx-10 lg:mx-[30px] font-semibold text-xl">{data.title}</h2>
    </div>
    <div className="w-[96%] lg:w-[95%] rounded-xl mx-auto shadow  mt-[-10px] shadow bg-white lg:py-4" title='contact'>
        
   <div className="flex flex-col lg:flex-row mx-3"><div className="w-full lg:w-1/5 flex lg:flex-col flex-row mx-auto lg:mx-3">{data.images.map(im=><img src={im} layout='fill' alt={data.title} onClick={()=>pushphoto(im)} className='mt-1 mr-1 w-[50%] lg:w-[96%] opacity-60 hover:opacity-90'/>)}</div> <div className="w-full lg:w-4/5 mt-2 lg:mt-1"><img src={photo} className='w-full h-[350px] lg:h-[500px]'  layout='fill' alt={data.title}/></div>
   </div>
    
  <div className="lg:flex"> <div className="w-full lg:w-1/5"></div><div className="w-full lg:w-4/5 mx-[10px] border-2 border-slate-50 mt-2 shadow rounded-tr-xl rounded-bl-xl py-1 px-2">
    <p className="flex justify-between"><a href='' className="mr-3 inline bg-yellow-300 hover:bg-slate-200 font-semibold rounded-lg py-3 text-xs flex px-3 justify-center"><span className="mr-1">ADD TO CART</span> <FaCartPlus/></a>   {demo? '' :<a href='/demo' className="bg-yellow-300 hover:bg-slate-200 bg-yellow-300 font-semibold rounded-lg py-3 text-xs flex px-3 justify-center"><span className="mr-1">VIEW DEMO</span> <FaRegEye/></a>}
    </p>
    <h3 className="ml-10 pb-10 font-semibold underline text-center">ITEM DESCRIPTION:</h3>
{data.description}
{typeof window !== 'undefined' && <div className="w-fit my-auto bg-white right-0"><p className="text-sm mb-2">SHARE:</p> <div className="flex"> <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} className="py-2 mr-3 px-1 bg-blue-300 rounded-lg text-xs hover:text-white hover:bg-blue-700 flex justify-between"><FaFacebookF/> <span>FACEBOOK</span></a><a href={`whatsapp://send?text=${window.location.href}`} className="mr-3 py-2 px-1 bg-green-300 rounded-lg text-xs hover:text-white hover:bg-green-500 flex justify-between"><FaWhatsapp/> <span>WHATSAPP</span></a><a href={`http://twitter.com/share?text=${data.title}&url=${window.location.href}&hashtags=3`} className="py-2 px-1 bg-blue-200 rounded-lg text-xs hover:text-white hover:bg-indigo-500 flex justify-center"><FaTwitter/> <span>TWITTER</span></a></div></div>}
   </div></div>

<h4 className="font-semibold uppercase">Reviews</h4>
   <ul className="list-none">
                {[
                  { name: "James", comment: "Wonderful product", date: "20-12-1100",stars:5 },
                  { name: "Benjamin", comment: "Perfect", date: "20-12-1100",stars:2.5 },
                  { name: "Obrein", comment: "This is lovely", date: "20-12-1100" ,stars:4.5},
                  { name: "Samuel", comment: "I love this seller", date: "20-12-1100" ,stars:1.5},
                  { name: "Francis", comment: "This item is topnotch", date: "20-12-1100",stars:4.5 },
                ].map((comment) => (
                  <li className="pl-2 pt-2 bg-white border-t-2 border-gray-100">
                    <div className="w-full flex justify-between"><span>{comment.comment}</span><span className="flex">{[...Array(Math.floor(comment.stars)).keys()].map(()=><FaStar className="text-yellow-500"/>)}{comment.stars-Math.floor(comment.stars)>0?<FaStarHalfAlt className="text-yellow-500"/>:''}</span> </div>
                    <div className="flex justify-between bg-slate-50 bottom-0 opacity-50 italic">
                      <span className="text-xs">{comment.name}</span>{" "}
                      <span className="text-xs text-blue-300">
                        {comment.date}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
    </div>
    <Footer/>
    </>
  );
}
export async function getServerSideProps(context) {
const { id } = context.query;
const res = await fetch(`https://dummyjson.com/products/${id}`)
const data = await res.json();

    return {
      props: {data},
    }
  }
  export default Item;