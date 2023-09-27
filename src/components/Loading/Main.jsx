import React from 'react';
import {useState,useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Main = ({loading}) => {
	const [openBackdrop, setOpenBackdrop] = useState(false);
 	const handleBackdropClose = () => {
	    setOpenBackdrop(false);
	  };
	const handleBackdropOpen = () => {
	    setOpenBackdrop(true);
	  };	

	function setBackdrop(){
		if(loading){
	    	setOpenBackdrop(true);
		}
		else{
			setOpenBackdrop(false);
		}

	}
	useEffect(()=>{
		setBackdrop();
	},[loading,])

	return(
          <Backdrop
			  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			  open={openBackdrop}
			>
			  <CircularProgress color="inherit" />
			</Backdrop>
		)

}
export default Main;