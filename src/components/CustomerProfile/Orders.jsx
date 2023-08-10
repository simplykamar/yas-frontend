import Sidebar from './Sidebar'
import {Link} from 'react-router-dom';
import img from '../../images/logos/yaslogo.png'
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {useState,useEffect} from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Rating from '@mui/material/Rating';
import toast, { Toaster } from 'react-hot-toast';
import rating from '../../images/other/rating.png'
import rating1 from '../../images/other/rating/1.png'
import rating2 from '../../images/other/rating/2.png'
import rating3 from '../../images/other/rating/3.png'
import rating4 from '../../images/other/rating/4.png'
import rating5 from '../../images/other/rating/5.png'

  const Orders = () => {
    const BASE_URL = 'https://yasonlinegifting.pythonanywhere.com/api/';
    const [orders,setorders] = useState([]);
    const [loading,setLoading] = useState(true);
    const user= useSelector((state)=>state.auth);
    const [orderRating, setOrderRating] = useState(0)
    const notifySuccess = (text) => toast.success(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
    const notifyError = (text) => toast.error(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});

    const ratedLabels = {
           1: 'very bad',
           2: 'bad',
           3: 'average',
           4: 'Good',
           5: 'loved it',
      };
       const ratedImage = {
           0: rating,
           1: rating1,
           2: rating2,
           3: rating3,
           4: rating4,
           5: rating5,
      };
  const fetchData = (url) => {
          axios.get(url,{headers:{"Authorization" : `JWT ${user.access}`}})
            .then(response=>{
              setorders(response.data);
              console.log(response.data);
              setLoading(false);
            })
            .catch(error=>{
              console.log(error);
            });
    }
  async function addProductRating(orderID){
    const formData = new FormData();
    formData.append('rating',orderRating)
    await axios.patch(BASE_URL+`/customer-order-rating/${orderID}`,formData,{headers:{"Authorization":`JWT ${user.access}`}})
    .then(response=>{
      notifySuccess('Rating submit')
      fetchData(BASE_URL+`/order-detail/?customer=${user.user.id}`)
      console.log(response)
    })
    .catch(err=>{
      notifyError('Error! try again..')
      console.log(err)
    })
  }
    useEffect(()=>{
      window.scrollTo(0,0);
        fetchData(BASE_URL+`/order-detail/?customer=${user.user.id}`);
        console.log("test");
      },[]);

  return(
        <div className="bg-light pb-4 pt-lg-4 pt-md-4">
         <div><Toaster /></div>
        <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12 col-sm-12 d-none d-md-block d-lg-block">
                  <Sidebar/>
                </div>
                <div className="col-lg-9 col-md-9 col-12 col-sm-12">
                <p className="mt-2" style={{fontSize:'24px'}}>Past Orders</p>
                  {
                    !loading?
                        orders.length?
                        orders.map(order=>{return(
                             <div className="row bg-white mt-3" key={order.order.id}>
                                <div className="col-lg-2 col-md-2 col-sm-12 col-12 text-center">
                                    <img src={img} className="img-fluid" width="80" height="80"/>
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-12 col-12 py-lg-3 py-md-3 pb-2">
                                 { order.order.isPaid?
                                  <span className="float-end">
                                    <CheckCircleIcon color="success"/>
                                  </span>
                                  :
                                  <span className="float-end">
                                    <CancelIcon className="text-danger"/>
                                  </span>
                                }

                                  <p className="fw-600 m-0">{order.order_items[0].product.title.slice(0,30)}... 
                                  { order.order_items.length>1 ?
                                    <span>
                                      and {order.order_items.length} more items
                                      
                                    </span>
                                    :""
                                  }
                                  </p>

                                  <small className="text-secondary text-capitalize">{order.order.address.address} | {order.order.address.address_type==1&&"Home"}{order.order.address.address_type==2&&"Work"}{order.order.address.address_type==3&&"Other"}</small>
                                  <small className="text-secondary d-block">ORDER <mark style={{backgroundColor:'#fcf8e3'}}>#{order.order.id}</mark> | {order.order.order_time}</small>
                                  {
                                    order.order_items.map(product=>{return(
                                    <small key={product.product.id} className="d-block"> {product.product.title.slice(0,40)}... <span className="fw-bold">x {product.qty}</span> </small>
                                      )})
                                  }  
                                  
                                   <div className="d-none d-lg-block d-md-block">
                                    { order.order.isPaid?
                                      order.order.rating ?
                                               <div className="d-flex justify-content-end">
                                                 <Rating name="size-large" size="large" value={order.order.rating} readOnly />
                                               </div>                           
                                           
                                        :  
                                          <div className="d-flex justify-content-end">
                                            <p className="m-0 text-warning fw-600 cursor-pointer" data-bs-toggle="modal" data-bs-target={`#${order.order.id}`}>Rate this item</p>
                                          </div> 
                                  :""
                                } 
                                    </div>
                                                     
                                  <hr/>             
                                    <div className="d-none d-lg-block d-md-block">
                                      <div className="d-flex justify-content-between">
                                        <p className="fw-600">Total Paid: <span className="text-danger">₹{order.order.order_total}</span></p>
                                        <div className="">
                                          <button className="btn text-danger border-pink me-4 px-4"><SupportAgentOutlinedIcon/>HELP</button>
                                          <button className="btn btn-danger"><LoopOutlinedIcon/>REORDER</button>
                                        </div>
                                    </div>  
                                  </div>  
                                  <div className="d-lg-none d-md-none">
                                    <div className="d-flex justify-content-between">
                                        <p className="fw-600">Total Paid: <span className="text-danger">₹{order.order.order_total}</span></p>
                                         { order.order.isPaid?
                                            order.order.rating ?
                                                <div className="">
                                                  <Rating name="size-medium" value={order.order.rating} readOnly />
                                                </div>                           
                                              :  
                                                <div className="">
                                                  <p className="m-0 text-warning fw-600 cursor-pointer" data-bs-toggle="modal" data-bs-target={`#${order.order.id}`}>Rate this item</p>
                                                </div> 
                                        :""
                                        }
                                  </div>
                                      
                                      <div className="d-flex justify-content-between">
                                          <button className="btn text-danger border-pink px-4"><SupportAgentOutlinedIcon/>HELP</button>
                                          <button className="btn btn-danger"><LoopOutlinedIcon/>REORDER</button>
                                      </div>
                                  </div>
                                </div>
                                {/*Modal for product rating */}
                        <div className="modal" id={order.order.id}>
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">

                                {/* <!-- Modal Header --> */}
                                <div className="modal-header">
                                  <h4 className="modal-title">Rate Your Order</h4>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                {/* <!-- Modal body --> */}
                                <div className="modal-body text-center h-50">
                                <h2 className="text-uppercase">{ratedLabels[orderRating]}</h2>
                                <img src={ratedImage[orderRating]} className="img-fluid w-50" style={{maxHeight:'160px'}}/>
                                  <div>                                
                                    <Rating name="size-large" value={orderRating} onChange={(e,newValue)=>{setOrderRating(newValue)}} size="large" className="mt-3 d-inline-block"/>
                                  </div>
                                </div>

                                {/* <!-- Modal footer --> */}
                                <div className="modal-footer">
                                  <button type="button" onClick={()=>{addProductRating(order.order.id)}} className="btn btn-danger w-100 py-2 text-uppercase" data-bs-dismiss="modal">Submit your feedback</button>
                                </div>

                              </div>
                            </div>
                          </div>

                              </div>
                        )})

                      :<div className="text-center"><small >No Order Items Found...!</small></div>
                  :
             <div className="text-center">
                <div className="spinner-border text-danger"></div>
              </div>
                  }
                </div>
              </div>
        </div>     
        </div>     
    )
}
export default Orders;