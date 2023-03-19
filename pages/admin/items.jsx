import React, { useState,useEffect } from 'react';
import Axios from 'axios';
import Form from '../../components/Form';
import Swal from 'sweetalert2'
import ReactDOMServer from 'react-dom/server';
import Link from 'next/link'
import Header from './Header';
import Footer from '../Footer';
import { ANItemcard } from '../../components/Itemcard';
function Items({categories,brands,items}) {
  const action='';
    let Strtolink=(str)=> {
      return str.toString().toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s/g, "-");
    }
  useEffect(() => {  
   if(action && action!==''){
            document.querySelectorAll('form').forEach((form)=>{
                form.addEventListener('submit',Form);
                if(document.querySelector('#editimages')){
                document.querySelector('#editimages').addEventListener("change",function(e) {
                 if(e.target.files.length>3){
                  document.querySelector('.editpostbtn').disabled=true;
                  Swal.fire('POST ITEM','Images must be a maximum of 3','warning');
                 }else{document.querySelector('.editpostbtn').disabled=false;};
              });}
        })
         }

         
   }, []);

const removecolor=(e)=>{
    document.querySelector('#unp-palette-render').innerHTML='';
    document.querySelector('#unp-palette').value.split('#').forEach((c)=>{
        if(c){
    document.querySelector('#unp-palette-render').innerHTML+=ReactDOMServer.renderToString(<span value={'#'+c} className='form-option-color colorpick rounded-circle'  style={{position: 'relative',width: '1.5rem',marginTop:'0.75rem',marginRight:'.75rem',marginLeft:'.75rem',height: '1.5rem',backgroundSize: '1.5rem 1.5rem',backgroundRepeat: 'no-repeat', backgroundColor:'#'+c}}></span>);
   }
})
            }
      const  ColorAdd=(e)=>{
        document.querySelector('#unp-palette').value=document.querySelector('#unp-palette').value+''+e.target.value;
        document.querySelector('#unp-palette-render').innerHTML+=ReactDOMServer.renderToString(<span value={e.target.value} className='form-option-color colorpick rounded-circle'  style={{position: 'relative',width: '1.5rem',marginTop:'0.75rem',marginRight:'.75rem',marginLeft:'.75rem',height: '1.5rem',backgroundSize: '1.5rem 1.5rem',backgroundRepeat: 'no-repeat', backgroundColor:e.target.value}}></span>);
        }
    const handleEditorReady=(html,text)=>{
        
    }
    const handleChange=(html,text)=>{
document.querySelector('#unp-product-description').value=html;
    }
    return (<>
    <Header/>
      <div className="pt-2 px-4 ps-lg-0 pe-xl-5">

        {/* <!-- Title--> */}
        <div className="flex flex-wrap justify-between align-center border-b">
                  <h2 className="h3 py-2 me-2 text-center text-sm-start uppercase font-semibold">Your products:<span className="bg-green-500 p-1 rounded-full align-middle ml-4 font-bold">{items.length}</span></h2>
                  <div className="py-2">
                    <div className="d-flex flex-nowrap align-items-center pb-3">
                    { !action?( <><label className="form-label fw-normal text-nowrap mb-0 mr-2 font-semibold" for="sorting">Sort by:</label>
                      <select className="pl-2 py-2  w-full rounded-lg  border-2 border-ash-200" id="sorting">
                        <option>Date Created</option>
                        <option>Product Name</option>
                        <option>Price</option>
                        <option>Your Rating</option>
                        <option>Updates</option>
                      </select>
                      <button className="btn btn-outline-secondary btn-sm px-2" type="button"><i className="ci-arrow-up"></i></button>
                      </>):'Edit Product'}</div>
                  </div>
                </div>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
                {!action && items.map((item,key)=>(
                    <>    
           <ANItemcard data={item} key={key} Strtolink={Strtolink}/>
                </>
                )) 
}</div>
{ action && action=='edit'? (items.filter((item)=> {return item.id==id}).map((item,key)=>(
                    <>    
                    <Header/>
                {/* <!-- Title--> */}
                
                <form method='post' action={'/admin/items/edit/'+id} onSubmit={(e)=>{e.preventDefault();fetchitem()}}>
                  <div className="mb-3 pb-2">
                    <label className="form-label" for="unp-product-name">Product Title</label>
                    <input className="form-control" defaultValue={item.title} name='title' type="text" id="unp-product-name" required/>
                    <div className="form-text">No HTML or emoji allowed.</div>
                  </div>
                  <div className="file-drop-area mb-3">
                    <div className="file-drop-icon ci-cloud-upload"></div><span className="file-drop-message">Drag and drop here to upload product screenshot</span>
                    <input className="file-drop-input itemimg" id='editimages' type="file" name="images" accept="image/gif, image/jpeg, image/png,image/jpg" multiple/>
                    <button className="file-drop-btn btn btn-primary btn-sm mb-2" type="button">Or select file</button>
                    <div className="form-text d-flex">{item.photos.map(phohref=><img src={process.env.REACT_APP_SERVER+'/static/'+photo} style={{width:'80px',height:'80px'}} alt={item.title}/> )}</div>
                  </div>
                  <input type='hidden' value={item.photos} name='previmg'/>
                  <label>Category:</label><br/>
            <div className='input-group'><select name='cat' className="form-control input-group-prepend showSub custom-select mb-2" required><option value="">Choose Category</option>{categories.map((cat)=>(
                <option defaultValue={cat.toLowerCase()} className='text-uppercase' selected={cat.toLowerCase()==item.cat.toLowerCase()?true:false}>{cat.toUpperCase()}</option> 
            ))}</select><select name='brand' className='input-group-append form-control input-group-prepend showSub custom-select mb-2' ><option value="">Choose Brand</option>{brands.map((brand)=>(
                <option defaultValue={brand.toLowerCase()} className='text-uppercase' selected={brand.toLowerCase()==item.brand.toLowerCase()?true:false}>{brand.toUpperCase()}</option> 
            ))}</select></div>
                  <div className="mb-3 py-2">
                    <label className="form-label" for="unp-product-description">Product description</label>
                    <textarea defaultValue={item.content} className="form-control d-none" name='content' rows="6" id="unp-product-description"></textarea>
                    <TrixEditor value={item.content} onChange={handleChange} onEditorReady={handleEditorReady} />
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mb-3">
                      <label className="form-label" for="unp-standard-price">Price</label>
                      <div className="input-group"><span className="input-group-text"><i className="ci-dollar"></i></span>
                        <input name='price' className="form-control" defaultValue={item.price} type="text" id="unp-standard-price"/>
                      </div>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mb-3">
                      <label className="form-label" for="unp-standard-discount">Discount</label>
                      <div className="input-group"><span className="input-group-text">%</span>
                        <input name='discount' className="form-control" defaultValue={item.discount} type="number" id="unp-standard-discount" required/>
                      </div>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mb-3">
                      <label className="form-label" for="unp-standard-price">Colors</label>
                      <div className="input-group"><span className="input-group-text"><input type='color' onChange={ColorAdd}/></span>
                        <input name='colors' defaultValue={item.colors} onChange={(e)=>{removecolor(e)}} className="form-control" type="text" id="unp-palette"/>
                      </div>
                      <span id='unp-palette-render' className='d-flex'></span>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mb-3">
                      <label className="form-label" for="unp-standard-price">Sizes</label>
                      <div className="input-group"><span className="input-group-text"><i className="ci-ruler"></i></span>
                        <input name='sizes' defaultValue={item.sizes} className="form-control" type="text" id="unp-options"/>
                      </div>
                      <div className="form-text">Separate sizes by  #. Eg S#L#XL#</div>
                    </div>
                  </div>
                  <div className="mb-3 py-2">
                    <label className="form-label" for="unp-product-tags">Product tags</label>
                    <textarea name='keywords' defaultValue={item.keywords} placeholder='Eg red,gown'  className="form-control" rows="4" id="unp-product-tags" required></textarea>
                    <div className="form-text">Up to 10 keywords that describe your item. Tags should all be in lowercase and separated by commas.</div>
                  </div>
                  <button name='additem'  type="submit" className="editpostbtn btn btn-primary d-block w-100"><i className="ci-cloud-upload fs-lg me-2"></i>Upload Product</button>
                </form>
              <Footer/>  
            </>
                )) ):''
}



              </div></>);
}
export async function getServerSideProps(context) {
  let items= await fetch(process.env.BACK_SERVER+'/items').then(res=>{
    if(res.ok){
      return res.json()
    }
  }).then(data => {
return data.items;
  }).catch(err => {
      console.error({err})})
  let categories= await fetch(process.env.BACK_SERVER+'/categories').then(res=>{
    if(res.ok){
      return res.json()
    }
  }).then(data => {
return data.categories;
  }).catch(err => {
      console.error({err})})
let brands= await fetch(process.env.BACK_SERVER+'/brands').then(res=>{
        if(res.ok){
          return res.json()
        }
      }).then(data => {
    return data.brands;
      }).catch(err => {
          console.error({err})})
  return {
    props: {categories,brands,items},
     // will be passed to the page component as props
  }

 
  }
export default Items;
        