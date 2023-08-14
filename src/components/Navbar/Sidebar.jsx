import './Sidebar.css';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
import WifiCalling3TwoToneIcon from '@mui/icons-material/WifiCalling3TwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import SupportAgentTwoToneIcon from '@mui/icons-material/SupportAgentTwoTone';
import HambergerIcon from '../../images/logos/HambergerIcon.svg';
import {Link} from 'react-router-dom';
import {useState} from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';          
import sidebarImg from '../../images/other/sidebar.svg'

 const Sidebar = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <SwipeableDrawer 
      open={open} anchor={"left"} 
      onClose={() => setOpen(false)} 
      onOpen={() => setOpen(true)}
      >
        <DialogTitle style={{width:'280px'}} className="d-flex justify-content-end px-0">
                 <div
                  style={{padding:'10px',backgroundColor:'#e2e8f0',borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px'}}
                 >
                   <ArrowBackIcon
                  onClick={() => setOpen(false)} 
                  className="cursor-pointer"
                  />
                 </div>
            </DialogTitle>
      <div className="px-3">
      <List onClick={() => setOpen(false)} className="border p-0" >
      <div className="text-uppercase fw-bold text-dark py-2 d-flex justify-content-around" style={{backgroundColor:'#e2e8f0'}}>
        <p>
          Top Collections
        </p>
        <img src={sidebarImg} className="img-fluid"/>
      </div>
        <ListItem  button component={Link} to={'/category/same day delivery/15'}>
          <ListItemText primary={"Same Day Delivery Gifts"}/>
        </ListItem>
        <ListItem  button component={Link} to={'/category/cake/11'}>
          <ListItemText primary={"Birthday Gifts"}/>
        </ListItem>
        <ListItem  button component={Link} to={'/category/personalized/14'}>
          <ListItemText primary={"Personalized Gifts"}/>
        </ListItem>
        <ListItem  button component={Link} to={'/category/rakhi/8'}>
          <ListItemText primary={"Rakhi"}/>
        </ListItem>
      </List>
      </div>
      <div className="px-3">
      <List onClick={() => setOpen(false)} className="">
        <p className=" ms-2 my-2 fw-600 text-secondary text-uppercase">Personal occasions</p>
        <ListItem  button component={Link} to={'/category/plant/12'}>
          <ListItemText primary={"Plants Gifts"}/>
        </ListItem>
         <ListItem  button component={Link} to={'/category/anniversary/17'}>
          <ListItemText primary={"Anniversary Gifts"}/>
        </ListItem>
        <ListItem  button component={Link} to={'/category/wedding/16'}>
          <ListItemText primary={"Wedding & Engagement"}/>
        </ListItem>
        <ListItem  button component={Link} to={'/category/flowers/13'}>
          <ListItemText primary={"Best Wishes"}/>
        </ListItem>
      </List>
      </div>
      <div className="px-3">
        <List onClick={() => setOpen(false)} className="">
          <p className=" ms-2 my-2 fw-600 text-secondary text-uppercase">assistance</p>
          <ListItem  button component={Link} to={'/customer/profile'}>
          <PersonOutlineTwoToneIcon fontSize='small' className="me-2"/>
          <ListItemText primary={"Profile"}/>
        </ListItem>
         <ListItem  button component={Link} to={'/customer/orders'}>
         <LocalMallTwoToneIcon fontSize='small' className="me-2"/>
          <ListItemText primary={"Order History"}/>
        </ListItem>
         <ListItem  button component={Link} to={'/contact-us'}>
         <SupportAgentTwoToneIcon fontSize='small' className="me-2"/>
          <ListItemText primary={"Customer Service"}/>
        </ListItem>
        </List>
      </div>
      </SwipeableDrawer>
    <img src={HambergerIcon} onClick={() => setOpen(true)} className="mt-2 cursor-pointer"/>
    </div>
  );
}

export default Sidebar;