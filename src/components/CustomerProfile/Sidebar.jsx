import {NavLink} from 'react-router-dom';
import { logout } from '../../redux/authSlice'
import {useDispatch} from 'react-redux';
import './CustomerProfile.css';
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
const Sidebar = () => {
  const dispatch = useDispatch();

	return(
        <div className="container sticky-top">
            <div className="list-group">
                <NavLink activeclassname="active" to="/customer/profile" className="list-group-item sidebar-active py-3"><AccountCircleOutlinedIcon/> Profile</NavLink>
                <NavLink activeclassname="active" to="/customer/orders" className="list-group-item sidebar-active py-3"><LocalMallTwoToneIcon/> Orders History</NavLink>
                <NavLink activeclassname="active" to="/customer/addressbook" className="list-group-item sidebar-active py-3"><ListAltTwoToneIcon/> Address Book</NavLink>
                <NavLink activeclassname="active" onClick={()=>{dispatch(logout())}} to="/customer/login" className="sidebar-active list-group-item py-3"><PowerSettingsNewTwoToneIcon/> Logout</NavLink>
            </div>

        </div>     
		)
}
export default Sidebar;