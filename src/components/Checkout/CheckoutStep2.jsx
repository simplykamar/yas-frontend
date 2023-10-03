import {Link,NavLink,useNavigate,useLocation} from 'react-router-dom'
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import {useState,useEffect} from 'react';
import axios from 'axios';
import './Checkout.css';
import {useSelector, useDispatch} from 'react-redux';
import {addToOrder} from '../../redux/orderSlice';
import CardGiftcardTwoToneIcon from '@mui/icons-material/CardGiftcardTwoTone';
import {resetCart} from '../../redux/cartSlice'
import emptyCart from "../../images/other/emptycart.svg"
import giftcard from "../../images/other/giftcard.jpg"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CheckIcon from '@mui/icons-material/Check';

const CheckoutStep2 = () => {
	const isNext = useLocation().state;
	const [alignment, setAlignment] = useState('web');
  	const BASE_URL = 'https://simplykamar.tech/api';
	const [loading, setLoading] = useState(true);
  	const user = useSelector((state)=>state.auth);
  	const order = useSelector((state)=>state.order);
  	const cartData = useSelector((state)=>state.cart.products);
	const [msg, setMsg] = useState(false);
	const [msgContent, setMsgContent] = useState('');
	const [msgTitle, setMsgTitle] = useState('');
	const sum=0;
  	const totalProducts = cartData.reduce((sum,item)=>{return sum+item.quantity},0)
  	const totalAmounts = cartData.reduce((sum,item)=>{return sum+(item.price*item.quantity)},0)
  	const dispatch = useDispatch();
  	const navigate = useNavigate();

 	useEffect(()=>{
      document.title="Checkout | Order Summary";
      if(!isNext){
			navigate("/page-not-found",{replace:true});
		}
      window.scrollTo(0,0);
 		if(!order.address){
 			navigate('/checkout-step-1', {replace:true})
 		}
 	},[])

	function proceedPayment(){
		dispatch(addToOrder({giftCard:{exist:msg,title:msgTitle,msg:msgContent}}))
    navigate("/confirm-order",{replace:true,state:true});

	}
  	function cardClickHandler(cardType){
  		const generalGiftMsg = `To,
XYZ

It's hard to find someone who inspires you each day. Thank you for that. Here's a gesture of my gratitude and love.


From
${user.user.user.name.toUpperCase()}`
  		const birthadayMsg = `To,
XYZ

You had my back, even behind my back. Friends like you are hard to come by. Here's wishing you the happiest birthday, my buddy!


From
${user.user.user.name.toUpperCase()}`
  		const anniversaryMsg = `To,
XYZ

Happy anniversary! May you celebrate many more years of togetherness, withstanding the tests of time to emerge stronger and happier.


From
${user.user.user.name.toUpperCase()}`
  		const weddingMsg = `To,
XYZ

Wishing you both lots of love and happiness, on this exciting and joyful day of your life.


From
${user.user.user.name.toUpperCase()}`
  		const houseMsg = `To,
XYZ

With love, you continue to turn a new house into a home. Congratulations on your home sweet home. It's sure to welcome abundance and joy.


From
${user.user.user.name.toUpperCase()}
  		`
  		switch(cardType){
  			case 1: 
  				setMsgContent(generalGiftMsg);
  				break;
  			case 2: 
  				setMsgContent(birthadayMsg);
  				break;
  			case 3: 
  				setMsgContent(anniversaryMsg);
  				break;
  			case 4: 
  				setMsgContent(weddingMsg);
  				break;
  			case 5: 
  				setMsgContent(houseMsg);
  				break;

  		}
  	}
  	function handleCardChange(e){
  		setAlignment(e.target.value)
  		setMsgTitle(e.target.value)
  		console.log(msgContent)
  	}
	return(
		<div className=" py-3 bg-light">
			<div className="container">
			{ cartData.length?
			  <>
			<h4 className="text-center">Checkout</h4>
				<div className="stepper-wrapper">
					  <div className="stepper-item completed">
					    <div className="step-counter">
					  <Link to="/checkout-step-1" className="text-decoration-none">
					   <CheckIcon className="text-dark"/>
					    </Link>
					    </div>
					    <div className="step-name">
					  <Link to="/checkout-step-1" className="text-decoration-none text-dark">
					    Delivery Details
					    </Link>
					    </div>
					  </div>
					  <div className="stepper-item active">
					    <div className="step-counter">
					  <Link to="#" className="text-decoration-none text-secondary">
					    </Link>
					    </div>
					    <div className="step-name  text-secondary">Order Summary</div>
					  </div>
					  <div className="stepper-item ">
					    <div className="step-counter">
					  <Link to="#" className="text-secondary text-decoration-none">
					    </Link>
					    </div>
					    <div className="step-name">
					  <Link to="#" className="text-secondary text-decoration-none">
					    Payment
					    </Link>
					    </div>
					  </div>
				</div>
			<div className="row g-4">
				<div className="col-lg-8 col-md-8 col-sm-12 col-12 ">
				<div className="bg-white p-4">
					<p className="fw-600">Message Card <CardGiftcardTwoToneIcon color="warning"/></p><hr/>
					<div className="table-responsive ">
						<div className=" ">
						<ToggleButtonGroup
					 	  sx={{gap:1}}
					      color="secondary"
					      value={alignment}
					      size="small"
					      exclusive
					      onChange={handleCardChange}
					      aria-label="Platform"
					    >
					      <ToggleButton sx={{fontSize:'14px',lineHeight:1}} onClick={()=>cardClickHandler(1)} value="General Gifting">General Gifting</ToggleButton>
					      <ToggleButton sx={{fontSize:'14px',lineHeight:1}} onClick={()=>cardClickHandler(2)} value="Birthday">Birthday</ToggleButton>
					      <ToggleButton sx={{fontSize:'14px',lineHeight:1}} onClick={()=>cardClickHandler(3)} value="Anniversary">Anniversary</ToggleButton>
					      <ToggleButton sx={{fontSize:'14px',lineHeight:1}} onClick={()=>cardClickHandler(4)} value="Wedding">Wedding</ToggleButton>
					      <ToggleButton sx={{fontSize:'14px',lineHeight:1}} onClick={()=>cardClickHandler(5)} value="House & warming">House & warming</ToggleButton>
					    </ToggleButtonGroup>
						</div>
					</div>
					 
					<div className="form-check my-4 fw-600">
					  <input id="personalize-msg" className="form-check-input" type="checkbox" onChange={(e)=>{setMsg(!msg)}} checked={msg}/>
					  <label htmlFor="personalize-msg" className="form-check-label cursor-pointer">Personalize your greeting message</label>
					</div><hr/>
					<div>
					{ 
						msg &&
					<div className="">
					  <p className="">Your Message</p>
						<textarea className="form-control msg-textarea" onChange={(e)=>{setMsgContent(e.target.value)}} value={msgContent} ></textarea>
					</div>
					}
				</div>
				</div>
				</div>
				<div className="col-lg-4 col-md-4 col-sm-12 col-12 bg-white p-3">
					<div className="d-flex justify-content-between">
						<p className="fw-600">Order Summary</p>
						<p><span className="text-secondary fw-600">Total:</span> <span className="text-danger fw-600">₹ {totalAmounts}</span></p>
					</div><hr/>
					{cartData.map((item)=>{return(
						<div className="border p-2 d-flex justify-content-between" key={item.id}>
							<img src={item.img} className="img-fluid" width="60" height="60"/>
							<small className="">
								{item.title.slice(0,20)}...
							<span className="d-block">Qty: {item.quantity}</span>
							</small>
							<small className="text-danger fw-600">₹ {item.price*item.quantity}</small>	
					</div>
						)})
					}
					{ 
						msg &&
					<div className="border p-2 d-flex justify-content-between">
							<img src={giftcard} className="img-fluid" width="60" height="60"/>
							<small className="">
								{msgTitle} gift card
							</small>
							<small className="text-danger fw-600">₹ 30</small>	
					</div>
					}
					<div className=" mt-3 bg-light p-3" style={{border:'1px dashed gray'}}>
					    <div className="">
								<small>Billing Details</small>
								<small className="d-flex justify-content-between">Total Items <span>{msg?totalProducts+1:totalProducts}</span></small>
								<small className="d-flex justify-content-between">Sub Total <span>₹ {msg?totalAmounts+30:totalAmounts}</span></small>
								<small className="d-flex justify-content-between">Discount <span>0</span></small>
								<small className="d-flex justify-content-between">Shipping Charges <span>Free</span></small>
							</div><hr/>
							<p className="fw-bold d-flex justify-content-between">Total Amount<span>₹ {msg?totalAmounts+30:totalAmounts}</span></p>

					</div>
					<button onClick={proceedPayment} className="btn btn-pink w-100 mt-5 py-3">PROCEED TO PAYMENT</button>
				</div>
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

export default CheckoutStep2;