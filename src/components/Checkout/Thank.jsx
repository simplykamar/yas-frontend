import {Helmet} from 'react-helmet';
import thanks1 from '../../images/other/thanks1.gif'
import thanks2 from '../../images/other/thanks2.png'
import {useState} from 'react';
import {Link,useLocation,useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
const Thank = () => {
	const navigate = useNavigate();
	const isOrdered = useLocation().state;
	const [successImage,setSuccessImage] = useState(true);
	
	useEffect(()=>{
    	window.scrollTo(0,0);
      	setTimeout(function() {
      		setSuccessImage(false)
      	}, 2450);
		if(!isOrdered){
			navigate("/page-not-found",{replace:true});
		}
	},[]);

	return (
		<div>
		<Helmet>
          <title>Order Successfully placed</title>
      </Helmet>
		{ isOrdered &&
		<div className="text-center py-4">
		<h2 className="text-heading">Your order has been received</h2>
			{
				successImage
				?
				<img src={thanks1} className="img-fluid my-4" width="130" height="130"/>
				:
				<img src={thanks2} className="img-fluid my-4" width="100" height="100"/>
			}
			<p className="fs-12">Thank you for your purchase</p>
			<Link to="/" className="btn btn-pink fs-12 text-uppercase">Continue shopping</Link>
		</div>
	}
	</div>
		)
}

export default Thank;