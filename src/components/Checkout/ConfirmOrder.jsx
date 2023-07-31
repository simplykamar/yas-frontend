import img from '../../demo.png';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {removeFromCart,resetCart} from '../../redux/cartSlice';
import axios from 'axios';
import {useState,useEffect} from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {clearOrder} from '../../redux/orderSlice';
import {useNavigate} from 'react-router-dom';
const ConfirmOrder = (props) => {
  const baseUrl = 'http://127.0.0.1:8000/api/';
  const dispatch =useDispatch();
  const [paymentMode, setPaymentMode] = useState('');
  const cartData = useSelector((state)=>state.cart.products);
  const user = useSelector((state)=>state.auth);
  const order = useSelector((state)=>state.order);
  const navigate = useNavigate();
  const totalAmounts = cartData.reduce((sum,item)=>{return sum+(item.price*item.quantity)},0)

 useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  function resetOrder(){
      dispatch(resetCart());
      dispatch(clearOrder());
      console.log("in reset Order");
      navigate('/order-success',{replace:true});
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
        },
      })
        .then((res) => {
          console.log("Everything is OK!",res);
          resetOrder();
          // setName("");
          // setAmount("");

        })
        .catch((err) => {
          console.log(err);
          console.log("in payment error")
        });
    } catch (error) {
      console.log(error);
    }
  };

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };


 const showRazorpay = async () => {
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
      },
      data: bodyData,
    }).then((res) => {
        console.log(res)
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
      image: "https://raw.githubusercontent.com/simplykamar/simplykamar.github.io/main/img/logo-removebg-preview.png", // add image url
      order_id: data.data.payment.id,
      handler: function (response) {
        console.log("razor pay response",response)
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
  };

    return (
      <div className=" py-5 bg-light">
      <div className="container">
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
            <Link to="#" className="text-white text-decoration-none">
              2
              </Link>
              </div>
              <div className="step-name">Order Summary</div>
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
        <button className="btn btn-danger" onClick={showRazorpay}> MAKE PAYMENT</button>
        </div>
        </div>
        </div>
      )
}

export default ConfirmOrder;