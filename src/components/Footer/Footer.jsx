import androidapp from '../../images/other/androidapp.webp'
import appleapp from '../../images/other/appleapp.webp'
// import yticon from '../../images/other/yticon.png'
// import linkdicon from '../../images/other/linkdicon.png'
// import instaicon from '../../images/other/instaicon.png'
// import fbicon from '../../images/other/fbicon.png'

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './Footer.css'


const Footer = () => {
	return (
		 <footer className="">
      <div className="container p-4 pb-0">
          <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <p>Download our yas app for a better experience !!</p>
                  <div className="d-flex justify-content-between">
                    <img src={androidapp} className="img-fluid" width="150" height="150"/>
                    <img src={appleapp} className="img-fluid" width="150" height="150"/>
                  </div>
                  <small className="text-danger">App currently under development</small>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 pt-4 p-lg-0 p-md-0 text-center">
                  <p className="">Follow us on:</p>
                  <div className="">
                    <FacebookOutlinedIcon className="social-icon" style={{color:"gray"}}/>
                     <a href="https://www.instagram.com/yasgiftsofficial/" target="blank"><InstagramIcon className="social-icon mx-3" style={{color:"rgb(225 42 121)"}}/></a>
                     <LinkedInIcon className="social-icon" style={{color:"gray"}}/>
                     {/* <LinkedInIcon className="social-icon" style={{color:"rgb(78 68 175)"}}/> */}
                    <YouTubeIcon className="social-icon ms-3" style={{color:"gray"}}/>
                  </div>
                </div>
              </div><hr/>
              <p className="fw-bold">Welcome to yas! The No.1 Online Gift Shop</p>
              <p className="text-justify text-small">
              Create Blissful Memories with yas Unique Gift Items - Online Gift Delivery in India
              Online Gifts Delivery - Buy/Send gifts to India with FREE shipping from yas #1 online gift shop offers rakhis & rakhi gifts, flowers, cakes, personalized gifts delivery in India. Get same day and midnight delivery in over 5+ cities in India. Best Gift Ideas for various occasions and festivals. Get unique gift ideas for family & friends. Easy & fast gift delivery anywhere in India.
                </p>
              </div>
              <h1 className="text-center text-pink">yas</h1>
              <div className="text-center text-small">yas Gifts India Copyright © 2023. All rights reserved</div>
        </footer>

		)
}

export default Footer;