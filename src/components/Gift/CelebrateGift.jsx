import {Link} from 'react-router-dom';
import husband from '../../images/celebrategift/husband.png'
import wife from '../../images/celebrategift/wife.png'
import cakes from '../../images/celebrategift/cakes.png'
import plants from '../../images/celebrategift/plants.png'
import personalized from '../../images/celebrategift/personalized.png'
import couples from '../../images/celebrategift/couples.png'
import forhim from '../../images/celebrategift/forhim.png'
import forher from '../../images/celebrategift/forher.png'
import flowers from '../../images/celebrategift/flowers.png'
import './CelebrateGift.css'

const CelebrateGift = () => {
	return (
	<div className="my-3">
				<div>
					<h2 className="text-capitalize">celebrate milestones</h2>
					<p className="text-secondary line-height-0">With our memorable gifts</p>
				</div>
				<div className="row mt-5">
					<div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-lg-0 mb-md-0 mb-3">
						<Link to="/category/for her/25"><img src={forher} className="img-fluid rounded-4 celebrate-img"/></Link>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-lg-0 mb-md-0 mb-3 ">
						<Link to="/category/flowers/13"><img src={flowers} className="img-fluid rounded-4 celebrate-img"/></Link>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-lg-0 mb-md-0 mb-3">
						<Link to="/category/couples/29"><img src={couples} className="img-fluid rounded-4 celebrate-img"/></Link>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-lg-0 mb-md-0 mb-3">
						<Link to="/category/husband/27"><img src={husband} className="img-fluid rounded-4 celebrate-img"/></Link>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-lg-0 mb-md-0 mb-3">
						<Link to="/category/cake/11"><img src={cakes} className="img-fluid rounded-4 celebrate-img"/></Link>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-lg-0 mb-md-0 mb-3">
						<Link to="/category/personalized/14"><img src={personalized} className="img-fluid rounded-4 celebrate-img"/></Link>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-lg-0 mb-md-0 mb-3">
						<Link to="/category/wife/28"><img src={wife} className="img-fluid rounded-4 celebrate-img"/></Link>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-lg-0 mb-md-0 mb-3 ">
						<Link to="/category/for him/26"><img src={forhim} className="img-fluid rounded-4 celebrate-img"/></Link>
					</div>
				</div>
	</div>
		)
}


export default CelebrateGift;