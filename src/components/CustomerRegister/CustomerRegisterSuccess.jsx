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
			<div className="text-center p-5">
				<div>
					<img src={thanks} className="img-fluid" style={{width:"100px"}}/>
					<h4 className="success-msg">Registration Successful!</h4>
					<p>Your registration process is complete.</p>
					<p>Account activation link send to your email</p>
					<p className="text-danger">Account Not activate .</p>
				</div>
			</div>
		</div>
	)
}
export default CustomerRegisterSuccess;