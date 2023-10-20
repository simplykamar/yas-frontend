import './Checkout.css';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {addToOrder} from '../../redux/orderSlice';
import {useNavigate} from 'react-router-dom';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import {useState,useEffect} from 'react';
import emptyCart from "../../images/other/emptycart.svg"
import toast, { Toaster } from 'react-hot-toast';

const CheckoutStep1 = () => {
  // const BASE_URL = 'https://simplykamar.tech/api';
  const BASE_URL = 'http://127.0.0.1:8000/api';
	const [addresses, setAddresses] = useState([]);
	const [loading, setLoading] = useState(true);
  const user = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cartData = useSelector((state)=>state.cart.products);
	const notifySuccess = (text) => toast.success(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
	const notifyError = (text) => toast.error(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
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
    						alert('Server error..!')
            })
    }
	useEffect(()=>{
      document.title="Checkout | Select Address";
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
							notifySuccess('Address deleted !')
							fetchAddresses(BASE_URL+`/customer-address/?customer=${user.user.id}`);
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
							notifySuccess("New Address Added !")
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
			<div><Toaster/></div>
			<div className="container">
			  { cartData.length?
			  <>
			<div className="mb-lg-3 mb-md-3 mb-2">
				<div className="stepper-wrapper">
					  <div className="stepper-item active">
					    <div className="step-counter">
					  <Link to="/checkout-step-1" className="text-decoration-none ">
					    </Link>
					    </div>
					    <div className="step-name">
					  <Link to="/checkout-step-1" className="text-decoration-none text-pink">
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
										<span className="text-danger float-end cursor-pointer fs-14" onClick={()=>{deleteAddress(item.id)}}>Delete</span>
										<span className="ms-2 text-capitalize">{item.name}</span>
										{item.address_type===1 && <span className="ms-2 bg-light fw-light text-dark fs-12">Home</span>}
										{item.address_type===2 && <span className="ms-2 bg-light fw-light text-dark fs-12">Work</span>}
										{item.address_type===3 && <span className="ms-2 bg-light fw-light text-dark fs-12">Other</span>}
							</p>
							<div className="row g-0">
							<div className="col-lg-6 col-md-6 col-sm-6 col-7">
								<p className="text-capitalize fs-12 ms-4 m-1">{item.address}</p>
								</div>
								<div className="col-lg-6 col-md-6 col-sm-6 col-5 text-end ">
									<button onClick={()=>{selectAddress(item.id)}} className="btn btn-pink fs-12 text-uppercase">deliver here</button>
								</div>							
							</div>
							<p className="text-capitalize fs-12 ms-4">{item.mobile}</p>
						</div>
						)})
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
							<p className="text-capitalize text-secondary text-small">Place your order to new address</p>
							<button  className="btn btn-pink text-uppercase fs-12" data-bs-toggle="modal" data-bs-target="#addressModal">add new address</button>
{/* <!-- The Address Modal --> */}
<div className="modal" id="addressModal">
  <div className="modal-dialog">
    <div className="modal-content">

      {/* <!-- Modal Header --> */}
      <div className="modal-header">
        <h4 className="modal-title text-heading">Add new address</h4>
        <CloseIcon fontSize="small" className="cursor-pointer btn-close" data-bs-dismiss="modal"/>
      </div>

      {/* <!-- Modal body --> */}
      <div className="modal-body">
      <form>
       <div className="mt-3">
          <TextField
          color="error"
         onChange={inputHandler}
         name="name"
         fullWidth
         label="Name"
         size="small"
         InputLabelProps={{style: {fontSize: '14px'}}}
         />
       </div>
       <div className="mt-3">
          <TextField
          color="error"
          type="number"
         onChange={inputHandler}
         InputProps={{ inputProps: { min: 0 } }}
         name="mobile"
         fullWidth
         label="Mobile No."
         size="small"
         InputLabelProps={{style: {fontSize: '14px'}}}
         />
       </div>
       <div className="mt-3">
          <TextField
          color="error"
         onChange={inputHandler}
         name="address"
         fullWidth
         label="Address"
         size="small"
         InputLabelProps={{style: {fontSize: '14px'}}}
         />
       </div>
       <div className="mt-3">
          <TextField
          color="error"
         onChange={inputHandler}
         name="landmark"
         fullWidth
         label="Landmark"
         size="small"
         InputLabelProps={{style: {fontSize: '14px'}}}
         />
       </div>
       <div className="mt-3">
          <TextField
          color="error"
          type="number"
         onChange={inputHandler}
         InputProps={{ inputProps: { min: 0 } }}
         name="pincode"
         fullWidth
         label="Pincode"
         size="small"
         InputLabelProps={{style: {fontSize: '14px'}}}
         />
       </div>
        <div className="mt-3">
          <TextField
          color="error"
         onChange={inputHandler}
         name="city"
         fullWidth
         label="City"
         size="small"
         InputLabelProps={{style: {fontSize: '14px'}}}
         />
       </div>
        <div className="mt-3">
          <TextField
          color="error"
         onChange={inputHandler}
         name="state"
         fullWidth
         label="State"
         size="small"
         InputLabelProps={{style: {fontSize: '14px'}}}
         />
       </div>
         <div className=" mt-3">
         <p className="fw-600 fs-14">TAG AS :</p>
         <div className="d-flex">
         <div className=" form-check">
           <input type="radio" id="floatingInputHomeTagGrid" onChange={inputHandler} name="tag" value={1} className="form-check-input" />
           <label className="form-check-label fs-14" htmlFor="floatingInputHomeTagGrid"><HomeTwoToneIcon fontSize="small"/>Home</label>
         </div>
         <div className="ms-2 form-check">
           <input type="radio" id="floatingInputWorkTagGrid" onChange={inputHandler} name="tag" value={2} className="form-check-input" />
           <label className="form-check-label fs-14" htmlFor="floatingInputWorkTagGrid"><WorkTwoToneIcon fontSize="small"/>Work</label>
         </div>
         <div className="ms-2 form-check">
           <input type="radio" id="floatingInputOtherTagGrid" onChange={inputHandler} name="tag" value={3} className="form-check-input" />
           <label className="form-check-label fs-14" htmlFor="floatingInputOtherTagGrid"><LocationOnTwoToneIcon fontSize="small"/>Other</label>
         </div>
         </div>
         </div>
         </form>
      </div>
      {/* <!-- Modal footer --> */}
      <div className="modal-footer d-flex justify-content-center">
        <button type="button" className="btn btn-pink py-2 w-50 text-uppercase fs-12" onClick={addAddress} data-bs-dismiss="modal">save & deliver</button>
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
                <p className="">Your <span className="text-pink">Gift Box</span> Looks Empty!</p>
               <img src={emptyCart} className="img-fluid"/>
             </div>         
        }   
		</div>
		</div>
		)
}

export default CheckoutStep1;