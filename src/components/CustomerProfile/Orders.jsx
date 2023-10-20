import Sidebar from './Sidebar'
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {useState,useEffect} from 'react';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import toast, { Toaster } from 'react-hot-toast';
import rating from '../../images/other/rating.png'
import rating1 from '../../images/other/rating/1.png'
import rating2 from '../../images/other/rating/2.png'
import rating3 from '../../images/other/rating/3.png'
import rating4 from '../../images/other/rating/4.png'
import rating5 from '../../images/other/rating/5.png'

  const Orders = () => {
    // const BASE_URL = 'https://simplykamar.tech/api';
    const BASE_URL = 'http://127.0.0.1:8000/api'; 
    const [orders,setorders] = useState([]);
    const [loading,setLoading] = useState(true);
    const user= useSelector((state)=>state.auth);
    const [reviewRating, setReviewRating] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [reviewStep, setReviewStep] = useState(0)
    const [reviewData, setReviewData] = useState([])
    const notifySuccess = (text) => toast.success(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
    const notifyError = (text) => toast.error(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
    const ratedImage = {
           1: rating1,
           2: rating2,
           3: rating3,
           4: rating4,
           5: rating5,
      };
  const fetchData = (url) => {
          axios.get(url,{headers:{"Authorization" : `JWT ${user.access}`}})
            .then(response=>{
              console.log(response);
              setorders(response.data);
              setLoading(false);
            })
            .catch(error=>{
              alert('server error..!')
              console.log(error);
            });
    }
   function addProductRating(productId){
        setReviewData(reviewData=>[...reviewData,{product:productId,review:reviewText,rating:reviewRating}])
        setReviewText('')
        setReviewRating(0)
        setReviewStep(reviewStep+1)
  }
  async function submitProductRating(productId,orderId){
    addProductRating(productId)
    const data = [...reviewData,{product:productId,review:reviewText,rating:reviewRating}]
    const formData = new FormData();
    formData.append('order',JSON.stringify(orderId))
    formData.append('reviewData',JSON.stringify(data))
    formData.append('customer',JSON.stringify(user.user.id))
    await axios.post(BASE_URL+`/product-review/`,formData,{headers:{"Authorization":`JWT ${user.access}`}})
    .then(response=>{
      console.log(response)
      notifySuccess('Rating submit')
      fetchData(BASE_URL+`/order-detail/?customer=${user.user.id}`)
    })
    .catch(error=>{
      notifyError('Error! try again..')
      console.log(error);
    })
    setReviewText('')
    setReviewRating(0) 
    setReviewStep(0)
    setReviewData([])
  }
    useEffect(()=>{
      window.scrollTo(0,0);
        fetchData(BASE_URL+`/order-detail/?customer=${user.user.id}`);
      },[]);

  return(
        <div className="pb-4 pt-lg-4 pt-md-4">
         <div><Toaster /></div>
        <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12 col-sm-12 d-none d-md-block d-lg-block">
                  <Sidebar/>
                </div>
                <div className="col-lg-9 col-md-9 col-12 col-sm-12">
                <h4 className="text-heading text-center d-lg-none d-md-none my-3 mt-lg-0 mt-md-0">Past Orders</h4>
                  {
                    !loading?
                        orders.length?
                        orders.map(order=>{return(
                        <div key={order.order.id}>
                             <div className="row bg-white mb-3 g-2" key={order.order.id}>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                    <img src={order.order_items[0].product.product_imgs[0].image} className="img-fluid rounded-2" />
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                                 { order.order.payment_status===1&&
                                   <span className="float-end">
                                    <span>
                                    <small className="me-1 text-secondary" style={{fontSize:'10px'}}>Waiting for confirmation</small>
                                    <AccessTimeOutlinedIcon fontSize="small" className="text-warning"/>
                                    </span>
                                  </span>
                                }
                                { order.order.payment_status===2&&
                                  <span className="float-end">
                                    <span>
                                    <small className="me-1 text-secondary" style={{fontSize:'10px'}}>Wrapping your gift</small>
                                    <CardGiftcardRoundedIcon fontSize="small" className="text-pink"/>
                                    </span>
                                  </span>
                                }
                                { order.order.payment_status===3&&
                                  <span className="float-end">
                                    <a href={order.order.tracking_link} target="blank">
                                    <small className="me-1 text-secondary" style={{fontSize:'10px'}}>Shipped</small>
                                    <LocalShippingOutlinedIcon fontSize="small" className="text-warning"/>
                                    </a>
                                  </span>
                                }
                                { order.order.payment_status===4&&
                                  <span className="float-end">
                                    <span>
                                    <small className="me-1 text-secondary" style={{fontSize:'10px'}}>Delivered</small>
                                    <CheckCircleIcon fontSize="small" color="success"/>
                                    </span>
                                  </span>
                                }
                                { order.order.payment_status===5&&
                                  <span className="float-end">
                                    <span>
                                    <small className="me-1 text-secondary" style={{fontSize:'10px'}}>Order Failed</small>
                                    <CancelIcon fontSize="small" className="text-pink"/>
                                    </span>
                                  </span>
                                }
                                  <p className="fw-600 m-0 fs-14">{order.order_items[0].product.title.slice(0,35)}... 
                                  { order.order_items.length>1 ?
                                    <span>
                                      and {order.order_items.length} more items
                                      
                                    </span>
                                    :""
                                  }
                                  </p>
                                  <small className="text-secondary text-capitalize fs-12">{order.order.address} | {order.order.address_type==1&&"Home"}{order.order.address_type==2&&"Work"}{order.order.address_type==3&&"Other"}</small>
                                  <small className="text-secondary d-block fs-12">ORDER <mark style={{backgroundColor:'#fcf8e3'}}>#{order.order.id}</mark> | {order.order.order_time}</small>
                                  {
                                    order.order_items.map(product=>{return(
                                    <small key={product.product.id} className="d-block fs-12"> {product.product.title.slice(0,40)}... <span className="fw-bold">x {product.qty}</span> </small>
                                      )})
                                  }  
                                   <div className="d-none d-lg-block d-md-block">
                                    { order.order.payment_status===2?
                                      order.order.rating ?
                                               <div className="d-flex justify-content-end">
                                                 <Rating name="size-large" size="large" value={order.order.rating} readOnly />
                                               </div>                           
                                        :  
                                          <div className="d-flex justify-content-end">
                                            <p className="m-0 text-warning cursor-pointer fs-12" data-bs-toggle="modal" data-bs-target={`#${order.order.id}`}>Rate this item</p>
                                          </div> 
                                  :""
                                } 
                                    </div>
                                  <hr/>    
                                    {/* for deskop view */}
                                    <div className="d-none d-lg-block d-md-block">
                                      <div className="d-flex justify-content-between">
                                        <p className="fw-600">Total Paid: <span className="text-pink">₹ {order.order.order_total}</span></p>
                                        <div className="">
                                          <Link to='/contact-us' className="btn bg-outline-pink rounded-15 fs-12 fw-bold me-3"><SupportAgentOutlinedIcon fontSize="small"/>HELP</Link>
                                          <Link to={`/product/${order.order_items[0].product.title}/${order.order_items[0].product.id}`} className="btn btn-pink fs-12"><LoopOutlinedIcon fontSize="small"/>REORDER</Link>
                                        </div>
                                    </div>  
                                  </div>  
                                  {/* for mobile view */}
                                  <div className="d-lg-none d-md-none">
                                    <div className="d-flex justify-content-between">
                                        <p className="fw-600 fs-14">Total Paid: <span className="text-pink">₹ {order.order.order_total}</span></p>
                                         { order.order.payment_status===2?
                                            order.order.rating ?
                                                <div className="">
                                                  <Rating name="size-medium" value={order.order.rating} readOnly />
                                                </div>                           
                                              :  
                                                <div className="">
                                                  <p className="m-0 text-warning fs-12 cursor-pointer" data-bs-toggle="modal" data-bs-target={`#${order.order.id}`}>Rate this item</p>
                                                </div> 
                                        :""
                                        }
                                  </div>
                                      <div className="d-flex justify-content-between">
                                          <Link to='/contact-us' className="btn bg-outline-pink rounded-15 fs-12 fw-bold px-4 py-2"><SupportAgentOutlinedIcon fontSize="small"/>HELP</Link>
                                          <Link to={`/product/${order.order_items[0].product.title}/${order.order_items[0].product.id}`} className="btn btn-pink fs-12 py-2"><LoopOutlinedIcon fontSize="small"/>REORDER</Link>
                                      </div>
                                  </div>
                                </div>
                      </div>
                    {/*Modal for product rating */}
                        <div className="modal " id={order.order.id}>
                            <div className="modal-dialog modal-fullscreen" data-bs-backdrop="static">
                              <div className="modal-content">
                                {/* <!-- Modal Header --> */}
                                <div className="modal-header">
                                  <h4 className="modal-title text-heading">Write a Review ( {reviewStep+1}/{order.order_items.length} )</h4>
                                  <CloseIcon fontSize="small" className="cursor-pointer btn-close" data-bs-dismiss="modal"/>
                                </div>
                                {/* <!-- Modal body --> */}
                                <div className="modal-body">
                                <div className="">
                                  {reviewStep < order.order_items.length&&
                                  <>
                                        <div className="row">
                                          <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                                              <img src={order.order_items[reviewStep].product.product_imgs[0].image} className="img-fluid rounded-2" width="80" height="80"/>
                                          </div>
                                          <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                                              <h4 className="fs-14">{order.order_items[reviewStep].product.title}</h4>
                                          </div>
                                        </div>
                                        <div className="d-flex my-2">
                                            <Rating name="size-large" value={reviewRating} onChange={(e,newValue)=>{setReviewRating(newValue)}} size="large" className=""/>
                                            <img src={reviewRating?ratedImage[reviewRating]:rating} className="img-fluid" width="40" />
                                        </div>
                                        <div>
                                          <p className="fw-600 fs-14">Write your Review</p>
                                          <TextField
                                          className="bg-light"
                                           onChange={(e)=>{setReviewText(e.target.value)}}
                                           name="review"
                                           fullWidth
                                           label="Review"
                                           multiline={true}
                                           minRows={2}
                                           value={reviewText}
                                           InputLabelProps={{style: {fontSize: '14px'}}}
                                           />
                                           <div className="text-center mt-2">
                                             <small className="d-block text-secondary text-small">Your word makes YasGifts a better place.</small>
                                             <small className="d-block text-secondary text-small">You are the influence!</small>
                                           </div>
                                        </div>
                                    </>
                                      }
                                  </div>
                                </div>
                                <div className="modal-footer" style={{border:'none'}}>
                                  {reviewRating?
                                    reviewStep===(order.order_items.length-1)
                                    ?
                                    <button type="button" onClick={()=>{submitProductRating(order.order_items[reviewStep].product.id,order.order.id)}} className="btn btn-pink w-100 py-2 text-uppercase" data-bs-dismiss="modal">Submit your review</button>
                                    :
                                    <button type="button" onClick={()=>{addProductRating(order.order_items[reviewStep].product.id)}} className="btn btn-pink w-100 py-2 text-uppercase" >Next</button>
                                  :
                                  reviewStep===(order.order_items.length-1)
                                    ?
                                   <button type="button" className="btn btn-pink-disabled w-100 py-2 text-uppercase" >Submit your review</button>
                                    :
                                    <button type="button" className="btn btn-pink-disabled w-100 py-2 text-uppercase" >Next</button>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                        )})
                      :<div className="text-center fs-12"><small >No Order Items Found...!</small></div>
                  :
             <div className="text-center">
                <div className="spinner-border text-pink"></div>
              </div>
                  }
                </div>
              </div>
        </div>     
        </div>     
    )
}
export default Orders;