import {useState,useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useNavigate,Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
  const BASE_URL = 'https://yasonlinegifting.pythonanywhere.com/';
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const {uid, token} = useParams()
  const [resetPasswordFormData,setResetPasswordFormData] = useState({
          'new_password':'',
          're_new_password':''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isFetching,setIsFetching] = useState(false);
  const [inputError,setInputError] = useState({'msg':"",'type':""})

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
          notifySuccess("password successfully changed.")
        }
        resetPasswordFormData('')
      })
      .catch(err=>{
        setIsFetching(false);
        if(err.response.data.token){
          notifyError("password reset link expired.!")
          setInputError({'msg':['password reset link expired!',],'type':'token'})

        }
        else if(err.response.data.new_password){
          setInputError({'msg':err.response.data.new_password,'type':'email'})
        }
        else if(err.response.data.non_field_errors){
          setInputError({'type':"non_field_errors",'msg':err.response.data.non_field_errors})
        }
      })
  }
  return(
       <div className="container-fluid bg-light">
            <div>
            <ToastContainer />
          </div>
            <div className="login-container py-4">
            <div className="d-flex justify-content-center">
            <div className="card custom-shadow" >
              <div  className="card-body ">
              <h5 className="card-title text-dark">Set your new password!</h5>
              <form style={{maxWidth:'500px'}} onSubmit={setNewPassword}>
              <FormControl fullWidth margin="normal" variant="standard">
                      <InputLabel htmlFor="standard-adornment-new-password">New Password</InputLabel>
                      <Input
                        id="standard-adornment-new-password"
                        name="new_password"
                        value={resetPasswordFormData.new_password}
                        onChange={inputHandler}
                        type={showPassword ? 'text' : 'password'}
                        
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal" variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                      <Input
                        id="standard-re-adornment-new-password"
                        name="re_new_password"
                        value={resetPasswordFormData.re_new_password}
                        onChange={inputHandler}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={()=>setShowPassword(true)}
                              onMouseDown={()=>setShowPassword(false)}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                        {
                        isFetching?
                          <button className="mt-3 btn btn-danger w-100 py-2" disabled>
                              <span className="spinner-border spinner-border-sm"> </span>
                               Loading..
                            </button>
                        :
                <button type="submit" className="btn btn-danger mt-3 w-100 py-2 text-uppercase">set password</button>
              }
               { inputError.type=='email' &&
                  <div className="mt-3">
                  <small className="text-danger d-block">{inputError.msg[0]}</small>
                  <small className="text-danger d-block">{inputError.msg[1]}</small>
                  <small className="text-danger d-block">{inputError.msg[2]}</small>
                  </div>
                }
                 { inputError.type=='non_field_errors' &&
                  <div className="mt-3">
                  <small className="text-danger">{inputError.msg[0]}</small>
                  </div>
                }
                { inputError.type=='token' &&
                  <div className="mt-3">
                  <small className="text-danger">{inputError.msg[0]}</small>
                  </div>
                }
              </form>
          </div> 
          </div> 
          </div>
          </div> 
        </div>   
    )
}

export default ForgotPassword;