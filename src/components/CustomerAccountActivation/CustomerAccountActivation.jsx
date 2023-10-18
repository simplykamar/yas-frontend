import {useState,useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { loginSuccess, loginFail, logout } from '../../redux/authSlice'
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';

const CustomerAccountActivation = () => {
  // const BASE_URL = 'https://simplykamar.tech/';
  const BASE_URL = 'http://127.0.0.1:8000/';

  const {uid, token} = useParams()
  const [isFetching,setIsFetching] = useState(false);
  const [isActivate,setIsActivate] = useState(false);
  const [isActivatationValid,setIsActivatationValid] = useState(true);

      function activate(){
        setIsFetching(true);
        const formData = new FormData();
        formData.append('uid',uid);
        formData.append('token',token);
       axios.post(BASE_URL+'auth/users/activation/',formData)
          .then(res=>{
            if(res.status===204){
              setIsActivatationValid(false)
              setIsActivate(true)
            }
            setIsFetching(false);
          })
          .catch(error=>{
            if(error.response.status===403){
              alert('activation token expire')
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
            </div>
            <div className="my-4 d-flex align-items-center flex-column">
              <h4 className="text-heading">Verify your Account:</h4>
              {
                isFetching?
                  <div className="text-center">
                   <button className="mt-3 btn btn-danger py-2 rounded-15 fs-14" disabled>
                       <span className="spinner-border spinner-border-sm"></span> Loading..
                     </button>
                    </div>
                :
                <div className="text-center">
                  {
                    isActivatationValid
                      ?
                        <button type="submit" className="btn btn-pink mt-3 fs-14 py-2" onClick={activate} >VERIFY</button>
                      :
                      isActivate
                      &&
                        <div className='text-center'>
                        <button type="submit" className="btn btn-danger rounded-15 mt-3 fs-14 py-2 fw-bold" disabled={true} >VERIFY</button>
                          <p className="text-success mt-3 px-4 m-0" style={{fontSize:'10px'}}>Account Activation Successful.</p>
                          <small className="text-success px-4" style={{fontSize:'10px'}}>You can now login to your Account.</small>
                         <div className="mt-3 text-center">
                            <Link to="/customer/login" className="btn btn-dark bg-white text-dark rounded-15 fs-12 text-uppercase">Login</Link>
                          </div>
                        </div>  
                  }
                </div>
              }
            </div>     
        </div>     
    )
}
export default CustomerAccountActivation;