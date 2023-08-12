import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import { useSelector} from 'react-redux';
import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CustomerRegister = () => {
  const [baseUrl,setBaseUrl] = useState('https://yasonlinegifting.pythonanywhere.com/');
  const [registerFormData,setregisterFormData] = useState({
          'name':'',
          'email':'',
          // 'account_type':1,
          'password':'',
          're_password':'',
  });
    const navigate = useNavigate();
    const user = useSelector((state)=>state.auth);
    const [isFetching,setIsFetching] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    useEffect(()=>{
    if (user.isAuthenticate){
        navigate("/", {replace:true});
    }
},[]);
  const [inputError,setInputError] = useState({'msg':"",'type':""})
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
    console.log(formData)

    axios.post(baseUrl+'auth/users/',formData)
      .then(res=>{
        console.log(res);
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
        console.log(error)
        setIsFetching(false);
      })
  }
  console.log(registerFormData)
  const buttonEnable = (registerFormData.name!='') && (registerFormData.password!='') &&
   (registerFormData.re_password!='')  && (registerFormData.email!='')
	return(
        <div className="container-fluid">
            <div className="py-4 login-container">
            <div className="d-flex justify-content-center">
            <div className="card custom-shadow" >
              <div className="card-body">
              <h5 className="card-title text-dark">Sign in to complete your order</h5>
              <p>Already have an account? <Link to="/customer/login" className="text-decoration-none">Sign in</Link></p>
             </div> 
              <div  className="card-body pt-0">
              <form style={{maxWidth:'500px'}}>
                <TextField id="name-input" name="name" label="Name" onChange={inputHandler} value={registerFormData.name} fullWidth variant="standard" />
                <TextField id="email-input" margin="normal" name="email" label="Email ID" onChange={inputHandler} value={registerFormData.email} fullWidth variant="standard" />
                <FormControl fullWidth margin="normal" variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                      <Input
                        id="standard-adornment-password"
                        name="password"
                        value={registerFormData.password}
                        onChange={inputHandler}
                        type={showPassword ? 'text' : 'password'}
                        
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal" variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                      <Input
                        id="standard-re-adornment-password"
                        name="re_password"
                        value={registerFormData.re_password}
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
                <button type="submit" onClick={submitHandler} disabled={!buttonEnable} className="btn btn-danger mt-3 w-100 py-2">SIGN UP</button>
              }
                
                { inputError.type=='password' &&
                  <div className="mt-3">
                  <small className="text-danger">{inputError.msg[0]}</small>
                  <small className="text-danger">{inputError.msg[1]}</small>
                  <small className="text-danger">{inputError.msg[2]}</small>
                  </div>
                }
                { inputError.type=='non_field_errors' &&
                  <div className="mt-3">
                  <small className="text-danger">{inputError.msg[0]}</small>
                  </div>
                }
                { inputError.type=='email' &&
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
export default CustomerRegister;