import './CustomerLogin.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { loginSuccess, loginFail, logout } from '../../redux/authSlice';
import {useNavigate,Link,useLocation} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CustomerLogin = () => {
  const BASE_URL = 'http://127.0.0.1:8000/';
  const [isFetching,setIsFetching] = useState(false);
  const [inputError,setInputError] = useState({'msg':"",'type':""})
  const [showPassword, setShowPassword] = useState(false)
  const [loginFormData,setLoginFormData] = useState({
          'email':'',
          'password':''
  })
  const user = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let targetUrl = useLocation().state;

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

    await axios.post(BASE_URL+'auth/jwt/create/',formData)
      .then(res=>{
        if(res.status===200){
          let userID = null;
          let accessToken = res.data.access;
          let jwt_data = res.data
            axios.get(BASE_URL+"auth/users/me/",{headers:{"Authorization" : `JWT ${accessToken}`}})
                .then(res=>{
                   userID = res.data.id;
                     axios.get(BASE_URL+`api/customer/${userID}`,{headers:{"Authorization" : `JWT ${accessToken}`}})
                        .then(res=>{
                          console.log(res)
                            dispatch(loginSuccess({...jwt_data,"user":res.data}));
                            setIsFetching(false);
                            if(!targetUrl){
                                targetUrl = "/";
                              }
                            navigate(targetUrl, {replace:true});
                        })
                        .catch(error=>{
                            setIsFetching(false);
                            alert('server error..!')
                        })
                })
                .catch(error=>{
                    setIsFetching(false);
                    alert('server error..!')
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
      window.scrollTo(0,0);
      document.title="Login in into yas | Log in or Sign up";
  },[])
  const buttonEnable = (loginFormData.email!='') && (loginFormData.password!='')
	return(
        <div className="container-fluid">
            <div className="login-container py-4">
            <div className="d-flex justify-content-center">
            <div className="card custom-shadow" >
              <div  className="card-body ">
              <h4 className="card-title text-heading">Log In</h4>
              <p className="fs-12">Don't have an account? <Link to="/customer/register" className="text-decoration-none">Sign up</Link></p>
              <form style={{maxWidth:'500px'}}>
                <TextField 
                color="error"
                type="email" 
                id="email-input" 
                name="email" 
                label="Email ID" 
                onChange={inputHandler} 
                value={loginFormData.email} 
                size="small"
                InputLabelProps={{style: {fontSize: '14px'}}}
                fullWidth 
                />
                  <FormControl fullWidth margin="normal" variant="outlined">
                      <InputLabel htmlFor="standard-adornment-password" className="fs-14">Password</InputLabel>
                      <OutlinedInput
                        size="small"
                        color="error"
                        id="standard-adornment-password"
                        name="password"
                        label="password" 
                        value={loginFormData.password}
                        onChange={inputHandler}
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
                :<div className="text-center">
                  {
                    buttonEnable
                    ?
                    <button type="submit" className="btn btn-pink mt-3 w-50 fs-14 py-2" onClick={submitHandler}>LOG IN</button>
                      :
                    <button type="submit" className="btn btn-danger rounded-15 mt-3 w-50 fs-14 py-2" disabled={true} onClick={submitHandler}>LOG IN</button>
                  }
                </div>
              }
                 {inputError.type!="" && <small className="text-danger fs-12">{inputError.msg}</small>}
              <div className="d-flex justify-content-end mt-2 fs-12"><Link to="/reset-password" className="text-decoration-none"><small>Forgot Password?</small></Link></div>
              </form>
          </div> 
          </div> 
          </div>
          </div> 

        </div>     
		)
}
export default CustomerLogin;