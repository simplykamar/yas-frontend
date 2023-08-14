import {useEffect} from 'react';
import { useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const IsLogin = (props) =>{
	const navigate = useNavigate();
	const user = useSelector((state)=>state.auth);
	const {Component} = props;
	useEffect(()=>{
		if (user.isAuthenticate){
				navigate("/",{replace:true});
		}
	},[]);
	return (
		<div>
			{
				!user.isAuthenticate && <Component/>
			}	
		</div>
		);
}
export default IsLogin;