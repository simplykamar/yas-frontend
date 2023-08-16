import thanks from '../../images/other/thanks1.png'
import {Link,useLocation,useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
const Thank = () => {
	const navigate = useNavigate();
	const isOrdered = useLocation().state;

	useEffect(()=>{
      document.title="Order Successfully placed";
		if(!isOrdered){
			navigate("/page-not-found",{replace:true});
		}
	},[]);

	return (
		<div>
		{ isOrdered &&
		<div className="text-center bg-light py-4">
		<p className="fw-bold">Your order has been received</p>
			<img src={thanks} className="img-fluid"/>
			<p>Thank you for your purchase</p>
			<Link to="/" className="btn btn-danger text-uppercase">Continue shopping</Link>
		</div>
	}
	</div>
		)
}

export default Thank;