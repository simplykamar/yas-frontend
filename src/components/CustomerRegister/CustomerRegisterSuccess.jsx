import thanks from '../../images/other/thanks.jpg'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const CustomerRegisterSuccess = () => {
	const notifySuccess = (msg) => toast.success(msg);

	return(
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
	)
}
export default CustomerRegisterSuccess;