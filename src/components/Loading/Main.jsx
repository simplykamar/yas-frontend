import React from 'react';
import {useState,useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import mainloading from '../../images/loading/mainloading.gif'
const Main = ({loading}) => {
	const [openBackdrop, setOpenBackdrop] = useState(loading);
//  	const handleBackdropClose = () => {
// 	    setOpenBackdrop(false);
// 	  };
// 	const handleBackdropOpen = () => {
// 	    setOpenBackdrop(true);
// 	  };	
// 
// 	function setBackdrop(){
// 		if(loading){
// 	    	setOpenBackdrop(true);
// 		}
// 		else{
// 			setOpenBackdrop(false);
// 		}
// 	}
	useEffect(()=>{
		// setBackdrop();
	},[loading,])

	return(
          <Backdrop
			  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			  open={openBackdrop}
			>
			  {/* <CircularProgress color="inherit"/> */}
			  <div className="text-center">
			 	 <img src={mainloading} className="img-fluid w-50" />
		      </div>
			</Backdrop>
		)

}
export default Main;