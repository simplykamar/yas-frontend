import {useEffect} from 'react';
import { useSelector} from 'react-redux';
import {useNavigate,useLocation} from 'react-router-dom';

const Protected = (props) =>{
	const navigate = useNavigate();
	 const targetUrl = useLocation().pathname;
	const user = useSelector((state)=>state.auth);
	console.log("Protected Component ",user)
	console.log("Protected Component user id ",user.user)
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