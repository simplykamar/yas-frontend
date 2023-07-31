import {useState,useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { loginSuccess, loginFail, logout } from '../../redux/authSlice'
import {useParams} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const CustomerAccountActivation = () => {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const [baseUrl,setBaseUrl] = useState('http://127.0.0.1:8000/');
  const {uid, token} = useParams()
  const [inputError,setInputError] = useState({'msg':"",'type':""})
  const [isFetching,setIsFetching] = useState(false);

      function activate(){
        setIsFetching(true);
        const formData = new FormData();
        formData.append('uid',uid);
        formData.append('token',token);
       axios.post(baseUrl+'auth/users/activation/',formData)
      .then(res=>{
        console.log(res);
        if(res.status===204){
          notifySuccess("Account Activation successfully !")
          setInputError({'type':"success",'msg':["Account Activation successfully","Now you can login to your account"]})
        }
        setIsFetching(false);

      })
      .catch(error=>{
        if(error.response.status===403){
          notifyError("Activation token expired !")
          setInputError({'type':"forbidden",'msg':["Activation token expired"]})
        }
        console.log(error);
        setIsFetching(false);

        })
      }

	return(
    <div>
        <div>
              <ToastContainer />
            </div>
            <div className="mt-5 d-flex align-items-center flex-column">
              <h4>Verify your Account:</h4>
              {
                isFetching?
                  <button className="mt-2 btn btn-primary " disabled>
                      <span className="spinner-border spinner-border-sm"> </span>
                       Loading..
                    </button>
                :
              <button onClick={activate} className="mt-2 btn btn-primary text-uppercase fw-bold px-4 py-2">verify</button>           
              }
              
              
                    { inputError.type=='success' &&
                      <div className="mt-3">
                      <p className=" text-success">{inputError.msg[0]}</p>
                      <p className=" text-success">{inputError.msg[1]}</p>
                      </div>
                    }
                    { inputError.type=='forbidden' &&
                      <div className="mt-3">
                      <p className=" text-danger">{inputError.msg[0]}</p>
                      </div>
                    }
            </div>     
        </div>     
		)
}
export default CustomerAccountActivation;