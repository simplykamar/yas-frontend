import axios from 'axios';
import sidebarImg from '../../images/other/sidebar.svg'
import {Link} from 'react-router-dom';
import {useEffect,useState} from 'react';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import HambergerIcon from '../../images/logos/HambergerIcon.svg';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';          
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './Sidebar.css';
import mail from '../../images/logos/mail.jpg';
import phone from '../../images/logos/phone.png';
import toast, { Toaster } from 'react-hot-toast';

 const Sidebar = () => {
    // const BASE_URL = 'http://127.0.0.1:8000/api';
    const BASE_URL = 'https://simplykamar.tech/api';
    const [open, setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const [celebrateGift,setCelebrateGift] = useState([]);
    const notifyError = (msg) => toast.error(msg);

   function fetchCelebrateMilestoneGiftData(url){
        setLoading(true);
        axios.get(url)
        .then(response=>{
            // console.log(response);
            setCelebrateGift(response.data);
            setLoading(false);
        })
        .catch(error=>{
            notifyError('Server error..!');
            // console.log(error);
            setLoading(false);
        })
    }  
 useEffect(()=>{
  fetchCelebrateMilestoneGiftData(BASE_URL+'/celebrate-milestone-gift-items')
 },[])
  return (
    <div>
    <div><Toaster/></div>
      <SwipeableDrawer 
      open={open} anchor={"left"} 
      onClose={() => setOpen(false)} 
      onOpen={() => setOpen(true)}
      >
        <DialogTitle style={{width:'280px'}} className="d-flex justify-content-end px-0">
                 <div
                  style={{cursor:'pointer',padding:'10px',backgroundColor:'#e2e8f0',borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px'}}
                  onClick={() => setOpen(false)}
                 >
                   <ArrowBackIcon/>
                 </div>
            </DialogTitle>
      <div className="px-3">
      <List onClick={() => setOpen(false)} className="border p-0" >
      <div className="text-uppercase d-flex justify-content-around align-items-center py-1" style={{backgroundColor:'#e2e8f0'}}>
        <div className="text-heading">
          Celebrate Milestones
        </div>
        <div><img src={sidebarImg} className="img-fluid" width="30" height="30"/></div>
      </div>
        {
          !loading&&
          celebrateGift.map((item)=>{
            return(
              <div key={item.id}>
                <ListItem  button component={Link} to={`/category/${item.category.title}/${item.category.id}`}>
                  <ListItemText primary={item.title} primaryTypographyProps={{fontSize: '14px',textTransform:'capitalize'}}/>
                </ListItem>
              </div>
              )
          })
        } 
      </List>
      </div>
      <div className="px-3">
        <List onClick={() => setOpen(false)} className="">
      <div className="text-heading text-uppercase py-1" style={{backgroundColor:'#e2e8f0'}}>
        <div className="" style={{marginLeft:'10px'}}>
          need help?
        </div>
      </div>
      <ListItem  button>
         <img src={phone} className="img-fluid me-1" width='25' height='25'/>
          <ListItemText primary={"+91 9634142017"} primaryTypographyProps={{fontSize: '14px'}}/>
        </ListItem>
        <ListItem  button component={Link} to={'mailto:support@yasgifts.me'}>
         <img src={mail} className="img-fluid me-1" width='25' height='25'/>
          <ListItemText primary={"Contact@yasgifts.me"} primaryTypographyProps={{fontSize: '14px'}}/>
        </ListItem>
        </List>
      </div>
            <div className="px-3">
        <List onClick={() => setOpen(false)} className="">
      <div className="text-uppercase py-1" style={{backgroundColor:'#e2e8f0'}}>
        <div className="text-heading" style={{marginLeft:'10px'}}>
          follow us on
        </div>
      </div>
      <ListItem  button component={Link} to="https://instagram.com/yasgiftsindia" target="_blank" className="instagram-icon-text">
         <InstagramIcon className="sidebar-social-icon instagram-icon me-2" fontSize="large" />
          <ListItemText primary={"Instagram"} primaryTypographyProps={{fontSize: '14px'}}/>
        </ListItem>
        <ListItem  button component={Link} to="https://www.facebook.com/yasgiftsindia" target="_blank" className="facebook-icon-text">
         <FacebookOutlinedIcon className="sidebar-social-icon facebook-icon me-2"fontSize="large"  />
          <ListItemText primary={"Facebook"} primaryTypographyProps={{fontSize: '14px'}}/>
        </ListItem>
        <ListItem  button component={Link} to="https://x.com/yasgiftsindia" target="_blank" className="twitter-icon-text">
         <TwitterIcon className="sidebar-social-icon twitter-icon me-2" fontSize="large" />
          <ListItemText primary={"Twitter"} className="twitter-icon-text"  primaryTypographyProps={{fontSize: '14px'}}/>
        </ListItem>
        <ListItem  button component={Link} to="https://www.linkedin.com/company/yasgiftsindia" target="_blank" className="linkedin-icon-text">
         <LinkedInIcon className="sidebar-social-icon linkedin-icon me-2"fontSize="large" />
          <ListItemText primary={"LinkedIn"} className="linkedin-icon-text"  primaryTypographyProps={{fontSize: '14px'}}/>
        </ListItem>
        </List>
      </div>
      </SwipeableDrawer>
    <img src={HambergerIcon} onClick={() => setOpen(true)} className="mt-2 cursor-pointer"/>
    </div>
  );
}

export default Sidebar;