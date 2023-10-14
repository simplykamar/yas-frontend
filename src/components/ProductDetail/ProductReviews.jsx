import React from 'react'
import './ProductReviews.css'
import Rating from '@mui/material/Rating';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

const ProductReviews = ({productReviews}) => {
	console.log(productReviews)
	return(
		<div className="">
			<div className="row g-2">
			<div className="col-lg-6 col-md-6 col-sm-12 col-12" >
				<div className="text-center">
					<h1 className="fw-600">4.0</h1>
			        <Rating name="size-large" size="small" value={4} readOnly />
			        <small className="d-block text-secondary fw-600">based on {productReviews.length} reviews</small>
				</div>
				<div className="row g-2 mt-2">
				    <div className="col-2 text-end"><span className="text-secondary fw-600">5</span><StarBorderOutlinedIcon fontSize="small" style={{color:'lightgray'}}/></div>
					    <div className="col-10">
							<div className="progress mt-2" style={{height:'10px'}}>
							  <div className="progress-bar bg-success" style={{width:'100%'}}></div>
							</div>
						</div>
				</div>
				<div className="row g-2">
				    <div className="col-2 text-end"><span className="text-secondary fw-600">4</span><StarBorderOutlinedIcon fontSize="small" style={{color:'lightgray'}}/></div>
					    <div className="col-10">
							<div className="progress mt-2" style={{height:'10px'}}>
							  <div className="progress-bar" style={{width:'80%',backgroundColor:'#30bf58'}}></div>
							</div>
						</div>
				</div>
				<div className="row g-2">
				    <div className="col-2 text-end"><span className="text-secondary fw-600">3</span><StarBorderOutlinedIcon fontSize="small" style={{color:'lightgray'}}/></div>
					    <div className="col-10">
							<div className="progress mt-2" style={{height:'10px'}}>
							  <div className="progress-bar" style={{width:'50%',backgroundColor:'#faf55a'}}></div>
							</div>
						</div>
				</div>
				<div className="row g-2">
				    <div className="col-2 text-end"><span className="text-secondary fw-600">2</span><StarBorderOutlinedIcon fontSize="small" style={{color:'lightgray'}}/></div>
					    <div className="col-10">
							<div className="progress mt-2" style={{height:'10px'}}>
							  <div className="progress-bar" style={{width:'30%',backgroundColor:'orange'}}></div>
							</div>
						</div>
				</div>

				<div className="row g-2">
				    <div className="col-2 text-end"><span className="text-secondary fw-600">1</span><StarBorderOutlinedIcon fontSize="small" style={{color:'lightgray'}}/></div>
					    <div className="col-10">
							<div className="progress mt-2" style={{height:'10px'}}>
							  <div className="progress-bar" style={{width:'10%',backgroundColor:'#fc4444'}}></div>
							</div>
						</div>
				</div>
			</div>
				{
					productReviews.map(review=>{
						return(
								<div className="col-lg-6 col-md-6 col-sm-12 col-12" key={review.id}>
									<div className="row g-2">
										<div className="col-lg-1 col-md-1 col-sm-1 col-1">
											<div className="profile-image">{review.customer.user.name[0].toUpperCase()}</div>
										</div>
										<div className="col-lg-11 col-md-11 col-sm-11 col-11 px-3 ">
											<div className="d-flex justify-content-between">
												<div>
													<small className="fw-600 text-capitalize d-block">{review.customer.user.name}</small>
				                                    <Rating name="size-large" size="small" value={review.rating} readOnly />
												</div>
												<div>
													<small className="text-small text-dark">{review.created_at}</small>
												</div>
											</div>
										</div>
									</div>
										<small className="text-small text-secondary">{review.review}</small>
								</div>
							)
					})
				}
			</div>
		</div>
		)
}

export default ProductReviews;