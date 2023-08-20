import TextField from '@mui/material/TextField';
import {useState,useEffect} from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {Link} from 'react-router-dom'

const GetResetPaswordLink = () => {
  const BASE_URL = 'https://simplykamar.tech/';
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const [email,setEmail] = useState('');
  const [isFetching,setIsFetching] = useState(false);

	async function getResetLink(e){
		setIsFetching(true);
		e.preventDefault();
		const formData = new FormData();
		formData.append('email',email)
		await axios.post(BASE_URL+`auth/users/reset_password/`,formData)
			.then(response=>{
				if(response.status===204){
					notifySuccess("password reset link sent.")
				}
				setIsFetching(false);
				setEmail('')
			})
			.catch(err=>{
				if(err.response.status==400){
					notifyError("Email not registered with us.!")
				}
				setIsFetching(false);
			})
	}
 useEffect(()=>{
      document.title="Login in into yas | Log in or Sign up";
  },[])
	return (
		<div className="container-fluid">
			<div>
	        <ToastContainer />
	      </div>
           <div className="login-container py-4">
	            <div className="d-flex justify-content-center">
			            <div className="card custom-shadow" >
			            <div  className="card-body ">
              			<h5 className="card-title text-dark">Reset your password</h5>
			            <form style={{maxWidth:'500px'}} onSubmit={getResetLink}>
			            <small className="text-secondary">Password reset link will be sent to registered email id</small>
			              <TextField type='email' required={true} margin="normal" id="email-input" name="email" label="Email ID" onChange={(e)=>{setEmail(e.target.value)}} value={email} fullWidth variant="standard" />
		                  	{
				                isFetching?
				                  <button className="mt-3 btn btn-danger w-100 py-2" disabled>
				                      <span className="spinner-border spinner-border-sm"> </span>
				                       Loading..
				                    </button>
				                :
				                	email.length?
		                  		<button type="submit" className="btn btn-danger mt-3 w-100 py-2 text-uppercase">send reset link</button>
              						:
		                  		<button type="submit" className="btn btn-danger mt-3 w-100 py-2 text-uppercase" disabled={true}>send reset link</button>
              }
              <div className="mt-2 text-center text-secondary">
	              <small className="m-0 p-0">or login to continue</small>
              </div>
              		<Link to="/customer/login" className="mt-4 btn btn-dark bg-white text-dark w-100 text-uppercase">Login</Link>
			             </form>
			             </div>
		             </div>
		             </div>
	             </div>
             </div>
	)
}
export default GetResetPaswordLink;