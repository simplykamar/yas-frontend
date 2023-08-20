import SingleProduct from '../SingleProduct/SingleProduct';
import'./Home.css'
import {Link} from 'react-router-dom';
import samedaydelivery from '../../images/logos/samedaydelivery.svg'
import cake from '../../images/logos/cake.svg'
import flower from '../../images/logos/flower.svg'
import gourmet from '../../images/logos/gourmet.svg'
import newarival from '../../images/logos/newarival.svg'
import personalize from '../../images/logos/personalize.svg'
import plant from '../../images/logos/plant.svg'
import rakhi from '../../images/logos/rakhi.svg'
import footersale from '../../images/other/footersale.webp'
import Slider from '../Slider/Slider';
import UniqueGift from '../Gift/UniqueGift';
import CelebrateGift from '../Gift/CelebrateGift';
import {useEffect} from 'react';
const Home = () => {
  
   useEffect(()=>{
      document.title="yas: Online Gifts Shopping";
  },[])
	return(
      <div className="">
      <div className="container">
        <header className="mt-4">
          <div className="row g-0 header-menu-border py-1">
            <div className="col-lg-2 col-md-2 col-sm-4 col-4">
            <Link to="/category/rakhi/8" className="text-decoration-none text-dark">
                <div className="header-menu ">
                  <img src={rakhi} className="img-fluid header-menu-img"/>
                  <p className="text-capitalize header-menu-text">rakhi</p>
                </div>
              </Link>
                <div className="d-block d-lg-none d-md-none header-menu-border-bottom"></div>
            </div>
              <div className="col-lg-2 col-md-2 col-sm-4 col-4">
            <Link to="/category/same day delivery/15" className="text-decoration-none text-dark">
                <div className="header-menu ">
                  <img src={samedaydelivery} className="img-fluid header-menu-img"/>
                  <p className="text-capitalize header-menu-text">same day delivery</p>
                </div>
              </Link>
                <div className="d-block d-lg-none d-md-none header-menu-border-bottom"></div>
            </div>
              <div className="col-lg-2 col-md-2 col-sm-4 col-4">
            <Link to="/category/cake/11" className="text-decoration-none text-dark">
                <div className="d-lg-none d-md-none header-menu border-0">
                    <img src={cake} className="img-fluid header-menu-img"/>
                    <p className="text-capitalize header-menu-text">cakes</p>
                </div>
                <div className="d-none d-lg-block d-md-block header-menu">
                    <img src={cake} className="img-fluid header-menu-img"/>
                    <p className="text-capitalize header-menu-text">cakes</p>
                </div>
              </Link>
                <div className="d-block d-lg-none d-md-none header-menu-border-bottom"></div>
            </div>
              <div className="col-lg-2 col-md-2 col-sm-4 col-4">
            <Link to="/category/flowers/13" className="text-decoration-none text-dark">
                <div className="header-menu ">
                    <img src={flower} className="img-fluid header-menu-img"/>
                    <p className="text-capitalize header-menu-text">flower</p>
                </div>
              </Link>
            </div>
              <div className="col-lg-2 col-md-2 col-sm-4 col-4">
            <Link to="/category/personalized/14" className="text-decoration-none text-dark">
                <div className="header-menu ">
                    <img src={personalize} className="img-fluid header-menu-img"/>
                    <p className="text-capitalize header-menu-text">personalized</p>
                </div>
              </Link>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-4 col-4">
            <Link to="/category/plant/12" className="text-decoration-none text-dark">
                <div className="header-menu " style={{border:0}}>
                    <img src={plant} className="img-fluid header-menu-img"/>
                    <p className="text-capitalize header-menu-text">plant</p>
                </div>
              </Link>
            </div>
          </div> 
        </header>
        <Slider/>
        <UniqueGift/>
        <CelebrateGift/>
         <Link to="/categories"><img src={footersale} className="img-fluid footersale-img"/></Link>
        <section className="mt-5 ">
          <div className="row d-none">
            <div className="col-lg-2 col-md-2 col-sm-2 col-2">
            <h1 className="stats">Stats</h1>
          </div>
            <div className="col-lg-10 col-md-10 col-sm-10 col-10">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                    <h1 className="main-stats-text">5+</h1>
                    <p className="text-danger stats-text">Cities having same day delivery</p>              
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                    <h1 className="main-stats-text">50+</h1>
                    <p className="text-danger stats-text">Happy cutomer:)</p>              
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                    <h1 className="main-stats-text">200+</h1>
                    <p className="text-danger stats-text">Gift boxes delivered</p>              
                </div>
              </div>
          </div>
          </div>
        </section>
      </div>     
       
      </div>     
		)
}
export default Home;