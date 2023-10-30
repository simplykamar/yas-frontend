import Sidebar from './Sidebar'
import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import toast, { Toaster } from 'react-hot-toast';

const CustomerAddress = () => {
	const notifySuccess = (msg) => toast.success(msg);
	const notifyError = (msg) => toast.error(msg);
	const BASE_URL = 'https://simplykamar.tech/api';
  // const BASE_URL = 'http://127.0.0.1:8000/api';

	const [addresses, setAddresses] = useState([]);
	const [loading, setLoading] = useState(true);
  const user = useSelector((state)=>state.auth);

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
              	alert('server error..!')
            })
    }
	useEffect(()=>{
      window.scrollTo(0,0);
		fetchAddresses(BASE_URL+`/customer-address/?customer=${user.user.id}`);

	},[])

	function inputHandler(event){
						setNewAddress({
							...newAddress,
							[event.target.name]: event.target.value
						})
	}

		function deleteAddress(id){
						axios.delete(BASE_URL+`/customer-address/${id}`,{headers:{"Authorization" : `JWT ${user.access}`}})
						.then(response=>{
							notifySuccess("Address deleted")
							fetchAddresses(BASE_URL+`/customer-address/?customer=${user.user.id}`);
						})
						.catch(error=>{
              	alert('server error..!')
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
	return(
		<div className="pb-4 pt-lg-4 pt-md-4">
			<div><Toaster/></div>
			<div className="container">
							<div className="row">
                <div className="col-lg-3 col-md-3 col-12 col-sm-12 d-none d-md-block d-lg-block">
                  <Sidebar/>
                </div>
         <div className="col-lg-9 col-md-9 col-12 col-sm-12 bg-white">
         	<div className="row">
				<div className="col-lg-6 col-md-6 col-sm-12 col-12">
           <h4 className="text-heading text-center d-lg-none d-md-none mt-3 mt-lg-0 mt-md-0">Address Book</h4>
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
                <div className="spinner-border text-pink"></div>
              </div>
				}
				</div>
				<div className="col-lg-6 col-md-6 col-sm-12 col-12">
					<div className="custom-shadow bg-white p-4" >
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
			</div>
			</div>
		</div>
		</div>
		)
}


export default CustomerAddress;