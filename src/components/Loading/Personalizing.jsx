import React from 'react';
import {useState,useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Main = ({personalizing}) => {
	const [openBackdrop, setOpenBackdrop] = useState(false);
 	const handleBackdropClose = () => {
	    setOpenBackdrop(false);
	  };
	const handleBackdropOpen = () => {
	    setOpenBackdrop(true);
	  };	

	function setBackdrop(){
		if(personalizing){
	    	setOpenBackdrop(true);
		}
		else{
			setOpenBackdrop(false);
		}

	}
	useEffect(()=>{
		setBackdrop();
	},[personalizing,])

	return(
          <Backdrop
			  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			  open={openBackdrop}
			>
			<Box className="text-center">
			  <CircularProgress color="inherit"/>
			  <p className="text-small text-center">Personalizing...</p>
		    </Box>
			</Backdrop>
		)

}
export default Main;