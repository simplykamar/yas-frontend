import'./Home.css';
import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import footersale from '../../images/other/footersale.webp';
import mainloading from '../../images/loading/mainloading.gif';
import Slider from '../Slider/Slider';
import UniqueGift from '../Gift/UniqueGift';
import CelebrateGift from '../Gift/CelebrateGift';
import SearchOutlinedicons from '@mui/icons-material/SearchOutlined';
import NavigationBar from '../NavigationBar/NavigationBar';

import axios from 'axios';

const Home = () => {
    const BASE_URL = 'http://127.0.0.1:8000/api';
    const [headerMenu,setHeaderMenu] = useState([]);
    const [loading,setLoading] = useState(false);
    function fetchHeaderMenuData(url){
        setLoading(true);
        axios.get(url)
        .then(response=>{
            console.log(response);
            setHeaderMenu(response.data);
            setLoading(false);
        })
        .catch(error=>{
            alert('Server error..!');
            console.log(error);
            setLoading(false);
        })
    }
   
  
   useEffect(()=>{
      document.title="yas: Online Gifts Shopping";
      fetchHeaderMenuData(BASE_URL+'/header-menu-items')
  },[])
	return(
      <div className="">
      <div className="container">
        <header className="">
        {/* search for mobile view. from here call navbar search modal*/}
        <span className="text-secondary cursor-pointer d-lg-none d-md-none" data-bs-toggle="modal" data-bs-target="#searchModal">
            <div className="border my-3 py-1 rounded-5 px-3" style={{boxShadow: '0 0 15px 2px lightgray'}}><SearchOutlinedicons/> <span className="ms-3">Search for gifts...</span></div>
        </span>
          <div className="row g-0 header-menu-border mt-3">
            {
                !loading
                ?
                    headerMenu.map(item=>{
                        return(
                                <div className="col-lg-2 col-md-2 col-sm-4 col-4" key={item.id}>
                                    <Link to={`/category/${item.category.title}/${item.category.id}`} className="text-decoration-none text-dark">
                                        <div className="header-menu">
                                          <img src={item.image} className="img-fluid header-menu-img" />
                                          <p className="text-capitalize header-menu-text">{item.title}</p>
                                        </div>
                                      </Link>
                                </div>
                            )
                    })
                :
                 <div className="text-center">
                    <div className="spinner-border text-danger"></div>
                  </div>
            }
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
          <div >
            <NavigationBar/>
          </div>
      </div>     
		)
}
export default Home;