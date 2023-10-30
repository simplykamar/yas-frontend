import React from 'react';
import {useState,useEffect} from 'react';
import './ProductReviews.css';
import Rating from '@mui/material/Rating';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

const ProductReviews = ({productReviews}) => {
	const [avgRating,setAvgRating] = useState(0);
	function calculateRating(){
		let sum = 0;
		const totalRating = productReviews.reduce((sum,item)=>sum+item.rating,0)
        const result = Math.round((totalRating/productReviews.length) * 10) / 10
        setAvgRating(result)
	}
	useEffect(()=>{
		calculateRating();
	},[])
	return(
		<div className="mt-md-3 container-fluid">
				<div className="text-center mb-5">
					<h1 className="fw-600">{avgRating}</h1>
			        <Rating name="size-large" size="small" value={avgRating} precision={0.5} readOnly />
			        <small className="d-block text-secondary text-small fw-600">based on {productReviews.length} reviews</small>
				</div>
			<div className="row g-3">
				{
					productReviews.map(review=>{
						return(
								<div className="col-lg-6 col-md-6 col-sm-12 col-12" key={review.id}>
									<div className="row g-2">
										<div className="col-lg-1 col-md-1 col-sm-1 col-1">
											<div className="product-review-profile-image">{review.customer.user.name[0].toUpperCase()}</div>
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