import Header  from "./Header";
import Footer  from "./Footer";
import Link from "next/link";
import * as FA  from 'react-icons';
import Axios from 'axios'
import Form from "../components/Form";
import Swal from 'sweetalert2'
import countries from '../components/countries'
import { useState,useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { FaHome,FaArrowRight,FaTrashAlt } from "react-icons/fa";
function Cartdetails({items}) {
  const rate=1;
  let [subtotal,setSubtotal]=useState(0);
  const [cartitms, setCartitms] = useState([]);
  const [carts, setCarts] = useState([]);
  const removeCart=(id)=>{
    let cartid;
    if (localStorage.getItem("cartid") === null) {
      cartid=sha256(Date.now()).toString()+Date.now();
      localStorage.setItem("cartid",cartid);
    }else{
      cartid=localStorage.getItem("cartid");}
    Axios.put(process.env.BACK_SERVER+'/cart/'+cartid+'/'+id,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'token':sessionStorage.getItem('token')?sessionStorage.getItem('token'):'',
      }
    }).then(res => {
      setCarts(res.data.carts);
      }).catch(err => {
          console.log(err.message)});
  }
  const Orderdata = (id) => {
    return cartitms.filter((item) => {
      return item.id == id;
    })[0];
  };
  const ISSERVER = typeof window === "undefined";
  let customer='';
    if(!ISSERVER) {
    customer=sessionStorage.getItem("User")
      ? JSON.parse(sessionStorage.getItem("User"))
      : ""
     
  }  
  console.log(customer)
  let Strtolink = (str) => {
    return str
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s/g, "-");
  };
