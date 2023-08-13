import thanks from '../../images/other/thanks.jpg'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {useEffect} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';

const CustomerRegisterSuccess = () => {
	const notifySuccess = (msg) => toast.success(msg);
	const navigate = useNavigate();
	const isRegistered = useLocation().state;

	useEffect(()=>{
      window.scrollTo(0,0);
		if(!isRegistered){
			navigate("/page-not-found",{replace:true});
		}
	},[]);

	return(
		<div>
		{
			isRegistered &&
		<div onLoad={()=>{notifySuccess("Account activation link send !")}}>
			<div>
	        <ToastContainer />
	      </div>
			<div className="text-center p-3">
				<div>
					<img src={thanks} className="img-fluid" style={{width:"100px"}}/>
					<h4 className="success-msg">Registration Successful!</h4>
					<div><small>Your registration process is complete.</small></div>
					<div><small>Account activation link send to your email</small></div>
					<div><small className="text-danger">Account Not activate .</small></div>
				</div>
			</div>
		</div>
	}
		</div>
	)
}
export default CustomerRegisterSuccess;