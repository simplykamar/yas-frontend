import {Link,NavLink,useNavigate} from 'react-router-dom'
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import {useState,useEffect} from 'react';
import axios from 'axios';
import './Checkout.css';
import {useSelector, useDispatch} from 'react-redux';
import {addToOrder,clearOrder} from '../../redux/orderSlice';
import CardGiftcardTwoToneIcon from '@mui/icons-material/CardGiftcardTwoTone';
import {resetCart} from '../../redux/cartSlice'
import emptyCart from "../../images/other/emptycart.svg"

const CheckoutStep2 = () => {
	const BASE_URL = 'https://yasonlinegifting.pythonanywhere.com/api';
	const [loading, setLoading] = useState(true);
  	const user = useSelector((state)=>state.auth);
  	const order = useSelector((state)=>state.order);
  	const cartData = useSelector((state)=>state.cart.products);
	const [msg, setMsg] = useState(false);
	const [msgContent, setMsgContent] = useState('');
	const sum=0;
  	const totalProducts = cartData.reduce((sum,item)=>{return sum+item.quantity},0)
  	const totalAmounts = cartData.reduce((sum,item)=>{return sum+(item.price*item.quantity)},0)
  	const dispatch = useDispatch();
  	const navigate = useNavigate();


 	useEffect(()=>{
 		console.log(order.address);
 		if(!order.address){
 			navigate('/checkout-step-1', {replace:true})
 		}
 	},[])
  	function cardClickHandler(cardType){
  		const generalGiftMsg = `To,
XYZ

It's hard to find someone who inspires you each day. Thank you for that. Here's a gesture of my gratitude and love.


From
${user.user.user.name.toUpperCase()}
  		`
  		const birthadayMsg = `To,
XYZ

You had my back, even behind my back. Friends like you are hard to come by. Here's wishing you the happiest birthday, my buddy!


From
${user.user.user.name.toUpperCase()}
  		`
  		const anniversaryMsg = `To,
XYZ

Happy anniversary! May you celebrate many more years of togetherness, withstanding the tests of time to emerge stronger and happier.


From
${user.user.user.name.toUpperCase()}
  		`
  		const weddingMsg = `To,
XYZ

Wishing you both lots of love and happiness, on this exciting and joyful day of your life.


From
${user.user.user.name.toUpperCase()}
  		`
  		const houseMsg = `To,
XYZ

With love, you continue to turn a new house into a home. Congratulations on your home sweet home. It's sure to welcome abundance and joy.


From
${user.user.user.name.toUpperCase()}
  		`
  		console.log(cardType)
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
  		console.log(msgContent)
  	}
	// function createOrder(){
	// 		const order = {
	// 			user:{user:user.user.id,access:user.access,refresh:user.refresh},
	// 			orderItems:cartData,
	// 		}
	// 		dispatch(addToOrder(order));
	// 		// dispatch(resetCart());
	// 		// dispatch(clearOrder());
	// 		console.log("in createOrder");
	// 		
	// }


	return(
		<div className=" py-3 bg-light">
			<div className="container">
			{ cartData.length?
			  <>
			<h4 className="text-center">Checkout</h4>
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
					  <div className="stepper-item active">
					    <div className="step-counter">
					  <Link to="#" className="text-decoration-none text-secondary">
					    2
					    </Link>
					    </div>
					    <div className="step-name  text-secondary">Order Summary</div>
					  </div>
					  <div className="stepper-item ">
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
			<div className="row g-4">
				<div className="col-lg-8 col-md-8 col-sm-12 col-12 ">
				<div className="bg-white p-4">
					<p className="fw-600">Message Card <CardGiftcardTwoToneIcon color="warning"/></p><hr/>
					<div className="table-responsive ">
					<div className="table ">
					<div className="d-flex justify-content-between">
						<button className="btn btn-white card-active" onClick={()=>cardClickHandler(1)}>General Gifting</button>
						<button className="btn btn-white card-active" onClick={()=>cardClickHandler(2)}>Birthday</button>
						<button className="btn btn-white card-active" onClick={()=>cardClickHandler(3)}>Anniversary</button>
						<button className="btn btn-white card-active" onClick={()=>cardClickHandler(4)}>Wedding</button>
						<button className="btn btn-white card-active" onClick={()=>cardClickHandler(5)}>House & warming</button>
					</div>
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
						<textarea className="form-control msg-textarea" onChange={(e)=>{setMsgContent(e.target.value);console.log(msgContent)}} value={msgContent} defaultValue={msgContent}></textarea>
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
					<div className=" mt-3 bg-light p-3" style={{border:'1px dashed gray'}}>
					    <div className="">
								<small>Billing Details</small>
								<small className="d-flex justify-content-between">Total Items <span>{totalProducts}</span></small>
								<small className="d-flex justify-content-between">Sub Total <span>₹ {totalAmounts}</span></small>
								<small className="d-flex justify-content-between">Discount <span>0</span></small>
								<small className="d-flex justify-content-between">Shipping Charges <span>Free</span></small>
							</div><hr/>
							<p className="fw-600 d-flex justify-content-between">Total Amount<span>₹ {totalAmounts}</span></p>

					</div>
					<Link to='/confirm-order' className="btn btn-pink w-100 mt-5 py-3">PROCEED TO PAYMENT</Link>
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