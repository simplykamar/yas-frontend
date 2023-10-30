import './Contact.css'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const Contact =()=>{
    const BASE_URL = 'https://simplykamar.tech/api';
    // const BASE_URL = 'http://127.0.0.1:8000/api';
    const [user,setUser] = useState(useSelector((state)=>state.auth))
    const [isFetching,setIsFetching] = useState(false);
    const notifySuccess = (text) => toast.success(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
    const notifyError = (text) => toast.error(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
    const [contactUsFormData, setContactUSFormData] = useState({
        'name':'',
        'email':'',
        'mobile':'',
        'query':1,
        'msg':'',
    })
    const sendEmail = async (e) => {
        e.preventDefault()
        setIsFetching(true);
        const formData = new FormData();
        formData.append('name',contactUsFormData.name)
        formData.append('email',contactUsFormData.email)
        formData.append('mobile',contactUsFormData.mobile)
        formData.append('query',contactUsFormData.query)
        formData.append('msg',contactUsFormData.msg)
        formData.append('customer',user.user.id)
        await axios.post(BASE_URL+`/contact-us/`,formData,{headers:{"Authorization" : `JWT ${user.access}`}})
        .then(response=>{
            // console.log(response)
            notifySuccess("Ticket Raised! Check your mail");
            setContactUSFormData({
                'name':'',
                'email':'',
                'mobile':'',
                'query':1,
                'msg':'',
                });
          setIsFetching(false);
        })
        .catch(err=>{
            // console.log(err)
            if(err.response.data.msg){
                notifyError(err.response.data.msg)
            }
            else{
            notifyError('Error try again!')
            }
              setIsFetching(false);
        })
    };

    function inputHandler(event)
    {
        setContactUSFormData({...contactUsFormData,
              [event.target.name]:event.target.value});
    }
     useEffect(()=>{
      document.title="Contact US | yas";
      window.scrollTo(0,0);
      },[]);
    return(
        <div>
            <div><Toaster/></div>
            <div className="container-fluid px-lg-5 px-md-5 py-3 text-dark" id='contact'>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 ">
                    <div >
                        <h4 className='text-heading'>Contact Us!</h4>
                        <p className='fs-12'>It is very important to us to keep in touch with you, so we are always ready to answer any question that interests you. Shoot!</p>
                    </div>
                    
                    <div className='contact mt-4' >  
                        <p className='fw-600 m-0 fs-14'>Email:</p>
                        <a href="mailto:kamar@yasgifts.me" className='d-block fs-12 m-0' style={{color:'var(--gray)'}} >kamar@yasgifts.me</a>
                        <a href="mailto:contact@yasgifts.me" className='d-block fs-12 mt-1' style={{color:'var(--gray)'}} >contact@yasgifts.me</a>
                    </div>

                    <div className='contact mt-4'>
                        <p className='fw-600 m-0 fs-14'>Phone:</p>
                        <p className='d-block fs-12 m-0' style={{color:'var(--gray)'}} >+91 9634142017</p>
                        <p className='d-block fs-12 m-0' style={{color:'var(--gray)'}} >+91 9839193615</p>
                        <p className='d-block text-secondary' style={{fontSize:'10px'}}>(9 AM to 10 PM throuhout the week)</p>
                    </div>
                    <div className='contact mt-4 '>
                        <p className='fw-600 m-0 fs-14'>Address:</p>
                            <p className="fs-12">Unit no 2 , A wing<br/>
                                2nd Floor , Sheesh Mahal<br/>
                                near Clock Tower ,<br/>
                                Lucknow - 226003<br/>
                                Uttar Pradesh</p>
                    </div>
                </div>
                <div className=" col-lg-6 col-md-6 col-sm-12 col-12">
                    <form  className='form-wrapper' onSubmit={sendEmail}>
                        <h4 className="text-heading">Raise a ticket</h4>
                        <Box sx={{ minWidth: 120 }} className="mt-3">
                        <FormControl  fullWidth id="contact-us-focus">
                          <InputLabel id="contact-us" size="small"  >
                          Type of Query</InputLabel>
                          <Select
                            name='query'
                            labelId="contact-us"
                            id="contact-us-select"
                            value={contactUsFormData.query}
                            label="Type of Query"
                            onChange={inputHandler}
                            size="small"
                          >
                            <MenuItem value={1}>Payment Related</MenuItem>
                            <MenuItem value={2}>I want to place a new order</MenuItem>
                            <MenuItem value={3}>Complaint</MenuItem>
                            <MenuItem value={4}>Website Tech Issues</MenuItem>
                            <MenuItem value={5}>Other</MenuItem>
                            <MenuItem value={6}>Order Related</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                    <div className="mt-3">
                      <TextField
                     onChange={inputHandler}
                     name="name"
                     fullWidth
                     label="Full Name"
                     size="small"
                     value={contactUsFormData.name}
                    InputLabelProps={{style: {fontSize: '14px'}}}
                     />
                   </div>

                   <div className="mt-3">
                      <TextField
                     type="email"
                     onChange={inputHandler}
                     name="email"
                     fullWidth
                     label="Email"
                     size="small"
                     value={contactUsFormData.email}
                    InputLabelProps={{style: {fontSize: '14px'}}}
                     />
                   </div>

                   <div className="mt-3">
                      <TextField
                     type="number"
                     onChange={inputHandler}
                     name="mobile"
                     fullWidth
                     label="Mobile No"
                     size="small"
                     value={contactUsFormData.mobile}
                    InputLabelProps={{style: {fontSize: '14px'}}}
                     />
                   </div>

                   <div className="mt-3">
                      <TextField
                     onChange={inputHandler}
                     name="msg"
                     fullWidth
                     label="Message"
                     multiline={true}
                     minRows={3}
                     size="small"
                     value={contactUsFormData.msg}
                     InputLabelProps={{style: {fontSize: '14px'}}}
                     />
                   </div>
                    {
                isFetching?
                <div className="text-center">
                  <button className='mt-3 rounded-15 btn fw-bold fs-14 btn-danger py-2 text-uppercase' disabled>
                      <span className="spinner-border spinner-border-sm"> </span>
                       Loading...
                    </button>
                </div>
                :
                <div className="text-center">
                    <button className='mt-3 fs-14 btn btn-pink py-2 text-uppercase'>Send Message</button>  
                </div>
              }
                    </form>
                
                </div>
            </div>
        </div>
        </div>
    )
}
export default Contact;