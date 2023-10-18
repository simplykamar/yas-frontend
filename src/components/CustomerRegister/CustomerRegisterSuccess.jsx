import thanks from '../../images/other/thanks.jpg'
import {useEffect} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';

const CustomerRegisterSuccess = () => {
	const navigate = useNavigate();
	const isRegistered = useLocation().state;

	useEffect(()=>{
      document.title="Account Successfully Created";
      window.scrollTo(0,0);
		if(!isRegistered){
			navigate("/page-not-found",{replace:true});
		}
	},[]);

	return(
		<div>
		{
			isRegistered &&
		<div>
			<div>
	      </div>
			<div className="text-center p-3">
				<div>
					<img src={thanks} className="img-fluid" style={{width:"100px"}}/>
					<h4 className="success-msg text-heading mt-3">Registration Successful!</h4>
					<div><p className="text-secondary" style={{fontSize:"10px"}}>Kindly check your email for Account Activation</p></div>
				</div>
			</div>
		</div>
	}
		</div>
	)
}
export default CustomerRegisterSuccess;