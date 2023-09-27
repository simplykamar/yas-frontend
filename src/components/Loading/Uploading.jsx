import React from 'react';
import {useState,useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import loading from '../../images/loading/loading.gif'

const Main = ({uploading}) => {
	const [openBackdrop, setOpenBackdrop] = useState(false);
 	const handleBackdropClose = () => {
	    setOpenBackdrop(false);
	  };
	const handleBackdropOpen = () => {
	    setOpenBackdrop(true);
	  };	

	function setBackdrop(){
		if(uploading){
	    	setOpenBackdrop(true);
		}
		else{
			setOpenBackdrop(false);
		}

	}
	useEffect(()=>{
		setBackdrop();
	},[uploading,])

	return(
          <Backdrop
			  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			  open={openBackdrop}
			>
			  <CircularProgress />
			  <img src={loading} className="img-fluid w-25" />
			  <p>Uploading...</p>

			</Backdrop>
		)

}
export default Main;