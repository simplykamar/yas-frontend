import {Helmet} from 'react-helmet';
import '../CustomerLogin/CustomerLogin.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import { useSelector} from 'react-redux';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CustomerRegister = () => {
  // const BASE_URL = 'http://127.0.0.1:8000/';
  const BASE_URL = 'https://simplykamar.tech/';
  const [registerFormData,setregisterFormData] = useState({
          'name':'',
          'email':'',
          // 'account_type':1,
          'password':'',
          're_password':'',
  });
  const [isFetching,setIsFetching] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [inputError,setInputError] = useState({'msg':"",'type':""});
  const user = useSelector((state)=>state.auth);

  function inputHandler(event){
      setregisterFormData({
            ...registerFormData,
              [event.target.name]:event.target.value
            }
        )
  }

  function submitHandler(event){
    setIsFetching(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append('name',registerFormData.name)
    formData.append('password',registerFormData.password)
    formData.append('re_password',registerFormData.re_password)
    formData.append('email',registerFormData.email)
    formData.append('account_type',1)

    axios.post(BASE_URL+'auth/users/',formData)
      .then(res=>{
        if(res.status===201){
        navigate("/customer/register/success", {replace:true,state:true});
        }
        setIsFetching(false);
      })
      .catch(error=>{
        if(error.response.data.password){
          setInputError({'type':"password",'msg':error.response.data.password})
        }
        else if(error.response.data.non_field_errors){
          setInputError({'type':"non_field_errors",'msg':error.response.data.non_field_errors})
        }
        else if(error.response.data.email){
          setInputError({'type':"email",'msg':error.response.data.email})
        }
        setIsFetching(false);
      })
  }
    useEffect(()=>{
      window.scrollTo(0,0);
      document.title="Login in into yas | Log in or Sign up";
      if (user.isAuthenticate){
          navigate("/", {replace:true});
      }
},[]);
 
  const buttonEnable = (registerFormData.name!='') && (registerFormData.password!='') &&
   (registerFormData.re_password!='')  && (registerFormData.email!='')

  return(
        <div className="container-fluid">
        <Helmet>
        <title>Login in into yasgifts | Log in or Sign up</title>
        <meta name="description" content="Log on to yasgifts to start gifting, gift, Personalized gifts to your Shopping Cart. Connect with your friends, family and people you know."
        />
        <meta
          name="keywords" 
          content="online gifts, online gift delivery, buy gifts online, online gift shop, send gifts, gifts to india, indian gift portal, indian gifts, send gifts to india, send gifts online, same day delivery, gift items online shopping, unique gifts online india, online gift shopping sites, best online gift sites, online shopping gift items, gift items online india, cheap gifts online, online gifts delivery in one day, online gift shopping, gift store, personalizable gift, personalize gift, personalized gift, yas gift yasgift, yasgifts"
          />
        </Helmet>
            <div className="py-4 login-container">
            <div className="d-flex justify-content-center">
            <div className="card custom-shadow" >
              <div className="card-body">
              <h4 className="card-title text-heading">Sign in to complete your order</h4>
              <p className="fs-12">Already have an account? <Link to="/customer/login" className="text-decoration-none">Log in</Link></p>
             </div> 
              <div  className="card-body pt-0">
              <form style={{maxWidth:'500px'}}>
                <TextField 
                color="error"
                id="name-input" 
                name="name" 
                label="Name" 
                onChange={inputHandler} 
                value={registerFormData.name} 
                InputLabelProps={{style: {fontSize: '14px'}}}
                fullWidth 
                size="small"
                />
                <TextField 
                color="error"
                type="email" 
                id="email-input" 
                margin="normal" 
                name="email" 
                label="Email ID" 
                onChange={inputHandler} 
                value={registerFormData.email} 
                InputLabelProps={{style: {fontSize: '14px'}}}
                fullWidth 
                size="small"
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                      <InputLabel htmlFor="standard-adornment-password" className="fs-14">Password</InputLabel>
                      <OutlinedInput
                        size="small"
                        id="standard-adornment-password"
                        name="password"
                        label="Password"
                        value={registerFormData.password}
                        onChange={inputHandler}
                        type={showPassword ? 'text' : 'password'}
                        color="error"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal" variant="outlined">
                      <InputLabel htmlFor="standard-adornment-password" className="fs-14">Confirm Password</InputLabel>
                      <OutlinedInput
                        size="small"
                        id="standard-re-adornment-password"
                        name="re_password"
                        label="Confirm Password"
                        value={registerFormData.re_password}
                        onChange={inputHandler}
                        type={showPassword ? 'text' : 'password'}
                        color="error"
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
                  {
                    buttonEnable
                    ?
                    <button type="submit" className="btn btn-pink mt-3 w-50 fs-14 py-2" onClick={submitHandler}>SIGN UP</button>
                      :
                    <button type="submit" className="btn btn-danger rounded-15 mt-3 w-50 fs-14 py-2" disabled={true} >SIGN UP</button>
                  }
                </div>
              }
                
                { inputError.type=='password' &&
                  <div className="mt-3">
                  <ul className="text-danger fs-12" >
                     {inputError.msg[0]&&<li><small>{inputError.msg[0]}</small></li>}
                     {inputError.msg[1]&&<li><small>{inputError.msg[1]}</small></li>}
                     {inputError.msg[2]&&<li><small>{inputError.msg[2]}</small></li>}
                  </ul>
                  </div>
                }
                { inputError.type=='non_field_errors' &&
                  <div className="mt-3">
                  <li className="text-danger fs-12"><small className="text-danger">{inputError.msg[0]}</small></li>
                  </div>
                }
                { inputError.type=='email' &&
                  <div className="mt-3">
                  <li className="text-danger fs-12"><small className="text-danger">{inputError.msg[0]}</small></li>
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
export default CustomerRegister;