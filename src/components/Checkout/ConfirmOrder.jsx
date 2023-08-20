import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {removeFromCart,resetCart} from '../../redux/cartSlice';
import axios from 'axios';
import {useState,useEffect} from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {clearOrder} from '../../redux/orderSlice';
import {useNavigate} from 'react-router-dom';
import emptyCart from "../../images/other/emptycart.svg"

const ConfirmOrder = (props) => {
  const baseUrl = 'http://3.25.71.133/api/';
  const dispatch =useDispatch();
  const [paymentMode, setPaymentMode] = useState('');
  const cartData = useSelector((state)=>state.cart.products);
  const user = useSelector((state)=>state.auth);
  const order = useSelector((state)=>state.order);
  const navigate = useNavigate();
  const totalAmounts = cartData.reduce((sum,item)=>{return sum+(item.price*item.quantity)},0)
  const [isFetching,setIsFetching] = useState(false);
   
   function vibrate(){
    if(!("vibrate" in navigator)){
       return;
  }
  navigator.vibrate(100);
}

 useEffect(() => {
      document.title="Checkout | Proceed to payment";
      window.scrollTo(0,0);
    window.process = {
      ...window.process,
    };
  }, []);
  function resetOrder(){
      dispatch(resetCart());
      dispatch(clearOrder());
      navigate('/order-success',{replace:true,state:true});
      setIsFetching(false);
  }

  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();
      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));
      await axios({
        url: `${baseUrl}payment/success/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization" : `JWT ${user.access}`
        },
      })
        .then((res) => {
          resetOrder();
          // setName("");
          // setAmount("");

        })
        .catch((err) => {
          alert(" payment error")
        });
    } catch (error) {
          alert(" payment error")
    }
  };

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };


 const showRazorpay = async () => {
    setIsFetching(true);
    const res = await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data

    bodyData.append("cartData", JSON.stringify(cartData));
    bodyData.append("customer", JSON.stringify(user.user.id));
    bodyData.append("address", JSON.stringify(order.address));
    bodyData.append("orderTotal", JSON.stringify(totalAmounts));


    const data = await axios({
      url: `${baseUrl}pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization" : `JWT ${user.access}`
      },
      data: bodyData,
    }).then((res) => {
      return res;
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    var options = {
      key_id: 'rzp_test_rbye7jVIyuD28d', // in react your environment variable must start with REACT_APP_
      key_secret: 'RKVPp5mEedHmYzf2CujT5Fab',
      // amount: data.data.payment.amount,
      currency: "INR",
      name: "yas online gifting",
      description: "please make a payment",
      image: "https://images2.imgbox.com/3e/24/Vt07a54A_o.png", // add image url
      order_id: data.data.payment.id,
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    setIsFetching(false);    

  };

    return (
      <div className=" py-4 bg-light">
      <div className="container">
        { cartData.length?
        <>
      <h4 className="text-center">Proceed to payment</h4>
        <div className="stepper-wrapper">
            <div className="stepper-item completed">
              <div className="step-counter">
            <Link to="/checkout-step-1" className="text-white text-decoration-none">
              1
              </Link>
              </div>
              <div className="step-name">
            <Link to="/checkout-step-1" className="text-decoration-none">
              Delivery Details
              </Link>
              </div>
            </div>
            <div className="stepper-item completed">
              <div className="step-counter">
            <Link to="/checkout-step-2" className="text-white text-decoration-none">
              2
              </Link>
              </div>
              <div className="step-name">
              <Link to="/checkout-step-2" className="text-decoration-none">
              Order Summary
              </Link>
              </div>
            </div>
            <div className="stepper-item active">
              <div className="step-counter">
            <Link to="#" className="text-secondary text-decoration-none">
              3
              </Link>
              </div>
              <div className="step-name">
            <Link to="#" className="text-secondary text-decoration-none">
              Payment
              </Link>
              </div>
            </div>
        </div>
        <div className="text-center mt-5">
        {
                isFetching?
                  <button className="btn btn-danger" disabled>
                      <span className="spinner-border spinner-border-sm"> </span>
                       Loading..
                    </button>
                :
        <button className="btn btn-danger px-5 py-2" onClick={()=>{vibrate();showRazorpay()}}>MAKE PAYMENT</button>
              }

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