import React, { useEffect } from 'react';
import Swal from 'sweetalert2'
import ReactDOMServer from 'react-dom/server';
// import "trix/dist/trix";
// import "trix/dist/trix.css";
// import { TrixEditor } from "react-trix";
import Header from './Header';
import Footer from '../Footer';
import Form from '../../components/Form';
import { MdCloudUpload } from 'react-icons/md';
function Additem({categories,brands}) {
    useEffect(()=>{
        document.querySelectorAll('form').forEach((form)=>{
          form.addEventListener('submit',Form);
          document.querySelector('#sellimages').addEventListener("change",function(e) {
           if(e.target.files.length>3){
            document.querySelector('.sellpostbtn').disabled=true;
            Swal.fire('POST ITEM','Images must be a maximum of 3','warning');
           }else{document.querySelector('.sellpostbtn').disabled=false;};
        });
        })})

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
        document.querySelector('#unp-palette-render').innerHTML+=ReactDOMServer.renderToString(<span value={e.target.value} className='form-option-color colorpick rounded-full'  style={{position: 'relative',width: '1.5rem',marginTop:'0.75rem',marginRight:'.75rem',marginLeft:'.75rem',height: '1.5rem',backgroundSize: '1.5rem 1.5rem',backgroundRepeat: 'no-repeat', backgroundColor:e.target.value}}></span>);
        }
    const handleEditorReady=(html,text)=>{
        
    }
    const handleChange=(html,text)=>{
document.querySelector('#unp-product-description').value=html;
    }
    return (<><Header/>             
             <div className="pt-2 px-4 shadow mx-auto lg:w-[80%] w-full">
                {/* <!-- Title--> */}
                <div className="flex justify-between align-center pb-2">
                  <h2 className="h3 py-2 mx-auto font-bold uppercase">Add Product</h2>
                </div>
                <form method='post' action='items/add' encType='multipart/form-data'>
                  <div className="mb-3 pb-2">
                    <label className="font-semibold uppercase" for="unp-product-name">Product Title</label>
                    <input className="pl-2 py-2  w-full rounded-lg  border-2 border-ash-200" name='title' type="text" id="unp-product-name" required/>
                    <div className="form-text">No HTML or emoji allowed.</div>
                  </div>
                  <div className="file-drop-area mb-3">
                    <div className="file-drop-icon ci-cloud-upload"></div><span className="file-drop-message">Drag and drop here to upload product screenshot</span>
                    <input className="file-drop-input itemimg" id='sellimages' type="file" name="images" accept="image/gif, image/jpeg, image/png,image/jpg" multiple/>
                    <button className="file-drop-btn btn btn-primary btn-sm mb-2" type="button">Or select file</button>
                    <div className="form-text">1000 x 800px ideal size for hi-res displays 3Files Maximum</div>
                  </div>
                  <label className="font-semibold uppercase">Category:</label><br/>
            <div className='flex w-full justify-between'><select name='cat' className="mr-1 py-2  w-[50%] rounded-lg  border-2 border-ash-200 input-group-prepend showSub custom-select mb-2" required><option value="">Choose Category</option>{categories.map((cat)=>(
                <option value={cat} className='text-uppercase'>{cat.toUpperCase()}</option> 
            ))}</select><select name='brand' className='input-group-append mr-1 py-2  w-[50%] rounded-lg  border-2 border-ash-200 input-group-prepend custom-select mb-2' ><option value="">Choose Brand</option>{brands.map((brand)=>(
                <option value={brand} className='text-uppercase'>{brand.toUpperCase()}</option> 
            ))}</select></div>
                  <div className="mb-3 py-2">
                    <label className="font-semibold uppercase" for="unp-product-description">Product description</label>
                    <textarea className="pl-2 py-2  w-full rounded-lg  border-2 border-ash-200 d-none" name='content' rows="6" id="unp-product-description"></textarea>
                    {/* <TrixEditor onChange={handleChange} onEditorReady={handleEditorReady} /> */}
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mb-3">
                      <label className="font-semibold uppercase" for="unp-standard-price">Price</label>
                      <div className="input-group"><span className="input-group-text"><i className="ci-dollar"></i></span>
                        <input name='price' className="pl-2 py-2  w-full rounded-lg  border-2 border-ash-200" type="text" id="unp-standard-price"/>
                      </div>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mb-3">
                      <label className="font-semibold uppercase" for="unp-standard-price">Colors</label>
                      <div className="input-group"><span className="input-group-text"><input type='color' onChange={ColorAdd}/></span>
                        <input name='colors' onChange={(e)=>{removecolor(e)}} className="pl-2 py-2  w-full rounded-lg  border-2 border-ash-200" type="text" id="unp-palette"/>
                      </div>
                      <span id='unp-palette-render' className='flex'></span>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mb-3">
                      <label className="font-semibold uppercase" for="unp-standard-price">Sizes</label>
                      <div className="input-group"><span className="input-group-text"><i className="ci-ruler"></i></span>
                        <input name='sizes' className="pl-2 py-2  w-full rounded-lg  border-2 border-ash-200" type="text" id="unp-options"/>
                      </div>
                      <div className="form-text">Separate sizes by  #. Eg S#L#XL#</div>
                    </div>
                    
                  </div>
                  <div className="mb-3 py-2">
                    <label className="font-semibold uppercase" for="unp-product-tags">Product tags</label>
                    <textarea name='keywords' placeholder='Eg red,gown'  className="pl-2 py-2  w-full rounded-lg  border-2 border-ash-200" rows="4" id="unp-product-tags" required></textarea>
                    <div className="form-text">Up to 10 keywords that describe your item. Tags should all be in lowercase and separated by commas.</div>
                  </div>
                  <button name='additem' type="submit" className="sellpostbtn  p-3 bg-blue-300 hover:bg-blue-400  rounded-xl w-full text-center mx-auto flex justify-center"><MdCloudUpload className='text-xl mr-3'/><span className='uppercase text-lg'>Upload Product</span></button>
                </form>
              </div>      <Footer/>       </>);
}
export async function getServerSideProps(context) {
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
    props: {categories,brands},
     // will be passed to the page component as props
  }

 
  }

export default Additem;