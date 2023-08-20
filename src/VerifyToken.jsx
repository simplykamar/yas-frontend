import {useEffect,useState} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {loginSuccess,logout} from './redux/authSlice';

const VerifyToken = (props) =>{
	const BASE_URL = 'http://3.25.71.133/';
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state)=>state.auth);
	const {Component} = props;
	const [tokenChecked,setTokenChecked] = useState(false);
// 
// 	async function refreshToken(){
// 
// 		const formData = new FormData();
// 		formData.append('refresh',user.refresh)
// 		await axios.post(BASE_URL+'auth/jwt/refresh/',formData)
// 		.then(response=>{
// 			console.log("token generated!");
// 			console.log(response);
// 			user.access = response.data.access;
// 			user.refresh = response.data.refresh;
// 			dispatch(loginSuccess(user));
// 			setTokenChecked(true);
// 		})
// 		.catch(err=>{
// 			setTokenChecked(true);
// 			console.log(err)
// 			})
// 	}
	async function verifyLoginToken(){
		const formData = new FormData();
		formData.append('token',user.access)
		await axios.post(BASE_URL+'auth/jwt/verify/',formData)
		.then(response=>{
			if(response.status===200){
				console.log("token still valid");
				setTokenChecked(true);
			}
		})
		.catch(err=>{
			console.log("tokene expired!");
			if(err.response.status===401){
				// refreshToken();
				dispatch(logout());
				setTokenChecked(true);
			}
		})
	}
	useEffect(()=>{
		if (user.isAuthenticate){
			verifyLoginToken();
		}
		else{
			setTokenChecked(true);
		}
	},[]);

	return (
		<div>
			{
				tokenChecked && <Component/>
			}		
		</div>
		);
}
export default VerifyToken;