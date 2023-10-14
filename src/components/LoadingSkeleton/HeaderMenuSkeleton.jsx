import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const HeaderMenuSkeleton= ({count}) => {
	return(
	<div className="container">
		<div className="row g-5">
			{
				Array(count).fill(0).map((item,index)=>{
					return(
						<div className="col-lg-2 col-md-2 col-sm-4 col-4" key={index}>
						   <Skeleton variant="circular" height={50} width={50} sx={{ fontSize: '1rem' }} />
				        </div>
						)
				})
	    	}
		</div>
	</div>
	)
}

export default HeaderMenuSkeleton;