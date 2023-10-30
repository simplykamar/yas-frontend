import {useState,useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useNavigate,Link} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import toast, { Toaster } from 'react-hot-toast';

const ForgotPassword = () => {
  const BASE_URL = 'https://simplykamar.tech/';
  // const BASE_URL = 'http://127.0.0.1:8000/';
  const [resetPasswordFormData,setResetPasswordFormData] = useState({
          'new_password':'',
          're_new_password':''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isFetching,setIsFetching] = useState(false);
  const [inputError,setInputError] = useState({'msg':"",'type':""})
  const {uid, token} = useParams()
  const notifySuccess = (text) => toast.success(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
  const notifyError = (text) => toast.error(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
 
  function inputHandler(event){
      setResetPasswordFormData({
            ...resetPasswordFormData,
              [event.target.name]:event.target.value}
        )
  }
  async function setNewPassword(e){
    setIsFetching(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('uid',uid)
    formData.append('token',token)
    formData.append('new_password',resetPasswordFormData.new_password)
    formData.append('re_new_password',resetPasswordFormData.re_new_password)

      await axios.post(BASE_URL+`auth/users/reset_password_confirm/`,formData)
      .then(response=>{
        setIsFetching(false);
        if(response.status===204){
          setResetPasswordFormData({
          'new_password':'',
          're_new_password':''
        });
          setInputError({'msg':'password successfully changed','type':'success'});
        }
        setResetPasswordFormData({
          'new_password':'',
          're_new_password':''
        });
        notifySuccess("Password successfully changed!")
      })
      .catch(err=>{
        setIsFetching(false);
        if(err.response.data.token){
          setInputError({'msg':['password reset link expired!',],'type':'token'})

        }
        else if(err.response.data.new_password){
          setInputError({'msg':err.response.data.new_password,'type':'email'})
        }
        else if(err.response.data.non_field_errors){
          setInputError({'type':"non_field_errors",'msg':err.response.data.non_field_errors})
        }
        else{
          // console.log(err)
          notifyError("Invalid user id or user doesn't exist.")
        }
      })
  }
  useEffect(()=>{
      document.title="Login in into yas | Log in or Sign up";

  },[])
    const buttonEnable =(resetPasswordFormData.new_password!='') && (resetPasswordFormData.re_new_password!='') 
  return(
       <div className="container-fluid">
       <div><Toaster/></div>
            <div className="login-container py-4">
            <div className="d-flex justify-content-center">
            <div className="card custom-shadow" >
              <div  className="card-body ">
              <h4 className="card-title text-heading">Set your new password!</h4>
              <form style={{maxWidth:'500px'}} onSubmit={setNewPassword}>
              <FormControl fullWidth margin="normal" variant="outlined">
                      <InputLabel htmlFor="standard-adornment-new-password" className="fs-14">New Password</InputLabel>
                      <OutlinedInput
                        label="new password"
                        size="small"
                        id="standard-adornment-new-password"
                        name="new_password"
                        value={resetPasswordFormData.new_password}
                        onChange={inputHandler}
                        type={showPassword ? 'text' : 'password'}
                        color="error"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal" variant="outlined">
                      <InputLabel htmlFor="standard-adornment-password" className="fs-14">Confirm Password</InputLabel>
                      <OutlinedInput
                        label="confirm password"
                        size="small"
                        id="standard-re-adornment-new-password"
                        name="re_new_password"
                        value={resetPasswordFormData.re_new_password}
                        onChange={inputHandler}
                        color="error"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={()=>setShowPassword(true)}
                              onMouseDown={()=>setShowPassword(false)}
                              size="small"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                        {
                        isFetching?
                         <div className="text-center">
                          <button className="mt-3 btn btn-danger w-50 py-2 rounded-15 fs-14" disabled>
                              <span className="spinner-border spinner-border-sm"></span> Loading..
                            </button>
                           </div>
                        :
                        <div className="text-center">
                        { inputError.type=='success' &&
                  <div className="">
                  <ul className="text-success text-start">
                   <li><small className="fs-12">{inputError.msg}</small></li>
                   </ul>
                  </div>
                }
                  {
                    buttonEnable
                    ?
                    <button type="submit" className="btn btn-pink mt-3 w-50 fs-14 py-2" >set password</button>
                      :
                    <button type="submit" className="btn btn-danger rounded-15 mt-3 w-50 fs-14 py-2" disabled={true} >set password</button>
                  }
                </div>
              }
               { inputError.type=='email' &&
                  <div className="mt-3">
                  <ul className="text-danger">
                   <li><small className="fs-12">{inputError.msg[0]}</small></li>
                   <li><small className="fs-12">{inputError.msg[1]}</small></li>
                   <li><small className="fs-12">{inputError.msg[2]}</small></li>
                   </ul>
                  </div>
                }
                 { inputError.type=='non_field_errors' &&
                  <div className="mt-3">
                  <li className="text-danger fs-12"><small >{inputError.msg[0]}</small></li>
                  </div>
                }
                { inputError.type=='token' &&
                  <div className="mt-3">
                  <li className="text-danger fs-12"><small >{inputError.msg[0]}</small></li>
                  </div>
                }
                  <div className="mt-2 text-center text-secondary">
                  <p className="fs-12">or login to continue</p>
                </div>
                <div className="mt-3 text-center">
                  <Link to="/customer/login" className="btn btn-dark bg-white text-dark w-50 rounded-15 fs-12 text-uppercase">Login</Link>
                   </div>
              </form>
          </div> 
          </div> 
          </div>
          </div> 
        </div>   
    )
}

export default ForgotPassword;