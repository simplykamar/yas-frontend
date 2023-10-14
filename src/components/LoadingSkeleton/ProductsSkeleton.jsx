import React from 'react';
import Skeleton from '@mui/material/Skeleton';


const ProductsSkeleton = ({count}) => {
	return(
	<div className="row g-3">
		{
			Array(count).fill(0).map((item,i)=>{
				return(
				<div className="col-lg-3 col-md-4 col-sm-6 col-6" key={i}>
			      <Skeleton variant="rectangular" height={100} />
			      <Skeleton variant="text"  sx={{ fontSize: '1rem' }} />
			      <Skeleton variant="text" width={120} sx={{ fontSize: '1rem' }} />
			      <Skeleton variant="text" width={80} sx={{ fontSize: '1rem' }} />
			    </div>
				)
				})
		}
		
	</div>
	)
}

export default ProductsSkeleton;