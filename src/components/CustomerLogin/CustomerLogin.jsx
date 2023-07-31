import {useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { loginSuccess, loginFail, logout } from '../../redux/authSlice';
import {useNavigate,Link} from 'react-router-dom';
import './CustomerLogin.css';
const CustomerLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [baseUrl,setBaseUrl] = useState('http://127.0.0.1:8000/');
  const [loginFormData,setLoginFormData] = useState({
          'email':'',
          'password':''
  })
    const user = useSelector((state)=>state.auth);
    console.log(user)
  const [isFetching,setIsFetching] = useState(false);
  const [inputError,setInputError] = useState({'msg':"",'type':""})
  function inputHandler(event){
      setLoginFormData({
            ...loginFormData,
              [event.target.name]:event.target.value}
        )
  }

    function submitHandler(event){
    setIsFetching(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append('email',loginFormData.email)
    formData.append('password',loginFormData.password)

    axios.post(baseUrl+'auth/jwt/create/',formData)
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
                            navigate("/", {replace:true});
                        })
                        .catch(error=>{
                          console.log(error);
                        })
                })
                .catch(error=>{
                  console.log(error);
                });
        }
        setIsFetching(false);
      })
      .catch(error=>{
        if(error.response.status===401){
            setInputError({'msg':"Invalid user name or password",'type':"error"})
           console.log(error)
           console.log(error.response.status);
        }
        setIsFetching(false);
      })
  }
  const buttonEnable = (loginFormData.email!='') && (loginFormData.password!='')
	return(
        <div className="container-fluid">
            <div className="login-container pt-5">
            <div className="d-flex justify-content-center">
            <div className="card custom-shadow" style={{minWidth:'400px'}}>
              <div  className="card-body">
              <h4 className="card-title text-dark">Sign in to complete your order</h4>
              <p>Don't have an account? <Link to="/customer/register" className="text-decoration-none">Sign up</Link></p>
              <form>
                 <div className="form-floating">
                  <input type="email" name="email" value={loginFormData.email} id="floatingInputEmailGrid" onChange={inputHandler} className="form-control"  placeholder="Enter Email id"/>
                  <label htmlFor="floatingInputEmailGrid">Email id*</label>
                </div>
                <div className="form-floating mt-4">
                  <input type="password" name="password" value={loginFormData.password} id="floatingInputPwdGrid" onChange={inputHandler} className="form-control"  placeholder="password"/>
                  <label htmlFor="floatingInputPwdGrid">Password*</label>
                </div>
                {
                isFetching?
                  <button className="mt-3 btn btn-pink w-100 py-2" disabled>
                      <span className="spinner-border spinner-border-sm"> </span>
                       Loading..
                    </button>
                :
                <button type="submit" className="btn btn-pink mt-3 w-100 py-2" disabled={!buttonEnable} onClick={submitHandler}>SIGN IN</button>
              }
                 
                 {inputError.type!="" && <p className="text-danger">{inputError.msg}</p>}
              </form>
          </div> 
          </div> 
          </div>
          </div> 

        </div>     
		)
}
export default CustomerLogin;