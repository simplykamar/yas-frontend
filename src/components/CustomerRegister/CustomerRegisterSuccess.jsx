import thanks1 from '../../images/other/thanks1.gif'
import thanks2 from '../../images/other/thanks2.png'
import {useEffect,useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';

const CustomerRegisterSuccess = () => {
	const navigate = useNavigate();
	const isRegistered = useLocation().state;;
	const [successImage,setSuccessImage] = useState(true);

	useEffect(()=>{
      document.title="Account Successfully Created";
      setTimeout(function() {
      		setSuccessImage(false)
      	}, 2500);
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
			<div className="text-center py-4">
				<div>
				{
					successImage
					?
					<img src={thanks1} className="img-fluid my-4" width="130" height="130"/>
					:
					<img src={thanks2} className="img-fluid my-4" width="100" height="100"/>
				}
				<h4 className="success-msg text-heading">Registration Successful!</h4>
					<div><p className="text-secondary fs-12">Kindly check your email for Account Activation</p></div>
				</div>
			</div>
		</div>
	}
		</div>
	)
}
export default CustomerRegisterSuccess;