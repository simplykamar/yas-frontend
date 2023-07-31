import {useEffect} from 'react';
import { useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';


const Protected = (props) =>{
	const navigate = useNavigate();
	const user = useSelector((state)=>state.auth);
	console.log("Protected Component ",user)
	console.log("Protected Component user id ",user.user)
	const {Component} = props;
	useEffect(()=>{
		if (!user.isAuthenticate){
				navigate("/customer/login",{replace:true});
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