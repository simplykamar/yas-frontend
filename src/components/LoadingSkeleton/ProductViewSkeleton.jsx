import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const ProductViewSkeleton = () => {
	return(
	<div >
		{/* For Desktop view*/}
		<div className="d-none d-md-block d-lg-block">
			<div className="row ">
				<div className="col-lg-1 col-md-1 ">
		 			<Skeleton variant="rectangular" width={50} height={40} />
		 			<Skeleton variant="rectangular" className="mt-2" width={50} height={40} />
		 			<Skeleton variant="rectangular" className="mt-2" width={50} height={40} />
				</div>
				<div className="col-lg-4 col-md-4 ">
		 			<Skeleton variant="rectangular" width={250} height={200} />
				</div>
				<div className="col-lg-7 col-md-7 col-sm-6 col-6">
		 			<Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />
		 			<Skeleton variant="text" width={200} sx={{ fontSize: '1rem' }} />
					 <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
					 <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
					 <Skeleton variant="rounded" height={50} />
					 <Skeleton variant="rounded" height={100} className="mt-3" />
					 <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
					
				</div>
			</div>
		</div>
		{/* For Mobile View */}
		<div className="d-lg-none d-md-none">
			<div className=" ">
		 		<Skeleton variant="rectangular" height={200} />
				<div className="d-flex justify-content-between my-2">
		 			<Skeleton variant="rectangular" width={70}  height={40} />
		 			<Skeleton variant="rectangular" width={70} height={40} />
		 			<Skeleton variant="rectangular" width={70} height={40} />
		 			<Skeleton variant="rectangular" width={70} height={40} />
				</div>
				<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				<Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />
		 		<Skeleton variant="text" width={200} sx={{ fontSize: '1rem' }} />
				<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				<Skeleton variant="rounded" height={50} />

			</div>
		</div>
	</div>
	)
}

export default ProductViewSkeleton;