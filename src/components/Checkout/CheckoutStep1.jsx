import {Link} from 'react-router-dom'
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {addToOrder} from '../../redux/orderSlice';
import {useNavigate,useLocation} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import emptyCart from "../../images/other/emptycart.svg"
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';

const CheckoutStep1 = () => {
	const isNext = useLocation().state;
	const notifySuccess = (msg) => toast.success(msg);
	const notifyError = (msg) => toast.error(msg);
  // const BASE_URL = 'https://simplykamar.tech/api';
  const BASE_URL = 'http://127.0.0.1:8000/api';

	const [addresses, setAddresses] = useState([]);
	const [loading, setLoading] = useState(true);
  const user = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cartData = useSelector((state)=>state.cart.products);

// for add new address
	const [newAddress, setNewAddress] = useState({
					name:"",
					address:"",
					mobile:"",
					pincode:"",
					landmark:"",
					city:"",
					state:"",
					tag:1,
	});
	async function fetchAddresses(url){
      await axios.get(url,{headers:{"Authorization" : `JWT ${user.access}`}})
              .then((response)=>{
              	setAddresses(response.data);
              	setLoading(false);
          })
              .catch(error=>{
            })
    }
	useEffect(()=>{
      document.title="Checkout | Select Address";
      if(!isNext){
			navigate("/page-not-found",{replace:true});
		}
      window.scrollTo(0,0);
		fetchAddresses(BASE_URL+`/customer-address/?customer=${user.user.id}`);
	},[])

	function inputHandler(event){
						setNewAddress({
							...newAddress,
							[event.target.name]: event.target.value
						});
	}

		function deleteAddress(id){
						axios.delete(BASE_URL+`/customer-address/${id}`,{headers:{"Authorization" : `JWT ${user.access}`}})
						.then(response=>{
							fetchAddresses(BASE_URL+`/customer-address/?customer=${user.user.id}`);
							notifySuccess("Address successfully deleted !")
						})

		}
		function addAddress(event){
						const formData = new FormData();
						formData.append('customer',user.user.id);
						formData.append('name',newAddress.name);
						formData.append('address',newAddress.address);
						formData.append('landmark',newAddress.landmark);
						formData.append('pincode',newAddress.pincode);
						formData.append('city',newAddress.city);
						formData.append('state',newAddress.state);
						formData.append('mobile',newAddress.mobile);
						formData.append('address_type',newAddress.tag);
						axios.post(BASE_URL+'/customer-address/',formData,{headers:{"Authorization" : `JWT ${user.access}`}})
						.then(response=>{
							notifySuccess("New address added !")
							fetchAddresses(BASE_URL+`/customer-address/?customer=${user.user.id}`);
						})
						.catch(error=>{
							notifyError(error.response.data.msg)
					})

	}
	function selectAddress(AddressId){
		dispatch(addToOrder({address:AddressId}));
    navigate("/checkout-step-2",{replace:true,state:true});

	}
	return(
		<div className="py-3 bg-light">
				<div>
        <ToastContainer />
      </div>
			<div className="container">
			  { cartData.length?
			  <>
			<div className="mb-lg-3 mb-md-3 mb-2">
				<div className="stepper-wrapper">
					  <div className="stepper-item active">
					    <div className="step-counter">
					  <Link to="/checkout-step-1" className="text-decoration-none text-dark">
					    </Link>
					    </div>
					    <div className="step-name">
					  <Link to="/checkout-step-1" className="text-decoration-none text-secondary">
					    Delivery Details
					    </Link>
					    </div>
					  </div>
					  <div className="stepper-item">
					    <div className="step-counter">
					  <Link to="#" className="text-decoration-none text-secondary">
					    </Link>
					    </div>
					    <div className="step-name text-secondary">Order Summary</div>
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
			</div>
			<div className="row">
				<div className="col-lg-6 col-md-6 col-sm-12 col-12">
				{	!loading
					?
					addresses.length?
						addresses.map((item)=>{return(
							<div className="custom-shadow bg-white p-4 mb-4" key={item.id}>
							<p className="fw-bold text-capitalize">
										{item.address_type===1 && <HomeTwoToneIcon />}
										{item.address_type===2 && <WorkTwoToneIcon />}
										{item.address_type===3 && <LocationOnTwoToneIcon />}
										<span className="text-danger float-end cursor-pointer" onClick={()=>{deleteAddress(item.id)}}>Delete</span>
										<span className="ms-2">{item.name}</span>
										{item.address_type===1 && <span className="ms-2 bg-light fw-light text-dark">Home</span>}
										{item.address_type===2 && <span className="ms-2 bg-light fw-light text-dark">Work</span>}
										{item.address_type===3 && <span className="ms-2 bg-light fw-light text-dark">Other</span>}
									
							</p>
							<p className="text-capitalize">{item.address}</p>
							<p><CallTwoToneIcon/> {item.mobile}</p>
							<button onClick={()=>{selectAddress(item.id)}} className="btn btn-pink text-uppercase">deliver here</button>
						</div>)})
						:""
					:
             <div className="text-center">
                <div className="spinner-border text-danger"></div>
              </div>
				}
				</div>
				<div className="col-lg-6 col-md-6 col-sm-12 col-12">

					<div className="custom-shadow bg-white p-4 mb-4" >
							<p className="fw-bold text-capitalize">
									add new address
							</p>
							<p className="text-capitalize text-secondary">Place your order to new address</p>
							<button  className="btn btn-pink text-uppercase" data-bs-toggle="modal" data-bs-target="#addressModal">add new address</button>
{/* <!-- The Address Modal --> */}
<div className="modal" id="addressModal">
  <div className="modal-dialog">
    <div className="modal-content">

      {/* <!-- Modal Header --> */}
      <div className="modal-header">
        <h4 className="modal-title">Add new address</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      {/* <!-- Modal body --> */}
      <div className="modal-body">
      <form>
       <div className="mt-3">
          <TextField
         onChange={inputHandler}
         name="name"
         fullWidth
         label="Name"
         />
       </div>
       <div className="mt-3">
          <TextField
          type="number"
         onChange={inputHandler}
         name="mobile"
         fullWidth
         label="Mobile No."
         />
       </div>
       <div className="mt-3">
          <TextField
         onChange={inputHandler}
         name="address"
         fullWidth
         label="Address"
         />
       </div>
       <div className="mt-3">
          <TextField
         onChange={inputHandler}
         name="landmark"
         fullWidth
         label="Landmark"
         />
       </div>
       <div className="mt-3">
          <TextField
          type="number"
         onChange={inputHandler}
         name="pincode"
         fullWidth
         label="Pincode"
         />
       </div>
        <div className="mt-3">
          <TextField
         onChange={inputHandler}
         name="city"
         fullWidth
         label="City"
         />
       </div>
        <div className="mt-3">
          <TextField
         onChange={inputHandler}
         name="state"
         fullWidth
         label="State"
         />
       </div>

         <div className=" mt-3">
         <p className="fw-600">TAG AS</p>
         <div className="d-flex">
         <div className=" form-check">
           <input type="radio" id="floatingInputHomeTagGrid" onChange={inputHandler} name="tag" value={1} className="form-check-input" />
           <label className="form-check-label" htmlFor="floatingInputHomeTagGrid"><HomeTwoToneIcon/>Home</label>
         </div>
         <div className="ms-2 form-check">
           <input type="radio" id="floatingInputWorkTagGrid" onChange={inputHandler} name="tag" value={2} className="form-check-input" />
           <label className="form-check-label" htmlFor="floatingInputWorkTagGrid"><WorkTwoToneIcon/>Work</label>
         </div>
         <div className="ms-2 form-check">
           <input type="radio" id="floatingInputOtherTagGrid" onChange={inputHandler} name="tag" value={3} className="form-check-input" />
           <label className="form-check-label" htmlFor="floatingInputOtherTagGrid"><LocationOnTwoToneIcon/>Other</label>
         </div>
         </div>
         </div>
         </form>
      </div>
      {/* <!-- Modal footer --> */}
      <div className="modal-footer">
        <button type="button" className="btn btn-pink w-100 py-3 text-uppercase" onClick={addAddress} data-bs-dismiss="modal">save & deliver</button>
      </div>

    </div>
  </div>
</div>
						</div>
			</div>
			</div>
			</>
			:
			  <div className="text-secondary text-center">
                <h4 className="">Your <span className="text-danger">Gift Box</span> Looks Empty!</h4>
               <img src={emptyCart} className="img-fluid"/>
             </div>        
        }   
		</div>
		</div>
		)
}

export default CheckoutStep1;