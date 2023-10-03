import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {removeFromCart,resetCart} from '../../redux/cartSlice';
import axios from 'axios';
import {useState,useEffect} from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {clearOrder} from '../../redux/orderSlice';
import {useNavigate,useLocation} from 'react-router-dom';
import emptyCart from "../../images/other/emptycart.svg"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { QRCode } from 'react-qrcode-logo';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckIcon from '@mui/icons-material/Check';
import CollectionsIcon from '@mui/icons-material/Collections';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import upi from '../../images/logos/upi.png'
import paymentmobile from '../../images/other/payment-process-mobile-min.png'
import paymentdesktop from '../../images/other/payment-process-desktop-min.png'
import yaslogo from '../../images/logos/yaslogo.png'

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

    console.log(order.giftCard.exist)
   
   function vibrate(){
    if(!("vibrate" in navigator)){
       return;
  }
  navigator.vibrate(100);
}
 // function inputHandler(event){
 //  setPaymentInfo({...paymentInfo,[event.target.name]:event.target.value});
 //  console.log(event.target.files[0])
 // }
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
 useEffect(() => {
      document.title="Checkout | Proceed to payment";
      if(!isNext){
      navigate("/page-not-found",{replace:true});
    }
      window.scrollTo(0,0);
    window.process = {
      ...window.process,
    };
    getCartTotalPrice();
  }, []);
  function resetOrder(){
      dispatch(resetCart());
      dispatch(clearOrder());
      setIsFetching(false);
      navigate('/order-success',{replace:true,state:true});
  }

 const startPayment = async () => {
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
      console.log(response)
    })
    .catch(error=>{
      console.log(error);
    })
    // const data = await axios({
    //   url: `${baseUrl}pay/`,
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "Authorization" : `JWT ${user.access}`
    //   },
    //   data: bodyData,
    // }).then((res) => {
    //   return res;
    // });
}
    return (
      <div className=" py-4 bg-light">
      <div className="container">
        { cartData.length?
        <>
      <h4 className="text-center">Complete Your Payment</h4>
        <div className="stepper-wrapper">
            <div className="stepper-item completed">
              <div className="step-counter">
            <Link to="/checkout-step-1" className="text-white text-decoration-none text-dark">
              <CheckIcon className="text-dark"/>
              </Link>
              </div>
              <div className="step-name">
            <Link to="/checkout-step-1" className="text-decoration-none text-dark">
              Delivery Details
              </Link>
              </div>
            </div>
            <div className="stepper-item completed">
              <div className="step-counter">
            <Link to="/checkout-step-2" className="text-white text-decoration-none ">
              <CheckIcon className="text-dark"/>
              </Link>
              </div>
              <div className="step-name">
              <Link to="/checkout-step-2" className="text-decoration-none text-dark">
              Order Summary
              </Link>
              </div>
            </div>
            <div className="stepper-item active">
              <div className="step-counter">
            <Link to="#" className="text-secondary text-decoration-none text-dark">
              </Link>
              </div>
              <div className="step-name">
            <Link to="#" className="text-secondary text-decoration-none text-secondary">
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
                                      <h2 className="fw-bold">Scan QR Code</h2>
                                      {
                                        !loading?
                                        <>
                                        <div><small className="text-secondary">9634142017@paytm</small></div>
                                          <QRCode
                                              value={`upi://pay?pa=9634142017@paytm&pn=YasGifts&tn=YasGifts: Complete Your Order&am=${totalAmounts}&cu=INR`}
                                              size="200"
                                              logoImage={yaslogo}
                                              logoWidth="30"
                                              logoHeight="30"
                                              removeQrCodeBehindLogo={true}
                                              logoPadding={5}
                                              logoPaddingStyle="circle"

                                            />
                                          <div className="fw-bold" style={{backgroundColor:''}}>
                                            <p className="">Total Amount: <span className="ms-4">₹ {totalAmounts}</span></p>
                                          </div>
                                          <Button color="success"  variant="contained" className="px-5 py-2 fw-bold rounded-15" data-bs-toggle="modal" data-bs-target="#paymentConfirmModal">Confirm Payment</Button>
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
                  <Button href={`upi://pay?pa=9634142017@paytm&pn=YasGifts&tn=Complete Your Order on YasGifts&am=${totalAmounts}&cu=INR`} fullWidth variant="contained" style={{backgroundColor:'white'}} >
                  <img src={upi} className="img-fluid my-2" style={{height:'30px'}}/>
                  </Button>
                  :
                   <div className="text-center py-4">
                    <div className="spinner-border text-danger"></div>
                  </div>
                  }
                   <Button color="secondary" variant="contained" className="mt-3 w-100 py-3 fw-bold" data-bs-toggle="modal" data-bs-target="#paymentConfirmModal">Proceed</Button>
                   </div>
                          {/* Payment  Confirmation*/}
                          <div className="modal" id="paymentConfirmModal" data-bs-backdrop="static">
                            <div className="modal-dialog">
                              <div className="modal-content">

                                {/* <!-- Modal Header --> */}
                                <div className="modal-header" style={{border:'none'}} >
                                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                {/* <!-- Modal body --> */}
                                <div className="modal-body pt-0">
                                  <h5 className="text-center">Confirm your Payment!</h5>
                                   <small className="text-danger text-small">Click Confirm, Only after amount deduction from your account. We will manually verify your transaction. Are you sure?</small>
                                   <div className="text-end">
                                   <Button variant="text" data-bs-toggle="modal" data-bs-target="#afterPaymentConfirmedModal">Proceed</Button>
                                   <Button variant="text" data-bs-dismiss="modal">Cancel</Button>
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
                                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                {/* <!-- Modal body --> */}
                                <div className="modal-body pt-0">
                                  <h5 className="text-center">Varify your Payment!</h5>
                                   <div className="my-3">
                                      <label htmlFor="paymentReciept" 
                                             className="form-label">
                                             Upload your payment reciept
                                      </label>
                                      <div className="" style={{border:'2px dotted gray'}}>
                                        {paymentReciept &&
                                        <span className="d-flex justify-content-end"><small className="cursor-pointer mx-2 text-danger" onClick={()=>{setPaymentReciept('')}}>Remove</small></span>
                                        }
                                        <div className="text-center py-4 ">
                                          {paymentReciept
                                          ?
                                          <>
                                            <img src={URL.createObjectURL(paymentReciept)} className="img-fluid" style={{width:'50px',height:'50px'}}/>
                                            <small className="d-block" style={{fontSize:'12px'}}>{paymentReciept.name} <CheckIcon color="success"/></small>
                                          </>
                                          :
                                          <>
                                          <CollectionsIcon color="primary" fontSize="large"/>
                                          <small className="d-block text-danger" style={{fontSize:'12px'}}>No Image select</small>
                                          </>
                                        }
                                        </div>

                                      </div>
                                      <div className="mt-3 ">
                                      <div className="text-end">
                                          <Button variant="outlined" className="py-2 rounded-15" component="label">
                                          Browse
                                          <input hidden accept="image/*" type="file" name="paymentReciept" onChange={(e)=>{setPaymentReciept(e.target.files[0]);console.log(e.target.files[0])}}/>
                                         </Button>
                                         </div>
                                      </div>
                                  </div>
                                  <p className="text-center fw-bold">OR</p>
                                  <div className="my-3">
                                    <TextField
                                   color="error"
                                   type="number"
                                   onChange={(e)=>{setPaymentUTRNumber(e.target.value)}}
                                   name="paymentUTRNumber"
                                   fullWidth
                                   label="Enter Your Payment UPI Ref No."
                                   />
                                 </div>
                                 <div className="mt-3">
                                     <div className="text-end">
                                     {
                                      (!paymentReciept && paymentUTRNumber)
                                      &&
                                     <button className="btn btn-success fw-bold py-2 rounded-15" onClick={startPayment} >Submit</button>
                                      }
                                      {
                                      (paymentReciept && !paymentUTRNumber)
                                      &&
                                     <button className="btn btn-success fw-bold py-2 rounded-15" onClick={startPayment} >Submit</button>
                                      }
                                      {
                                      (paymentReciept && paymentUTRNumber)
                                     &&
                                     <>
                                     <small className="text-danger">either upload your payment reciept or enter your UPI Ref no.</small>
                                      </>
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
        <div className="text-secondary text-center mt-5">
                <h4 className="">Your <span className="text-danger">Gift Box</span> Looks Empty!</h4>
               <img src={emptyCart} className="img-fluid"/>
             </div>        
        }  
        </div>
        </div>
      )
}

export default ConfirmOrder;