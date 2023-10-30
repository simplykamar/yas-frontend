import './CustomerProfile.css';
import Sidebar from './Sidebar'
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useState,useRef} from 'react';
import axios from 'axios';
import {updateUser} from '../../redux/authSlice';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
    const BASE_URL = 'https://simplykamar.tech/api';
    // const BASE_URL = 'http://127.0.0.1:8000/api';
    const [mobile,setMobile] = useState(null);
    const notifySuccess = (text) => toast.success(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
    const notifyError = (text) => toast.error(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
    const [loading, setLoading] = useState(true);
    const [user,setUser] = useState(useSelector((state)=>state.auth))
    const dispatch = useDispatch()
    const closeMobileModal = useRef();

    function addMobile(e){
      e.preventDefault()
    closeMobileModal.current.click()
            const formData = new FormData();
            formData.append('mobile',mobile);
            axios.patch(BASE_URL+`/customer/${user.user.id}`,formData,{headers:{"Authorization" : `JWT ${user.access}`}})
            .then(response=>{
              notifySuccess("Mobile no. successfully added !")
              dispatch(updateUser({user:response.data}))
              setUser({...user,user:response.data})
            })
            .catch(error=>{
              notifyError(error.response.data.mobile[0])
          })
  }
  return(
        <div className=" pb-4 pt-lg-4 pt-md-4">
          <div><Toaster/></div>
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12 col-sm-12 d-none d-md-block d-lg-block">
                  <Sidebar/>
                </div>
                <div className="col-lg-9 col-md-9 col-12 col-sm-12 ">
                   <div className="row g-0 ">
                      <div className="col-lg-3 col-md-3 col-12 col-sm-12 d-flex justify-content-center">
                          <div className="profile-image mt-2 mt-lg-0 mt-md-0">{user.user.user.name[0].toUpperCase()}</div>
                      </div>
                      <div className="col-lg-9 col-md-9 col-12 col-sm-12 text-secondary px-5">
                         <div className=" ">
                         <h2 className="fw-bold text-capitalize text-dark text-center d-lg-none d-md-none">{user.user.user.name}</h2>
                         <h2 className="fw-bold text-capitalize text-dark d-none d-lg-block d-md-block">{user.user.user.name}</h2> <hr/>
                         <p className="fs-14"><MailOutlineOutlinedIcon className="me-2 fs-14"/> {user.user.user.email}</p>
                         {
                          user.user.mobile?
                         <p className="fs-14"><CallOutlinedIcon className="me-2 fs-14"/> +91 {user.user.mobile}</p>
                         :
                         <p className="text-pink cursor-pointer fs-14" data-bs-toggle="modal" data-bs-target="#mobileaddModal">
                         <CallOutlinedIcon className="me-2 fs-14"/> Add mobile no.</p>
                         }
                         
                         <p className="fs-14"><LocationOnOutlinedIcon className="me-2 fs-14"/> India</p>
                         <div className="modal" id="mobileaddModal">
                            <div className="modal-dialog">
                              <div className="modal-content">

                                {/* <!-- Modal Header --> */}
                                <div className="modal-header" style={{border:'none'}}>
                                  <h4 className="modal-title text-heading text-dark">Add mobile No.</h4>
                                  <span ref={closeMobileModal} data-bs-dismiss="modal" className="cursor-pointer btn-close">
                                  </span> 
                                </div>

                                {/* <!-- Modal body --> */}
                                <div className="modal-body">
                                <form onSubmit={(e)=>{addMobile(e)}}>
                                   <div className="">
                                       <TextField
                                        color="error"
                                        type="number"
                                        onChange={(e)=>{setMobile(e.target.value)}}
                                        InputProps={{ inputProps: { min: 0 } }}
                                        name="mobile"
                                        fullWidth
                                        id="demo-helper-text-misaligned"
                                        label="Mobile No."
                                       InputLabelProps={{style: {fontSize: '14px'}}}
                                       size="small"
                                      />
                                    </div>
                                    <div className="text-center mt-3">
                                    <button type="submit" className="btn btn-pink py-2 w-25 text-uppercase fs-12">Submit</button>
                                  </div>
                                   </form>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                      </div>
                    </div>
                </div>
              </div>
          </div> 
        </div>     
    )
}
export default Profile;