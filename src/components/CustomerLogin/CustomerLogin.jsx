import {useState,useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { loginSuccess, loginFail, logout } from '../../redux/authSlice';
import {useNavigate,Link,useLocation} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import './CustomerLogin.css';
const CustomerLogin = () => {
  const navigate = useNavigate();
  let targetUrl = useLocation().state;
  if(!targetUrl){
        targetUrl="/";
      }
  const dispatch = useDispatch();
  const [baseUrl,setBaseUrl] = useState('http://127.0.0.1:8000/');
  const [loginFormData,setLoginFormData] = useState({
          'email':'',
          'password':''
  })
  const user = useSelector((state)=>state.auth);
  const [isFetching,setIsFetching] = useState(false);
  const [inputError,setInputError] = useState({'msg':"",'type':""})
  const [showPassword, setShowPassword] = useState(false)
  function inputHandler(event){
      setLoginFormData({
            ...loginFormData,
              [event.target.name]:event.target.value}
        )
  }
    async function submitHandler(event){
    setIsFetching(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append('email',loginFormData.email)
    formData.append('password',loginFormData.password)

    await axios.post(baseUrl+'auth/jwt/create/',formData)
      .then(res=>{
        if(res.status===200){
          let userID = null;
          let accessToken = res.data.access;
          let jwt_data = res.data
            axios.get(baseUrl+"auth/users/me/",{headers:{"Authorization" : `JWT ${accessToken}`}})
                .then(res=>{
                   userID = res.data.id;
                     axios.get(baseUrl+`api/customer/${userID}`,{headers:{"Authorization" : `JWT ${accessToken}`}})
                        .then(res=>{
                            dispatch(loginSuccess({...jwt_data,"user":res.data}));
                            setIsFetching(false);
                            navigate(targetUrl, {replace:true});
                        })
                        .catch(error=>{
                            setIsFetching(false);
                        })
                })
                .catch(error=>{
                            setIsFetching(false);
                });
        }
      })
      .catch(error=>{
        if(error.response.status===401){
            setInputError({'msg':"Invalid user name or password",'type':"error"})
        }
        setIsFetching(false);
      })
  }
  useEffect(()=>{
      document.title="Login in into yas | Log in or Sign up";

  },[])
  const buttonEnable = (loginFormData.email!='') && (loginFormData.password!='')
	return(
        <div className="container-fluid">
            <div className="login-container py-4">
            <div className="d-flex justify-content-center">
            <div className="card custom-shadow" >
              <div  className="card-body ">
              <h5 className="card-title text-dark">Sign in to complete your order</h5>
              <p>Don't have an account? <Link to="/customer/register" className="text-decoration-none">Sign up</Link></p>
              <form style={{maxWidth:'500px'}}>
                <TextField type="email" id="email-input" name="email" label="Email ID" onChange={inputHandler} value={loginFormData.email} fullWidth variant="standard" />
                  <FormControl fullWidth margin="normal" variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                      <Input
                        id="standard-adornment-password"
                        name="password"
                        value={loginFormData.password}
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
                <button type="submit" className="btn btn-danger mt-3 w-100 py-2" disabled={!buttonEnable} onClick={submitHandler}>SIGN IN</button>
              }
                 {inputError.type!="" && <small className="text-danger">{inputError.msg}</small>}
              <div className="d-flex justify-content-end mt-2"><Link to="/reset-password" className="text-decoration-none"><small>Forgot Password?</small></Link></div>
              </form>
          </div> 
          </div> 
          </div>
          </div> 

        </div>     
		)
}
export default CustomerLogin;