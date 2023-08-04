import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import { useSelector} from 'react-redux';

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

    useEffect(()=>{
    if (user.isAuthenticate){
        navigate("/", {replace:true});
    }
},[]);
  const [inputError,setInputError] = useState({'msg':"",'type':""})
  function inputHandler(event){
      setregisterFormData({
            ...registerFormData,
              [event.target.name]:event.target.value}
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
        navigate("/customer/register/success", {replace:true});
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
              <div  className="card-body">
              <form>
                 <div className="form-floating">
                  <input type="text" name="name" id="floatingInputNameGrid" onChange={inputHandler} className="form-control"  placeholder="Enter Name"/>
                  <label htmlFor="floatingInputNameGrid">Name*</label>
                </div>
                <div className="form-floating mt-4">
                  <input type="email" name="email" id="floatingInputEmailGrid" onChange={inputHandler} className="form-control"  placeholder=" "/>
                  <label htmlFor="floatingInputEmailGrid">Email address*</label>
                </div>
                {/* <div className="form-group mt-4"> */}
                {/*   <select name="account_type" defaultValue={0} onChange={inputHandler} className="form-select" aria-label="Default select example"> */}
                {/*     <option value={0}>Select account type</option> */}
                {/*     <option value={1}>Customer</option> */}
                {/*     <option value={2}>Seller</option> */}
                {/*   </select> */}
                {/* </div> */}
                <div className="form-floating mt-4">
                  <input type="password" id="floatingInputPasswordGrid" name="password" onChange={inputHandler} className="form-control" placeholder=" "/>
                  <label htmlFor="floatingInputPasswordGrid">Password*</label>
                </div>
                <div className="form-floating mt-4">
                  <input type="password" id="floatingInputCnfPasswordGrid" name="re_password" onChange={inputHandler} className="form-control" placeholder=" "/>
                  <label htmlFor="floatingInputCnfPasswordGrid">Confirm Password*</label>
                </div>
                
                 {
                isFetching?
                  <button className="mt-3 btn btn-pink w-100 py-2" disabled>
                      <span className="spinner-border spinner-border-sm"> </span>
                       Loading..
                    </button>
                :
                <button type="submit" onClick={submitHandler} disabled={!buttonEnable} className="btn btn-pink mt-3 w-100 py-2">SIGN UP</button>
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