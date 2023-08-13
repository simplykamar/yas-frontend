import {useEffect,useState} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import {useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios';
import {loginSuccess,logout} from './redux/authSlice';
const Protected = (props) =>{
	const BASE_URL = 'https://yasonlinegifting.pythonanywhere.com/';
	const dispatch = useDispatch();
	const navigate = useNavigate();
	 const targetUrl = useLocation().pathname;
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
			console.log("tokene xpired!");
			if(err.response.status===401){
				// refreshToken();
				dispatch(logout());
				navigate("/customer/login",{replace:true,state:targetUrl});
			}
		})
	}
	useEffect(()=>{
		if (!user.isAuthenticate){
				navigate("/customer/login",{replace:true,state:targetUrl});
		}
		else{
			verifyLoginToken();
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
export default Protected;