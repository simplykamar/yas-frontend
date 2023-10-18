import thanks from '../../images/other/thanks1.png'
import {Link,useLocation,useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
const Thank = () => {
	const navigate = useNavigate();
	const isOrdered = useLocation().state;

	useEffect(()=>{
    	window.scrollTo(0,0);
      	document.title="Order Successfully placed";
		if(!isOrdered){
			navigate("/page-not-found",{replace:true});
		}
	},[]);

	return (
		<div>
		{ isOrdered &&
		<div className="text-center py-4">
		<h4 className="text-heading">Your order has been received</h4>
			<img src={thanks} className="img-fluid"/>
			<p className="fs-12">Thank you for your purchase</p>
			<Link to="/" className="btn btn-pink fs-12 text-uppercase">Continue shopping</Link>
		</div>
	}
	</div>
		)
}

export default Thank;