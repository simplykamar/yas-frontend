import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import SingleProduct from '../SingleProduct/SingleProduct';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
const CustomerWishlist = () => {
	const BASE_URL = 'http://127.0.0.1:8000/api';
	const [wishlists, setWishlists] = useState([]);
  const [totalResult,setTotalResult] = useState(0);
	const [loading, setLoading] = useState(true);
  const user = useSelector((state)=>state.auth);
  console.log(user.user.id)


	async function fetchWishlist(url){
      await axios.get(url,{headers:{"Authorization" : `JWT ${user.access}`}})
              .then((response)=>{
              	setWishlists(response.data);
              	console.log(response.data);
                setTotalResult(response.data.length)
              	setLoading(false);
          })
              .catch(error=>{console.log(error)})
    }
	useEffect(()=>{
		fetchWishlist(BASE_URL+`/customer-wishlist/?customer=${user.user.id}`);

	},[])


	return(
		<div className=" py-5 bg-light">
			<div className="container">
      <h4 className="text-capitalize text-center">
      My Wishlist
      <span className="text-secondary"> ({totalResult})</span> 

      </h4>
			<div className="row mt-4">
          {	!loading
					?
            wishlists.length?

              wishlists.map((item)=>{
                return(
                   <div className="col-lg-3 col-md-3 col-sm-12 col-12" key={item.id}>
                      <SingleProduct id={item.product.id} image={item.product.product_imgs[0].image} title={item.product.title} price={item.product.price} />
                    </div>
                  )
              })
              :
            <div className="text-secondary text-center">
            <AnnouncementOutlinedIcon fontSize="large"/>
              <p className="">Oops !! You don’t seem to have any wishlist items.</p>
            </div>
              :
             <div className="text-center">
                <div className="spinner-border text-danger"></div>
              </div>              }
			</div>
		</div>
		</div>
		)
}


export default CustomerWishlist;