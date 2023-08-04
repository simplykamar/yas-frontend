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

const Orders = () => {
  const BASE_URL = 'https://yasonlinegifting.pythonanywhere.com/api';
  const [orders,setorders] = useState([]);
  const [loading,setLoading] = useState(true);
  const user= useSelector((state)=>state.auth);

  const fetchData = (url) => {
          axios.get(url)
            .then(response=>{
              setorders(response.data);
              console.log(response.data);
              setLoading(false);
            })
            .catch(error=>{
              console.log(error);
            });
    }

    useEffect(()=>{
      window.scrollTo(0,0);
        fetchData(BASE_URL+`/order-detail/?customer=${user.user.id}`);
        console.log("test");
      },[]);
  return(
        <div className="bg-light pb-4 pt-lg-4 pt-md-4">
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

                                  <p className="fw-600 m-0">{order.order_items[0].product.title.slice(0,20)}... 
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
                                  
                                  <hr/>
                                  <div className="d-flex justify-content-between">
                                    <p className="fw-600">Total Paid: <span className="text-danger">₹{order.order.order_total}</span></p>
                                    <div className="d-none d-lg-block d-md-block">
                                      <button className="btn text-danger border-pink me-4 px-4"><SupportAgentOutlinedIcon/>HELP</button>
                                      <button className="btn btn-danger"><LoopOutlinedIcon/>REORDER</button>
                                    </div>
                                  </div>
                                  <div className="d-lg-none d-md-none">
                                      <div className="d-flex justify-content-between">
                                          <button className="btn text-danger border-pink px-4"><SupportAgentOutlinedIcon/>HELP</button>
                                          <button className="btn btn-danger"><LoopOutlinedIcon/>REORDER</button>
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