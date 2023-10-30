import TextField from '@mui/material/TextField';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './CustomerLogin.css';
import toast, { Toaster } from 'react-hot-toast';

const GetResetPaswordLink = () => {
  // const BASE_URL = 'http://127.0.0.1:8000/';
  const BASE_URL = 'https://simplykamar.tech/';
  const [email,setEmail] = useState('');
  const [isFetching,setIsFetching] = useState(false);
  const [inputError,setInputError] = useState({type:'',msg:''})
	const notifySuccess = (text) => toast.success(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
  const notifyError = (text) => toast.error(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});

	async function getResetLink(e){
		setIsFetching(true);
		e.preventDefault();
		const formData = new FormData();
		formData.append('email',email)
		await axios.post(BASE_URL+`auth/users/reset_password/`,formData)
			.then(response=>{
				// console.log(response)
				if(response.status===204){
					notifySuccess("Password reset link sent!")
					setInputError()
					setInputError({type:'success',msg:"password reset link sent.!"})
				}
				setIsFetching(false);
				setEmail('')
			})
			.catch(err=>{
				if(err.response.status==400){
					notifyError('Email not registered with us!')
					setInputError({type:'error',msg:"Email not registered with us.!"})
				}
				setIsFetching(false);
			})
	}
 useEffect(()=>{
      document.title="Login in into yas | Log in or Sign up";
  },[])
	return (
		<div className="container-fluid">
				<div><Toaster/></div>
           <div className="login-container py-4">
	            <div className="d-flex justify-content-center">
			            <div className="card custom-shadow" >
			            <div  className="card-body ">
              			<h4 className="card-title text-heading">Reset your password</h4>
			            <form style={{maxWidth:'500px'}} onSubmit={getResetLink}>
			            <p className=" fs-12">Password reset link will be sent to registered email id</p>
			               <TextField 
			                color="error"
			                type="email" 
			                id="email-input" 
			                name="email" 
			                label="Email ID" 
			              	onChange={(e)=>{setEmail(e.target.value)}} 
			              	value={email} 
			                size="small"
			                InputLabelProps={{style: {fontSize: '14px'}}}
			                fullWidth 
			              	margin="normal" 
			                />
		                  	{
				                isFetching?
				                <div className="text-center">
				                  <button className="mt-3 btn btn-danger w-50 py-2 rounded-15 fs-14" disabled>
				                      <span className="spinner-border spinner-border-sm"></span> Loading..
				                    </button>
				                   </div>
				                :<div className="text-center">

							              { inputError.type=='success'&&
							                  <div className="text-start">
							                  <li className="text-success fs-12"><small >{inputError.msg}</small></li>
							                  </div>
							                }	
							                { inputError.type=='error'&&
							                  <div className="text-start">
							                  <li className="text-danger fs-12"><small >{inputError.msg}</small></li>
							                  </div>
							                }	
				                	{
					                	email.length?
			                  		<button type="submit" className="btn btn-pink mt-3 w-50 py-2 fs-14 text-uppercase">send reset link</button>
	              						:
			                  		<button type="submit" className="btn btn-danger mt-3 w-50 rounded-15 fs-14 fw-bold py-2 text-uppercase" disabled={true}>send reset link</button>
              						}
              						</div>
              }			
              <div className="mt-2 text-center text-secondary">
	              <p className="fs-12">or login to continue</p>
              </div>
              	<div className="mt-3 text-center">
              		<Link to="/customer/login" className="btn btn-dark bg-white text-dark w-50 rounded-15 fs-12 text-uppercase">Login</Link>
			             </div>
			             </form>
			             </div>
		             </div>
		             </div>
	             </div>
             </div>
	)
}
export default GetResetPaswordLink;