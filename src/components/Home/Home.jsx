import {Helmet} from 'react-helmet';
import'./Home.css';
import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import mainloading from '../../images/loading/mainloading.gif';
import Slider from '../Slider/Slider';
import PremiumGift from '../Gift/PremiumGift';
import CelebrateGift from '../Gift/CelebrateGift';
import SearchOutlinedicons from '@mui/icons-material/SearchOutlined';
import NavigationBar from '../NavigationBar/NavigationBar';
import HeaderMenuSkeleton from '../LoadingSkeleton/HeaderMenuSkeleton';
import axios from 'axios';

const Home = () => {
    const BASE_URL = 'http://127.0.0.1:8000/api';
    // const BASE_URL = 'http://yasonlinegifting.pythonanywhere.com/api';
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
      window.scrollTo(0,0);
      fetchHeaderMenuData(BASE_URL+'/header-menu-items')
  },[])
	return(
      <div className="">
          <Helmet>
          <meta charSet="utf-8"/>
        <title>Online Gifts Delivery, Buy/Send Gifts to India, Gift Items Online, Personalizable gift</title>
        <meta  
          name="description"
          content="Online Gifts Delivery - Send Gifts Online to India with FREE Shipping from yasgifts. Buy unique gift items online from India's Best Online Gift Shop. Get best gift ideas for all occasions. Personalizable gift"
          />
        <meta
          name="keywords" 
          content="online gifts, online gift delivery, buy gifts online, online gift shop, send gifts, gifts to india, indian gift portal, indian gifts, send gifts to india, send gifts online, same day delivery, gift items online shopping, unique gifts online india, online gift shopping sites, best online gift sites, online shopping gift items, gift items online india, cheap gifts online, online gifts delivery in one day, online gift shopping, gift store, personalizable gift, personalize gift, personalized gift, yas gift yasgift, yasgifts"
          />
        </Helmet>
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
              <HeaderMenuSkeleton count={6}/>
            }
          </div> 
        </header>
        <Slider/>
        <PremiumGift/>
        <CelebrateGift/>
      </div>     
        <NavigationBar/>
      </div>     
		)
}
export default Home;