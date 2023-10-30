import {Helmet} from 'react-helmet';
import './Checkout.css';
import {Link,NavLink,useNavigate,useLocation} from 'react-router-dom'
import {useState,useEffect} from 'react';
import axios from 'axios';
import {resetCart} from '../../redux/cartSlice'
import emptyCart from "../../images/other/emptycart.svg"
import giftcard from "../../images/other/giftcard.jpg"
import {useSelector, useDispatch} from 'react-redux';
import {addToOrder} from '../../redux/orderSlice';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CheckoutStep2 = () => {
  	const BASE_URL = 'https://simplykamar.tech/api';
	const isNext = useLocation().state;
	const [giftCard, setGiftCard] = useState(1);
	const [loading, setLoading] = useState(true);
  	const user = useSelector((state)=>state.auth);
  	const order = useSelector((state)=>state.order);
  	const cartData = useSelector((state)=>state.cart.products);
	const [msg, setMsg] = useState(false);
	const [msgContent, setMsgContent] = useState('');
	const [msgTitle, setMsgTitle] = useState('');
	const sum=0;
  	const totalAmounts = cartData.reduce((sum,item)=>{return sum+(item.price*item.quantity)},0)
  	const dispatch = useDispatch();
  	const navigate = useNavigate();
 	useEffect(()=>{
      if(!isNext){
			navigate("/page-not-found",{replace:true});
		}
 		if(!order.address){
 			navigate('/checkout-step-1', {replace:true})
 		}
      window.scrollTo(0,0);
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
  	function handleCardChange(val){
  		setGiftCard(val);
  		switch(val){
  			case 1: 
  				setMsgTitle('General Gifting');
  				break;
  			case 2: 
  				setMsgTitle('Birthday');
  				break;
  			case 3: 
  				setMsgTitle('Anniversary');
  				break;
  			case 4: 
  				setMsgTitle('Wedding');
  				break;
  			case 5: 
  				setMsgTitle('House & warming');
  				break;
  		}
  		cardClickHandler(val);
  	}
	return(
		<div className=" py-3 bg-light">
		<Helmet>
          <title>Checkout | Order Summary</title>
      </Helmet>
			<div className="container">
			{ cartData.length?
			  <>
			<h4 className="text-center text-heading">Checkout</h4>
				<div className="stepper-wrapper">
					  <div className="stepper-item completed">
					    <div className="step-counter">
					  <Link to="/checkout-step-1" className="text-decoration-none">
					   <CheckIcon className="text-pink"/>
					    </Link>
					    </div>
					    <div className="step-name">
					  <Link to="/checkout-step-1" className="text-decoration-none text-pink">
					    Delivery Details
					    </Link>
					    </div>
					  </div>
					  <div className="stepper-item active">
					    <div className="step-counter">
					  <Link to="#" className="text-decoration-none text-pink">
					    </Link>
					    </div>
					    <div className="step-name text-pink">Order Summary</div>
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
			<div className="row g-4 mt-1">
				<div className="col-lg-8 col-md-8 col-sm-12 col-12 ">
				<div className="bg-white p-2">
					<p className="fw-600 text-center">Message Card <CardGiftcardOutlinedIcon /></p>
					<div className="d-flex justify-content-center">
						<div style={{borderBottom:'2px solid #b0abab'}} className="w-75"></div>
					</div>
					
					<div className="form-check my-4 fw-600">
					  <input id="personalize-msg" className="form-check-input border-2" type="checkbox" onChange={(e)=>{setMsg(!msg)}} checked={msg}/>
					  <label htmlFor="personalize-msg" className="form-check-label cursor-pointer fs-14">Personalize your greeting message</label>
					</div>
					<div>
					{ 
						msg &&
					<div className="">
						<Box sx={{ minWidth: 100 }}>
						      <FormControl fullWidth>
						        <InputLabel id="demo-simple-select-label">Gift Card</InputLabel>
						        <Select
						          labelId="card-select-label"
						          id="card-select"
						          value={giftCard}
						          label="Gift Card"
						          onChange={(e)=>{handleCardChange(e.target.value)}}
						          size="small"
						        >
						          <MenuItem value={1} >General Gifting</MenuItem>
						          <MenuItem value={2}>Birthday</MenuItem>
						          <MenuItem value={3}>Anniversary</MenuItem>
						          <MenuItem value={4}>Wedding</MenuItem>
						          <MenuItem value={5}>House & warming</MenuItem>
						        </Select>
						      </FormControl>
						    </Box>
					    <div className="mt-3">
						  <p className="fs-12">Your Message</p>
							<textarea className="form-control msg-textarea" onChange={(e)=>{setMsgContent(e.target.value)}} value={msgContent} style={{fontSize:'12px'}}></textarea>
						</div>
					</div>
					}
				</div>
				</div>
				</div>
				<div className="col-lg-4 col-md-4 col-sm-12 col-12 bg-white p-3">
					<div className="text-center">
						<p className="fw-600">Order Summary</p>
					</div><hr/>
					{cartData.map((item)=>{return(
						<div className="border p-2 d-flex justify-content-between" key={item.id}>
							<img src={item.img} className="img-fluid" width="60" height="60"/>
							<small className="">
								{item.title.slice(0,20)}...
							<span className="d-block fs-12 text-secondary">Qty: {item.quantity}</span>
							</small>
							<small className="text-pink fw-600">₹ {item.price*item.quantity}</small>	
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
							<small className="text-pink fw-600">₹ 30</small>	
					</div>
					}
					<div className=" mt-3 bg-light p-3" style={{border:'1px dashed gray'}}>
					    <div className="">
								<p className="fw-600">Billing Details</p>
								<small className="d-flex justify-content-between">Sub Total <span>₹ {msg?totalAmounts+30:totalAmounts}</span></small>
								<small className="d-flex justify-content-between">Discount <span>0</span></small>
								<small className="d-flex justify-content-between">Shipping Charges <span>Free</span></small>
							</div><hr/>
							<p className="fw-bold d-flex justify-content-between">Total Amount<span className=" text-pink">₹ {msg?totalAmounts+30:totalAmounts}</span></p>

					</div>
					<div className="text-center">
						<button onClick={proceedPayment} className="btn btn-pink w-75 mt-3 py-2 fs-14">PROCEED TO PAYMENT</button>
					</div>
				</div>
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

export default CheckoutStep2;