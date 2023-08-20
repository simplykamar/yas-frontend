import {useEffect,useState} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import {useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios';
import {loginSuccess,logout} from './redux/authSlice';

const Protected = (props) =>{
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const targetUrl = useLocation().pathname;
	const user = useSelector((state)=>state.auth);
	const {Component} = props;

	useEffect(()=>{
		if (!user.isAuthenticate){
				navigate("/customer/login",{replace:true,state:targetUrl});
		}
	},[]);

	return (
		<div>
			{
				user.isAuthenticate && <Component/>
			}		
		</div>
		);
}
export default Protected;