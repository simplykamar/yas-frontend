import {Link} from 'react-router-dom'
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Sidebar from './Sidebar'
import FmdBadOutlinedIcon from '@mui/icons-material/FmdBadOutlined';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const CustomerAddress = () => {
	const notifySuccess = (msg) => toast.success(msg);
	const notifyError = (msg) => toast.error(msg);
	const BASE_URL = 'https://yasonlinegifting.pythonanywhere.com/api';
	const [addresses, setAddresses] = useState([]);
	const [loading, setLoading] = useState(true);
  const user = useSelector((state)=>state.auth);
  console.log(user.user.id)

// for add new address
	const [newAddress, setNewAddress] = useState({
					name:"",
					address:"",
					mobile:"",
					pincode:"",
					landmark:"",
					tag:1,
	});


	async function fetchAddresses(url){
      await axios.get(url,{headers:{"Authorization" : `JWT ${user.access}`}})
              .then((response)=>{
              	setAddresses(response.data);
              	console.log(response.data);
              	setLoading(false);
          })
              .catch(error=>{console.log(error)})
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
						axios.delete(BASE_URL+`/customer-address/${id}`)
						.then(response=>{
							notifySuccess("Address successfully deleted !")
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
						formData.append('mobile',newAddress.mobile);
						formData.append('address_type',newAddress.tag);
						console.log(formData)
						axios.post(BASE_URL+'/customer-address/',formData)
						.then(response=>{
							notifySuccess("New address added !")
							console.log(response);
						fetchAddresses(BASE_URL+`/customer-address/?customer=${user.user.id}`);

						})
						.catch(error=>{
							notifyError(error.response.data.msg)
							console.log(error)
						})

	}
	return(
		<div className=" py-5 bg-light">
		<div>
        <ToastContainer />
      </div>
			<div className="container-fluid">
							<div className="row">
                <div className="col-lg-3 col-md-3 col-12 col-sm-12">
                  <Sidebar/>
                </div>
         <div className="col-lg-9 col-md-9 col-12 col-sm-12 bg-white py-3">
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
						</div>)})
						:
						<div className="text-secondary text-center">
						<FmdBadOutlinedIcon fontSize="large"/>
							<p className="">Oops !! You don’t seem to have any saved addresses.</p>
						</div>
					: "loading..."
				}
				
				</div>
				<div className="col-lg-6 col-md-6 col-sm-12 col-12">

					<div className="custom-shadow bg-white p-4 mb-4" >
							<p className="fw-bold text-capitalize">
									add new address
							</p>
							<p className="text-capitalize text-secondary">Place your order to new address</p>
							<button  className="btn btn-outline-danger text-uppercase" data-bs-toggle="modal" data-bs-target="#addressModal">add new address</button>
{/* <!-- The Address Modal --> */}
<div className="modal" id="addressModal">
  <div className="modal-dialog">
    <div className="modal-content">

      {/* <!-- Modal Header --> */}
      <div className="modal-header">
        <h4 className="modal-title">Address new address</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      {/* <!-- Modal body --> */}
      <div className="modal-body">
      <form>
          <div className="form-floating">
           <input type="text" name="name" id="floatingInputNameGrid" onChange={inputHandler} className="form-control"  placeholder="Enter Name" />
           <label htmlFor="floatingInputNameGrid">Full Name*</label>
         </div>
         <div className="form-floating mt-3">
           <input type="text" name="address" id="floatingInputAddressGrid" onChange={inputHandler} className="form-control"  placeholder="Enter address" />
           <label htmlFor="floatingInputAddressGrid">Complete Address*</label>
         </div>
         <div className="form-floating mt-3">
           <input type="text" name="landmark" id="floatingInputLandmarkGrid" onChange={inputHandler} className="form-control"  placeholder="Enter landmark" />
           <label htmlFor="floatingInputLandmarkGrid">Landmark*</label>
         </div>
         <div className="form-floating mt-3">
           <input type="number" name="pincode" id="floatingInputPincodeGrid" onChange={inputHandler} className="form-control"  placeholder="Enter pincode" />
           <label htmlFor="floatingInputPincodeGrid">Pincode*</label>
         </div>
         <div className="form-floating mt-3">
           <input type="number" name="mobile" id="floatingInputMobileGrid" onChange={inputHandler} className="form-control"  placeholder="Enter mobile no." />
           <label htmlFor="floatingInputMobileGrid">Mobile No.*</label>
         </div>
         <div className=" mt-3">
         <p className="fw-600">TAG AS</p>
         <div className="d-flex">
         <div className=" form-check">
           <input type="radio" id="floatingInputHomeTagGrid" onChange={inputHandler} name="tag" value={1} className="form-check-input" checked/>
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
        <button type="button" className="btn btn-danger w-100 py-3 text-uppercase" onClick={addAddress} data-bs-dismiss="modal">save & deliver</button>
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