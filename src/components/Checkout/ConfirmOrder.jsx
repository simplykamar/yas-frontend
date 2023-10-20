import upi from '../../images/logos/upi.png'
import paymentmobile from '../../images/other/payment-process-mobile-min.png'
import paymentdesktop from '../../images/other/payment-process-desktop-min.png'
import yaslogo from '../../images/logos/yaslogo.png'
import Main from '../Loading/Main';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {removeFromCart,resetCart} from '../../redux/cartSlice';
import axios from 'axios';
import {useState,useEffect,useRef} from 'react';
import {clearOrder} from '../../redux/orderSlice';
import {useNavigate,useLocation} from 'react-router-dom';
import emptyCart from "../../images/other/emptycart.svg"
import { QRCode } from 'react-qrcode-logo';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import CheckIcon from '@mui/icons-material/Check';
import CollectionsIcon from '@mui/icons-material/Collections';

const ConfirmOrder = (props) => {
  const isNext = useLocation().state;
  const baseUrl = 'http://127.0.0.1:8000/api/';
  const dispatch =useDispatch();
  const [paymentMode, setPaymentMode] = useState('');
  const cartData = useSelector((state)=>state.cart.products);
  const user = useSelector((state)=>state.auth);
  const order = useSelector((state)=>state.order);
  const navigate = useNavigate();
  const [totalAmounts,setTotalAmounts] = useState(0)
  const [isFetching,setIsFetching] = useState(false);
  const [paymentUTRNumber,setPaymentUTRNumber] = useState('');
  const [paymentReciept,setPaymentReciept] = useState('');
  const [loading, setLoading] = useState(true);
  const closePaymentModal = useRef()

function vibrate(){
    if(!("vibrate" in navigator)){
       return;
  }
  navigator.vibrate(100);
}
function getCartTotalPrice(){
      let bodyData = new FormData();
      bodyData.append("cartData", JSON.stringify(cartData));
      bodyData.append("giftCard", JSON.stringify(order.giftCard.exist));
        axios.post(baseUrl+'cart-total-price/',bodyData,{headers:{"Content-Type": 'multipart/form-data',"Authorization" : `JWT ${user.access}`}})
          .then(response=>{
            setTotalAmounts(response.data.totalAmount)
          console.log(response)
          setLoading(false);
        })
        .catch(error=>{
          console.log(error);
          setLoading(false);
        })
      }

  function resetOrder(){
    console.log(isFetching)
      dispatch(resetCart());
      dispatch(clearOrder());
      setIsFetching(false);
      console.log('order Complete')
      navigate('/order-success',{replace:true,state:true});
  }

 const startPayment = async () => {
    console.log('in payment process')
    closePaymentModal.current.click()
    setIsFetching(true);
    let bodyData = new FormData();
    bodyData.append("cartData", JSON.stringify(cartData));
    bodyData.append("customer", JSON.stringify(user.user.id));
    bodyData.append("address", JSON.stringify(order.address));
    bodyData.append("giftCard", JSON.stringify(order.giftCard));
    bodyData.append("paymentReciept", paymentReciept);
    bodyData.append("paymentUTRNumber", JSON.stringify(paymentUTRNumber));

    await axios.post(`${baseUrl}pay/`,bodyData,{headers:{"Content-Type": 'multipart/form-data',"Authorization" : `JWT ${user.access}`}})
    .then(response=>{
      resetOrder()
      console.log(response)
    })
    .catch(error=>{
      setIsFetching(false);
      alert('server error!')
      console.log(error);
    })
}
 useEffect(() => {
    document.title="Checkout | Proceed to payment";
    window.scrollTo(0,0);
    window.process = {
      ...window.process,
    };
    getCartTotalPrice();
  }, []);
    return (
      <div className=" py-4 bg-light">
      <Main loading={isFetching}/>
      <div className="container">
        { cartData.length?
        <>
      <h4 className="text-center">Complete Your Payment</h4>
        <div className="stepper-wrapper">
            <div className="stepper-item completed">
              <div className="step-counter">
            <Link to="/checkout-step-1" className="text-white text-decoration-none text-pink">
              <CheckIcon className="text-pink"/>
              </Link>
              </div>
              <div className="step-name">
            <Link to="/checkout-step-1" className="text-decoration-none text-pink">
              Delivery Details
              </Link>
              </div>
            </div>
            <div className="stepper-item completed">
              <div className="step-counter">
            <Link to="/checkout-step-2" className="text-white text-decoration-none ">
              <CheckIcon className="text-pink"/>
              </Link>
              </div>
              <div className="step-name">
              <Link to="#" className="text-decoration-none text-pink">
              Order Summary
              </Link>
              </div>
            </div>
            <div className="stepper-item active">
              <div className="step-counter">
            <Link to="#" className="text-decoration-none text-pink">
              </Link>
              </div>
              <div className="step-name">
            <Link to="#" className="text-decoration-none text-pink">
              Payment
              </Link>
              </div>
            </div>
        </div>
        <div className="mt-3">
                <>
                {/* Desktop payment */}
                  <div className="d-none d-md-block d-lg-block">
                                 <div>
                                    <div className="row mt">
                                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                      <img src={paymentdesktop} className="img-fluid" style={{mixBlendMode:'multiply'}}/>
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-12 col-12 text-center mt-5">
                                      <h4 className="fw-bold">Scan QR Code</h4>
                                      {
                                        !loading?
                                        <>
                                        <div><small className="text-secondary">9634142017@paytm</small></div>
                                          <QRCode
                                              value={`upi://pay?pa=9634142017@paytm&pn=YasGifts&tn=YasGifts: Complete Your Order&am=${totalAmounts}&cu=INR`}
                                              size="200"
                                              logoImage={yaslogo}
                                              logoWidth="30"
                                              logoHeight="20"
                                              removeQrCodeBehindLogo={true}
                                              logoPadding={5}
                                              logoPaddingStyle="circle"

                                            />
                                          <div className="fw-bold" style={{backgroundColor:''}}>
                                            <p className="">Total Amount: <span className="ms-4 text-pink">₹ {totalAmounts}</span></p>
                                          </div>
                                          <p className="text-capitalize d-block fs-12 mt-5">Proceed only after successfull payment</p>
                                          <button className="btn btn-pink text-uppercase" data-bs-toggle="modal" data-bs-target="#paymentConfirmModal">confirm payment</button>

                                      </>
                                      :<div className="text-center py-4">
                                        <div className="spinner-border text-danger"></div>
                                      </div>
                                      }
                                      </div>
                                    </div>
                                 </div>
                   </div>
                   {/* mobile view */}
                   <div className="d-md-none d-lg-none">
                  <img src={paymentmobile} className="img-fluid" style={{mixBlendMode:'multiply'}}/>
                  {
                  !loading?
                  <div className="text-center">
                    <Button href={`upi://pay?pa=9634142017@paytm&pn=YasGifts&tn=Complete Your Order on YasGifts&am=${totalAmounts}&cu=INR`} className="w-75" variant="contained" style={{backgroundColor:'white'}} >
                  <img src={upi} className="img-fluid my-2" style={{height:'15px'}}/>
                  </Button>
                  <p className="text-capitalize d-block fs-12 mt-5">Proceed only after successfull payment</p>
                  </div>
                  :
                   <div className="text-center py-4">
                    <div className="spinner-border text-danger"></div>
                  </div>
                  }
                    <div className="text-center">
                      <button className="btn btn-pink w-50 py-1 fs-14" data-bs-toggle="modal" data-bs-target="#paymentConfirmModal">PROCEED</button>
                    </div>
                   </div>
                          {/* Payment  Confirmation*/}
                          <div className="modal" id="paymentConfirmModal" data-bs-backdrop="static">
                            <div className="modal-dialog">
                              <div className="modal-content">

                                {/* <!-- Modal Header --> */}
                                <div className="modal-header" style={{border:'none'}} >
                                  <CloseIcon fontSize="small" className="cursor-pointer btn-close" data-bs-dismiss="modal"/>
                                </div>

                                {/* <!-- Modal body --> */}
                                <div className="modal-body pt-0">
                                  <h5 className="text-center text-heading">Confirm your Payment!</h5>
                                   <p className="text-small px-3" style={{color:'#696969'}}>Click Confirm, Only after amount deduction from your account. We will manually verify your transaction. Are you sure?</p>
                                   <div className="d-flex justify-content-around">
                                   <Button variant="text" sx={{color:'#fc9aaa'}} data-bs-toggle="modal" className="fs-12 fw-bold" data-bs-target="#afterPaymentConfirmedModal">Proceed</Button>
                                   <Button variant="text" sx={{color:'#fc9aaa'}} data-bs-dismiss="modal" className="fs-12 fw-bold">Cancel</Button>
                                   </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* After Payment  */}
                          <div className="modal" id="afterPaymentConfirmedModal" data-bs-backdrop="static">
                            <div className="modal-dialog modal-fullscreen">
                              <div className="modal-content">

                                {/* <!-- Modal Header --> */}
                                <div className="modal-header" style={{border:'none'}} >
                                  <span ref={closePaymentModal} data-bs-dismiss="modal" className="cursor-pointer btn-close">
                                  </span>
                                  {/* <CloseIcon fontSize="small" className="cursor-pointer btn-close" data-bs-dismiss="modal"/> */}
                                </div>

                                {/* <!-- Modal body --> */}
                                <div className="modal-body pt-0">
                                  <h5 className="text-center text-heading">Varify your Payment!</h5>
                                   <div className="my-3">
                                      <div className="text-center">
                                      <label htmlFor="paymentReciept" 
                                             className="form-label fs-12">
                                             Upload your payment reciept
                                      </label>
                                      </div>
                                      <div className="d-flex justify-content-center">
                                        <div className="w-75 rounded-2" style={{border:'2px dotted gray'}}>
                                          {paymentReciept &&
                                          <span className="d-flex justify-content-end"><small className="cursor-pointer mx-2 fs-12 text-danger" onClick={()=>{setPaymentReciept('')}}>Remove</small></span>
                                          }
                                          <div className="text-center p-2 text-secondary " style={{fontSize:'10px'}}>
                                            {paymentReciept
                                            ?
                                            <>
                                              <img src={URL.createObjectURL(paymentReciept)} className="img-fluid" style={{width:'50px',height:'50px'}}/>
                                              <small className="d-block" >{paymentReciept.name} <CheckIcon color="success"/></small>
                                            </>
                                            :
                                            <>
                                            <CollectionsIcon style={{color:'#fc7e93'}} fontSize="large"/>
                                            <small className="d-block text-pink">No Image select</small>
                                            </>
                                          }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mt-3 d-flex justify-content-around">
                                          <Button variant="outlined" className="btn btn-mui-pink text-uppercase py-1"  component="label">
                                            Browse
                                            <input hidden accept="image/*" type="file" name="paymentReciept" onChange={(e)=>{setPaymentReciept(e.target.files[0]);console.log(e.target.files[0])}}/>
                                           </Button>
                                          {
                                            paymentReciept
                                            ?
                                            <button className="btn btn-pink text-uppercase py-1" onClick={startPayment} >Submit</button>
                                            :
                                            <button className="btn btn-danger rounded-15 fw-bold text-uppercase py-1" disabled={true}>Submit</button>
                                          }


                                      </div>
                                  </div>
                                  <p className="text-center fw-bold">OR</p>
                                  <div className="d-flex justify-content-center">
                                    <div className="my-3 w-75">
                                      <TextField
                                      InputProps={{ inputProps: { min: 0 } }}
                                     color="error"
                                     type="number"
                                     fullWidth
                                     onChange={(e)=>{setPaymentUTRNumber(e.target.value)}}
                                     name="paymentUTRNumber"
                                     label="Enter Your Payment UPI No"
                                     size="small"
                                     InputLabelProps={{style: {fontSize: '14px'}}}
                                     />
                                   </div>
                                 </div>
                                 <div className="mt-3 ">
                                     <div className="text-end w-75 ms-5" >
                                      {
                                      paymentUTRNumber
                                      ?
                                      <button className="btn btn-pink text-uppercase py-1" onClick={startPayment} >Submit</button>
                                      :
                                      <button className="btn btn-danger rounded-15 fw-bold text-uppercase py-1" disabled={true} >Submit</button>
                                      }
                                     </div>
                                   </div>
                                </div>
                              </div>
                            </div>
                          </div>
              </>
        </div>
        </>
      :
       <div className="text-secondary text-center">
                <p className="">Your <span className="text-pink">Gift Box</span> Looks Empty!</p>
               <img src={emptyCart} className="img-fluid"/>
             </div>       
        }  
        </div>
        </div>
      )
}

export default ConfirmOrder;