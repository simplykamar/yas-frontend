import thanks from '../../images/other/thanks1.png'
import {Link} from 'react-router-dom';
const Thank = () => {
	return (
		<div className="text-center bg-light py-4">
		<p className="fw-600">Your order has been received</p>
			<img src={thanks} className="img-fluid"/>
			<p>Thank you for your purchase</p>
			<p><small className="text-secondary">Your order ID is 152486236</small></p>
			<Link to="/" className="btn btn-danger text-uppercase">Continue shopping</Link>
		</div>
		)
}

export default Thank;