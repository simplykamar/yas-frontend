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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Contact =()=>{
    const BASE_URL = 'https://yasonlinegifting.pythonanywhere.com/api';
    const [user,setUser] = useState(useSelector((state)=>state.auth))
    const [isFetching,setIsFetching] = useState(false);
    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);
    const [contactUsFormData, setContactUSFormData] = useState({
        'name':'',
        'email':'',
        'mobile':'',
        'query':'',
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
            notifySuccess("Ticket Raised! Check your mail");
            setContactUSFormData({
                'name':'',
                'email':'',
                'mobile':'',
                'query':'',
                'msg':'',
                })
        })
        .catch(err=>{
            notifyError('Error try again!')
              setIsFetching(false);
        })
          setIsFetching(false);
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
        <ToastContainer />
            <div className="container-fluid px-lg-5 px-md-5 py-4 text-dark" id='contact'>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 ">
                    <div >
                        <h2 className=''>Contact Us!</h2>
                        <p className=''>It is very important to us to keep in touch with you, so we are always ready to answer any question that interests you. Shoot!</p>
                    </div>
                    
                    <div className='contact mt-4' >  
                        <p className='fw-600 m-0'>Email:</p>
                        <small className=' ' style={{color:'var(--gray)'}} >workwithkamar@gmail.com</small>
                    </div>

                    <div className='contact mt-4'>
                        <p className='fw-600 m-0'>Phone:</p>
                        <small className='d-block' style={{color:'var(--gray)'}} >+91 9634142017</small>
                        <small className='d-block' style={{color:'var(--gray)'}} >+91 9045371255</small>
                        <small className='d-block text-secondary' >(9 AM to 10 PM throuhout the week)</small>
                    </div>
                    <div className='contact mt-4 '>
                        <p className='fw-600 m-0'>Address:</p>
                        
                            <small>unit no 2 , A wing<br/>
                                2nd Floor , Sheesh Mahal<br/>
                                near Clock Tower ,<br/>
                                Lucknow - 226003<br/>
                                Uttarpradesh</small>
                    </div>
                    <div className='my-4'>
                        <h4>Social:</h4>
                        <div className='icon'>
                        <a href="#"><FacebookRoundedIcon className='m-icon'/></a>
                        <a href="#"><InstagramIcon  className='m-icon'/></a>
                        <a href="#"><TwitterIcon  className='m-icon'/></a>
                        <a href="#"> <LinkedInIcon  className='m-icon'/>  </a>             
                        </div>
                    </div>
                </div>
                <div className=" col-lg-6 col-md-6 col-sm-12 col-12">
                    <form  className=' form-wrapper' onSubmit={sendEmail}>
                        <h4 className="pb-4">Raise a ticket</h4>
                        <Box sx={{ minWidth: 120 }}>
                        <FormControl  fullWidth id="contact-us-focus">
                          <InputLabel id="contact-us"  >
                          Type of Query</InputLabel>
                          <Select
                            name='query'
                            required={true}
                            labelId="contact-us"
                            id="contact-us-select"
                            value={contactUsFormData.query}
                            label="Type of Query"
                            onChange={inputHandler}
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
                     required={true}
                     value={contactUsFormData.name}
                     />
                   </div>

                   <div className="mt-3">
                      <TextField
                     type="email"
                     onChange={inputHandler}
                     name="email"
                     fullWidth
                     label="Email"
                     required={true}
                     value={contactUsFormData.email}
                     />
                   </div>

                   <div className="mt-3">
                      <TextField
                     type="number"
                     onChange={inputHandler}
                     name="mobile"
                     fullWidth
                     label="Mobile No"
                     required={true}
                     value={contactUsFormData.mobile}
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
                     required={true}
                     value={contactUsFormData.msg}
                     />
                   </div>
                    
                    {
                isFetching?
                  <button className='mt-3 btn btn-danger w-100 py-3 text-uppercase' disabled>
                      <span className="spinner-border spinner-border-sm"> </span>
                       Loading..
                    </button>
                :
                    <button className='mt-3 btn btn-danger w-100 py-3 text-uppercase'>Send Message</button>  
              }
                    </form>
                
                </div>
            </div>
        </div>
        </div>
    )
}
export default Contact;