const changeQty = (id, qty) => {
    let cartid;
    if (localStorage.getItem("cartid") === null) {
      cartid = sha256(Date.now()).toString() + Date.now();
      localStorage.setItem("cartid", cartid);
    } else {
      cartid = localStorage.getItem("cartid");
    }
    Axios.patch(
      process.env.BACK_SERVER + "/cart/" + cartid + "/" + id,
      { qty: qty },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: sessionStorage.getItem("token")
            ? sessionStorage.getItem("token")
            : "",
        },
      }
    )
      .then((res) => {
        if (res.data.carts.length > 0) {
          setCarts(res.data.carts);
          fetch(process.env.BACK_SERVER + "/cart/" + cartid)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.carts.length > 0) {
          setCartitms(data.carts);
          setSubtotal(Number(data.subtotal));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
 
  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].id === obj.id) {
        return true;
      }
    }

    return false;
  }

  useEffect(() => {
    let cartid;
    if (localStorage.getItem("cartid") === null) {
      cartid = sha256(Date.now()).toString() + Date.now();
      localStorage.setItem("cartid", cartid);
    } else {
      cartid = localStorage.getItem("cartid");
    }
    Axios.post(process.env.BACK_SERVER + "/cart/" + cartid, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : "",
      },
    })
      .then((res) => {
        if (res.data.carts.length > 0) {
          setCarts(res.data.carts);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
      fetch(process.env.BACK_SERVER + "/cart/" + cartid)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.carts.length > 0) {
          setCartitms(data.carts);
          setSubtotal(Number(data.subtotal));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    })
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  if(searchParams.get('canceled') || searchParams.get('success')){
    Swal.fire('PAYMENT PROCESSING',searchParams.get('canceled')?'Payment was cancelled':'Payment was successfully received.Order is now being processed',searchParams.get('canceled')?'warning':'success')}
    if(searchParams.get('success')){localStorage.removeItem("cartid");}
 const processpay=(e)=>{
         e.preventDefault();
         let data=new FormData(e.target);
       Axios.post(process.env.BACK_SERVER+e.target.getAttribute('action')+'/'+localStorage.getItem("cartid"),data, {
         headers: {
           'Content-Type': 'multipart/form-data',
           'token':sessionStorage.getItem('token')?sessionStorage.getItem('token'):'',
         }
       }).then(res => {
             Swal.fire(res.data.title='RESPONSE',res.data.msg,res.data.type);
             if(res.data.redirect){window.location=res.data.redirect;} 
               if(res.data.msg){Swal.fire('PROCESS ORDER',res.data.msg,'warning');}
            if(res.data.type==='success'){document.querySelector('.postitem').reset()}
         }).catch(err => {
             Swal.fire(JSON.stringify(err.message))});
       
   }
   const [shipping,setShipping]=useState(0);
   const [COUPON,setCOUPON]=useState([]);
  useEffect(()=>{
   document.querySelectorAll('[name=shipping-method]').forEach(elm=>elm.addEventListener('change',(e)=>{
     if((subtotal/rate)>99 && document.querySelector('[name=country]').value=='United States'){
     setShipping(0);
      }else{
       if(parseFloat(e.target.value)>0){setShipping(e.target.value);};
      }
    }))
    document.querySelector('[name=country]') && document.querySelector('[name=country]').addEventListener('change',(e)=>{
    if((subtotal/rate)>99 && e.target.value=='United States'){
     setShipping(0);
      }else{
       setShipping(document.querySelector('[name=country][checked=true]').value);;
      }
    })
  },[])
  const applycoupon=()=>{
 if(COUPON.length<1){fetch(process.env.BACK_SERVER+'/coupon/'+document.querySelector('.appliedcoupon').value).then(
   res=>{if(res.ok){
     return res.json();
   }}
  ).then(
   data=>{if(data.coupon.length<1){
    document.querySelector('.coupon-feedback').style.display='block';
   }
   setCOUPON(data.coupon);
 }
  )}else{
   document.querySelector('.appliedcoupon').value='';
   setCOUPON([])
   }
 }
  let total=parseFloat(subtotal)+parseFloat(shipping*rate);
if(COUPON.length>0){
total= (COUPON[0].val.includes('%')? total*eval(1-Math.abs(parseInt(COUPON[0].val))*0.01): eval(total-Math.abs(COUPON[0].val))).toFixed(2);
}

  return (
    <>
    <Header/>
    <div className="page-title-overlap bg-dark pt-4">
        <div className="container lg:flex justify-content-between py-2 py-lg-3">
          <div className="order-lg-2 mb-3 mb-lg-0 pt-lg-2">
            <nav aria-label="breadcrumb">
              <ol className="flex justify-center">
                <li className="breadcrumb-item flex"><Link className="text-nowrap flex uppercase mr-2" href="/"><FaHome/><span>Home</span></Link></li>
               <li className="my-auto"><FaArrowRight/></li> <li className="breadcrumb-item text-nowrap text-blue-500 uppercase ml-2" aria-current="page">Cart</li>
              </ol>
            </nav>
          </div>
          <div className="text-center text-lg">
            <h1 className="h3 text-light mb-0 uppercase font-bold text-lg">Your cart</h1>
          </div>
        </div>
</div>
<div className="container pb-5 mb-2 mb-md-4">
        <div className="row mx-auto">
          {/* <!-- List of items--> */}
          <section className="w-full lg:w-[80%] mx-auto">
            <div className="d-flex justify-content-between align-items-center pt-3 pb-4 pb-sm-5 mt-1">
              <h2 className="h6 text-light mb-0 uppercase font-semibold">Products</h2><Link className="pl-2 py-2  w-[250px] bg-blue-100 rounded-lg border-2 border-ash-200 flex" href="/"><FaArrowRight className="my-auto"/><span>Continue shopping</span></Link>
            </div>
{carts.map((cart)=>
           Orderdata(cart.id) && <div className="d-sm-flex justify-content-between align-items-center my-2 pb-3 border-bottom">
              <div className="flex align-center text-center text-sm-start"><Link className="d-inline-block flex-shrink-0 mx-auto me-sm-4" href={'/item/'+Strtolink(Orderdata(cart.id).title)+'/'+cart.id}><img src={process.env.BACK_SERVER+'/static/'+Orderdata(cart.id).photos[0]} alt="Product"  style={{width:160,height:160}}/></Link>
                <div className="pt-2">
                  <h3 className="text-xl mb-2 uppercase font-bold"><Link href={"item/"+Strtolink(Orderdata(cart.id).title)+"/"+cart.id}>{Orderdata(cart.id).title}</Link></h3>
                 {cart.size && <div className="fs-sm"><span className="text-muted me-2">Size:</span><span className='text-uppercase'>{cart.size}</span></div>}
                 {cart.color &&   <div className="fs-sm"><span className="text-muted me-2">Color:</span> <div className="form-check form-option form-check-inline mb-2">
                  <input className="form-check-input" type="radio"  value={cart.color}/>
                  <label className="form-option-label rounded-circle"><span className="form-option-color rounded-circle" style={{backgroundColor:cart.color}}></span></label>
                </div>  </div>}
                  <div className="fs-lg text-xl font-semibold">${parseFloat(rate * Orderdata(cart.id).price * 0.01 * (100-parseInt(Orderdata(cart.id).discount))).toFixed(2)}</div>
               
                  <div className="pt-2 pt-sm-0 ps-sm-3 mx-auto mx-sm-0 text-center" style={{maxWidth: "9rem"}}>
                <label className="text-lg uppercase" htmlFor="quantity4">Quantity</label>
                <div className="flex"><input className="pl-2 py-2  w-full rounded-tl-lg rounded-bl-lg border-2 border-ash-200" onChange={(e)=>{changeQty(cart.id,e.target.value)}} type="number" id="quantity4" min="1" defaultValue={cart.qty}/>
                <button className="rounded-tr-lg rounded-br-lg bg-blue-200 px-2 py-2 flex" onClick={()=>{removeCart(cart.id)}} type="button"><FaTrashAlt className="text-red-400 my-auto"/></button></div>
              </div> </div>
              </div>
              
            </div>)}
            {carts.length<1?(<p className='alert alert-primary'>Your Cart is currently Empty</p>):''}
          </section>
          {/* <!-- Sidebar--> */}
          <aside className="w-full lg:w-[80%] mx-auto pt-4 pt-lg-0 ps-xl-5">
            <div className="bg-white rounded-3 shadow-lg p-4">
              <div className="py-2 px-xl-2">
                <div className="text-center mb-4 pb-3 border-bottom">
                  <h2 className="h6 mb-3 pb-1 text-lg font-semibold uppercase">Subtotal</h2>
                  <h3 className="fw-normal text-xl font-bold">${subtotal.toLocaleString()}</h3>
                </div>
                <div className="card mb-2" id="payment-method">
              <div className="py-1">
                <h3 className="py-1"><a className="accordion-button text-center uppercase" href="#card" data-bs-toggle="collapse" aria-expanded="true">Pay with Credit/Debit Card</a></h3>
                <div className="show" id="card" data-bs-parent="#payment-method" >
                  <div className="shadow">
                    <p className="fs-sm">We accept all major cards:&nbsp;&nbsp;<img className="inline-block mx-auto" src={process.env.BACK_SERVER+'/static/cards.png'} alt="Credit Cards" width="187"/></p>

                    <form className="checkout-card-form row unlink" action="/checkout" method='post' onSubmit={(e)=>processpay(e)}>
                      <h2 className="h6 pb-3 mb-2">Delivery Details</h2>
                      <div className="table-auto">
              <table className="table  border-t-2 w-full uppercase">
                <thead>
                  <tr className="bg-blue-200">
                    <th ></th>
                    <th >Shipping method</th>
                    <th >Delivery time</th>
                    <th >Handling fee</th>
                  </tr>
                </thead>
                <tbody>
                <tr className="my-auto">
                    <td>
                      <div className="form-check mb-4">
                        <input className="form-check-input" type="radio" id="ups" name="shipping-method" value='0'/>
                        <label className="form-check-label" htmlFor="ups"></label>
                      </div>
                    </td>
                    <td ><span className="text-dark fw-medium">Pickup from Store house</span></td>
                    <td >instant</td>
                    <td >Free</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check mb-4">
                        <input className="form-check-input" type="radio" id="ups" name="shipping-method" value='0'/>
                        <label className="form-check-label" htmlFor="ups"></label>
                      </div>
                    </td>
                    <td ><span className="text-dark fw-medium">Local Shipping US(Order at least $100)</span><br/><span className="text-muted">All addresses (default zone)</span></td>
                    <td >less than 7 days</td>
                    <td >Free</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check mb-4">
                        <input className="form-check-input" type="radio" id="pickup" name="shipping-method" value='10'/>
                        <label className="form-check-label" htmlFor="pickup"></label>
                      </div>
                    </td>
                    <td ><span className="text-dark fw-medium">Local Shipping US(Order less than $100)</span><br/><span className="text-muted">All addresses (default zone)</span></td>
                    <td >—</td>
                    <td >$10.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check mb-4">
                        <input className="form-check-input" type="radio" id="same-day" name="shipping-method" value='34'/>
                        <label className="form-check-label" htmlFor="same-day"></label>
                      </div>
                    </td>
                    <td ><span className="text-dark fw-medium">Local Delivery(Same-Day)</span><br/><span className="text-muted">Only United States</span></td>
                    <td >—</td>
                    <td >$34.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check mb-4">
                        <input className="form-check-input" type="radio" id="international" name="shipping-method" value='25'/>
                        <label className="form-check-label" htmlFor="international"></label>
                      </div>
                    </td>
                    <td ><span className="text-dark fw-medium">International Shipping(Standard)</span><br/><span className="text-muted">All addresses (default zone)</span></td>
                    <td >up to 15 days</td>
                    <td >$25.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check mb-4">
                        <input className="form-check-input" type="radio" id="international" name="shipping-method" value='35'/>
                        <label className="form-check-label" htmlFor="international"></label>
                      </div>
                    </td>
                    <td ><span className="text-dark fw-medium">International Shipping(Priority)</span><br/><span className="text-muted">All addresses (default zone)</span></td>
                    <td >2 to 5 days</td>
                    <td >$35.00</td>
                  </tr>
                </tbody>
              </table>
              <p className="fw-normal">Order Total: ${subtotal.toLocaleString()}</p>
              <p className="fw-normal">Shipping Cost: ${parseFloat(shipping*rate).toFixed(2)}</p>
              <h3 className="fw-normal">Σ <i className={"fa fa-usd"}></i>{total.toLocaleString()}</h3>
            </div>
            <div className="mb-3 input-group">
                          <input className="pl-2 py-2  w-full rounded-lg border-2 border-ash-200" type="text" name='zip' placeholder="Zip/Postal Code"/>
                            <select className="pl-2 py-2  w-full rounded-lg border-2 border-ash-200" name='country' required="">
                              <option value="">Choose your country</option>
                              {countries.map((country,key)=><option key={key}>{country.name}</option>)}
                            </select> 
                          
                          </div>
            {customer.name?( <>
              <div className="mb-3">
                           <div className='flex hidden'> <input className="pl-2 py-2  w-full rounded-tl-lg rounded-bl-lg  border-2 border-ash-200 appliedcoupon" type="text" minLength={3} placeholder="Coupon" name='coupon' required="false"/><button type='button' onClick={(e)=>applycoupon()} className='bg-blue-100 px-3 py-2'>{COUPON.length<1?'APPLY':'REMOVE'}</button></div>
                            <div className="coupon-feedback invalid-feedback hidden">Invalid Coupon!</div>
                          </div>
                          <br/><br/><div className="mb-3">
                            <input className="pl-2 py-2  w-full rounded-lg border-2 border-ash-200" type="text" placeholder="Street Address" name='straddrs' required=""/>
                            <div className="invalid-feedback hidden">Please provide address!</div>
                          </div>
                          <div className="mb-3 input-group">
                           <input className="pl-2 py-2  w-full rounded-lg border-2 border-ash-200" type="text" name='city' placeholder="City" required=""/>
                           <input className="pl-2 py-2  w-full rounded-lg border-2 border-ash-200" type="text" name='state' placeholder="State" required=""/>
                          </div>
                          <input className="pl-2 py-2  w-full rounded-lg border-2 border-ash-200" type="hidden" name='subtotal' value={parseFloat(total/rate).toFixed(2)}  required=""/>
                          
                          <button type='submit' className="pl-2 py-2  w-full rounded-lg border-2 bg-blue-200 hover:bg-blue-400">Proceed to Checkout</button> </>):(<div className='row'><a className="btn btn-primary col-6" href="#signin-modal" data-bs-toggle="modal">SIGNIN</a>
              <a className="btn btn-info col-6" href="#signin-modal" data-bs-toggle="modal">SIGNUP</a></div>)}</form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    <Footer/>
    </>
  );
}

// export async function getServerSideProps(context) {let cartid ;
//   const ISSERVER = typeof window === "undefined";
//   if(!ISSERVER) {cartid = localStorage.getItem("cartid")};
//   console.log(process.env.BACK_SERVER+'/cart/'+cartid)
//   let carts= await fetch(process.env.BACK_SERVER+'/cart/'+cartid).then(res=>{
//     if(res.ok){
//       return res.json()
//     }
//   }).then(data => {
// return data.carts;
//   }).catch(err => {
//       console.error({err})})
//   return {
//     props: {carts},
//      // will be passed to the page component as props
//   }

 
//   }

  export default Cartdetails;