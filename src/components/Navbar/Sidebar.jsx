import './Sidebar.css';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
import WifiCalling3TwoToneIcon from '@mui/icons-material/WifiCalling3TwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import SupportAgentTwoToneIcon from '@mui/icons-material/SupportAgentTwoTone';
import HambergerIcon from '../../images/logos/HambergerIcon.svg';
import {NavLink} from 'react-router-dom';

 const Sidebar = () => {
// Set the width of the side navigation to 250px
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
  return (
    <div >
         <div id="mySidenav" className="sidenav">
            <NavLink to="#" className="closebtn" onClick={closeNav}>&times;</NavLink>
            <div className="border m-2 rounded-3">
            <p className="text-uppercase fw-600 text-center bg-rose text-pink p-2">Top Collections</p>
              <NavLink activeclassname="active" to="/category/same day delivery/13" className="sidenav-items">Same Day Delivery Gifts</NavLink>
              <NavLink activeclassname="active" to="/category/cake/9" className="sidenav-items">Birthday Gifts</NavLink>
              <NavLink  activeclassname="active" to="/category/personalized/12" className="sidenav-items">Personalized Gifts</NavLink>
            </div>
            <p className=" ms-2 mt-4 mb-3 fw-600 text-secondary text-uppercase">Personal occasions</p>
            <NavLink to="/category/plant/10" className="sidenav-items">Plants Gifts</NavLink>
            <NavLink to="/category/anniversary/15" className="sidenav-items">Anniversary Gifts</NavLink>
            <NavLink to="/category/wedding/14" className="sidenav-items">Wedding & Engagement</NavLink>
            <NavLink to="/category/flowers/11" className="sidenav-items">Best Wishes</NavLink>
            <p className=" ms-2 mt-4 mb-3 fw-600 text-secondary text-uppercase">assistance</p>
            <div className="mb-3">
              <NavLink to="/customer/profile"  className="sidenav-items"><PersonOutlineTwoToneIcon fontSize='small'/> Profile</NavLink>
              <NavLink to="/customer/orders"  className="sidenav-items"><LocalMallTwoToneIcon fontSize='small'/> Order History</NavLink>
              <NavLink to="#"><SupportAgentTwoToneIcon fontSize='small'/> Customer Service</NavLink>
            </div>
                     

      </div>

      {/* <!-- Use any element to open the sidenav --> */}
    <img src={HambergerIcon} onClick={openNav} className="mt-2 cursor-pointer"/>

    </div>
  );
}

export default Sidebar;