import Sidebar from './Sidebar'
import {Link} from 'react-router-dom';
import img from '../../images/logos/yaslogo.png'
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {useState,useEffect} from 'react';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

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
        fetchData(BASE_URL+`/order-detail/?customer=${user.user.id}`);
        console.log("test");
      },[]);
  return(
        <div className="container-fluid">
            <div className="mt-4">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12 col-sm-12">
                  <Sidebar/>
                </div>
                <div className="col-lg-9 col-md-9 col-12 col-sm-12 p-5 bg-light">
                  {
                    !loading?
                        orders.length?
                        orders.map(order=>{return(
                             <div className="row bg-white" key={order.order.id}>
                                <div className="col-lg-2 col-md-2 col-sm-12 col-12">
                                    <img src={img} className="img-fluid" />
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-12 col-12 py-3">
                                 { order.order.isPaid?
                                  <span className="float-end">
                                    <CheckCircleOutlineOutlinedIcon color="success"/>
                                  </span>
                                  :
                                  <span className="float-end">
                                    <CancelOutlinedIcon className="text-danger"/>
                                  </span>
                                }

                                  <p className="fw-600">{order.order_items[0].product.title.slice(0,20)}... 
                                  { order.order_items.length>1 ?
                                    <span>
                                      and {order.order_items.length} more items
                                      
                                    </span>
                                    :""
                                  }
                                  </p>

                                  <small className="text-secondary text-capitalize">{order.order.address.address}</small>
                                  <small className="text-secondary d-block">ORDER <mark style={{backgroundColor:'#fcf8e3'}}>#{order.order.id}</mark> | {order.order.order_time}</small>
                                  {
                                    order.order_items.map(product=>{return(
                                    <small key={product.product.id} className="d-block"> {product.product.title.slice(0,40)}... x {product.qty} </small>
                                      )})
                                  }
                                  
                                  <hr/>
                                  <div className="d-flex justify-content-between">
                                    <p className="fw-600">Total Paid: <span className="text-danger">₹{order.order.order_total}</span></p>
                                    <div>
                                      <button className="btn btn-outline-danger me-4"><SupportAgentOutlinedIcon/>REORDER</button>
                                      <button className="btn btn-danger"><LoopOutlinedIcon/>REORDER</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                        )})

                      :"No Order Items Found...!"
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