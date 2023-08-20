import {useState,useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { loginSuccess, loginFail, logout } from '../../redux/authSlice'
import {useParams} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {Link} from 'react-router-dom';

const CustomerAccountActivation = () => {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const BASE_URL = 'https://simplykamar.tech/';
  const {uid, token} = useParams()
  const [inputError,setInputError] = useState({'msg':"",'type':""})
  const [isFetching,setIsFetching] = useState(false);

      function activate(){
        setIsFetching(true);
        const formData = new FormData();
        formData.append('uid',uid);
        formData.append('token',token);
       axios.post(BASE_URL+'auth/users/activation/',formData)
      .then(res=>{
        if(res.status===204){
          notifySuccess("Account Activation successfully !")
          setInputError({'type':"success",'msg':["Account Activation successfully"," Now you can login to your account"]})
        }
        setIsFetching(false);

      })
      .catch(error=>{
        if(error.response.status===403){
          notifyError("Activation token expired !")
          setInputError({'type':"forbidden",'msg':["Activation token expired"]})
        }
        setIsFetching(false);

        })
      }
useEffect(()=>{
      document.title="Activate Your Account";
      window.scrollTo(0,0);
  },[])
	return(
    <div>
        <div>
              <ToastContainer />
            </div>
            <div className="my-4 d-flex align-items-center flex-column">
              <h4>Verify your Account:</h4>
              {
                isFetching?
                  <button className="mt-2 btn btn-primary " disabled>
                      <span className="spinner-border spinner-border-sm"> </span>
                       Loading..
                    </button>
                :
              <button onClick={activate} className="mt-2 px-5 btn btn-primary text-uppercase fw-bold px-4 py-2">verify</button>           
              }
                    { inputError.type=='success' &&
                      <div className="mt-3">
                      <small className=" text-success d-block">{inputError.msg[0]}</small>
                      <small className=" text-success d-block">{inputError.msg[1]}</small>
                      <Link to="/customer/login" className="mt-4  text-dark text-uppercase"><small>Login</small></Link>
                      </div>
                    }
                    { inputError.type=='forbidden' &&
                      <div className="mt-3">
                      <small className=" text-danger">{inputError.msg[0]}</small>
                      </div>
                    }
            </div>     
        </div>     
		)
}
export default CustomerAccountActivation;