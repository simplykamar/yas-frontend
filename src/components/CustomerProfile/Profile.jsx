import './CustomerProfile.css';
import Sidebar from './Sidebar'
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import axios from 'axios';
import {updateUser} from '../../redux/authSlice';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';

const Profile = () => {
    const BASE_URL = 'https://simplykamar.tech/api';
    const [mobile,setMobile] = useState(null);
    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);
    const [loading, setLoading] = useState(true);
    const [user,setUser] = useState(useSelector((state)=>state.auth))
    const dispatch = useDispatch()
    const [errorMsg, setErrorMsg] = useState({msg:'',type:'',status:''});

    function addMobile(){
            const formData = new FormData();
            formData.append('mobile',mobile);
            axios.patch(BASE_URL+`/customer/${user.user.id}`,formData,{headers:{"Authorization" : `JWT ${user.access}`}})
            .then(response=>{
              notifySuccess("Mobile no. successfully added !")
              dispatch(updateUser({user:response.data}))
              setUser({...user,user:response.data})
              setErrorMsg({msg:'',type:'',status:''})
            })
            .catch(error=>{
              notifyError(error.response.data.mobile[0])
              if(error.response.status==400){
                setErrorMsg({msg:error.response.data.mobile,type:'error',status:400})
              }
          })
  }
  return(
        <div className="bg-light pb-4 pt-lg-4 pt-md-4">
              <div>
              <ToastContainer />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12 col-sm-12 d-none d-md-block d-lg-block">
                  <Sidebar/>
                </div>
                <div className="col-lg-9 col-md-9 col-12 col-sm-12 bg-white py-3">
                   <div className="row g-0">
                      <div className="col-lg-5 col-md-3 col-12 col-sm-12 d-flex justify-content-center">
                          <div className="profile-image">{user.user.user.name[0].toUpperCase()}</div>
                      </div>
                      <div className="col-lg-7 col-md-9 col-12 col-sm-12 text-secondary d-flex justify-content-center">
                         
                         <div className=" ">
                         <h4 className="text-uppercase text-dark text-center">{user.user.user.name}</h4> <hr/>
                         <p><MailOutlineOutlinedIcon className="me-2 "/> {user.user.user.email}</p>
                         {
                          user.user.mobile?
                         <p><CallOutlinedIcon className="me-2"/> +91{user.user.mobile}</p>
                         :
                         <p className="text-danger cursor-pointer " data-bs-toggle="modal" data-bs-target="#mobileaddModal"><CallOutlinedIcon className="me-2"/> Add mobile no.</p>
                         }
                         
                         <p><LocationOnOutlinedIcon className="me-2"/> India</p>
                         {
                          errorMsg.status==400&&
                          <p className="text-danger">{errorMsg.msg}</p>
                         }
                         <div className="modal" id="mobileaddModal">
                            <div className="modal-dialog">
                              <div className="modal-content">

                                {/* <!-- Modal Header --> */}
                                <div className="modal-header">
                                  <h4 className="modal-title">Add mobile no.</h4>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                {/* <!-- Modal body --> */}
                                <div className="modal-body">
                                <form>
                                   <div className="mt-3">
                                       <TextField
                                        color="error"
                                        type="number"
                                        onChange={(e)=>{setMobile(e.target.value)}}
                                        InputProps={{ inputProps: { min: 0 } }}
                                        name="mobile"
                                        fullWidth
                                        helperText="Please enter your mobile number"
                                        id="demo-helper-text-misaligned"
                                        label="Mobile No."
                                      />
                                    </div>
                                   </form>
                                </div>

                                {/* <!-- Modal footer --> */}
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-danger w-100 py-2 text-uppercase" onClick={addMobile} data-bs-dismiss="modal">Add mobile no.</button>
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