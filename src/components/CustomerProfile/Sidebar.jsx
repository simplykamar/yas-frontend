import {NavLink} from 'react-router-dom';
import { logout } from '../../redux/authSlice'
import {useDispatch} from 'react-redux';
import './CustomerProfile.css';
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';

const Sidebar = () => {
  const dispatch = useDispatch();

	return(
        <div className="container sticky-top" style={{zIndex:'999'}}>
            <div className="list-group shadow">
                <NavLink activeclassname="active" to="/customer/profile" className="list-group-item sidebar-active py-2" style={{border:'0'}}><AccountCircleOutlinedIcon fontSize="small"/> Profile</NavLink>
                <NavLink activeclassname="active" to="/customer/orders" className="list-group-item sidebar-active py-2" style={{border:'0'}}><LocalMallOutlinedIcon fontSize="small"/> Orders History</NavLink>
                <NavLink activeclassname="active" to="/customer/addressbook" className="list-group-item sidebar-active py-2" style={{border:'0'}}><PinDropOutlinedIcon fontSize="small"/> Address Book</NavLink>
                <NavLink activeclassname="active" onClick={()=>{dispatch(logout())}} to="/customer/login" className="sidebar-active list-group-item py-2" style={{border:'0'}}><PowerSettingsNewTwoToneIcon fontSize="small"/> Logout</NavLink>
            </div>
        </div>     
		)
}
export default Sidebar;