import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import SingleProduct from '../SingleProduct/SingleProduct';

const CustomerWishlist = () => {
	// const BASE_URL = 'https://simplykamar.tech/api';
  const BASE_URL = 'http://127.0.0.1:8000/api';

	const [wishlists, setWishlists] = useState([]);
  const [totalResult,setTotalResult] = useState(0);
	const [loading, setLoading] = useState(true);
  const user = useSelector((state)=>state.auth);

	async function fetchWishlist(url){
      await axios.get(url,{headers:{"Authorization" : `JWT ${user.access}`}})
              .then((response)=>{
                console.log(response)
              	setWishlists(response.data);
                setTotalResult(response.data.length)
              	setLoading(false);
          })
              .catch(error=>{
            })
    }
	useEffect(()=>{
      document.title="Wishlist";
      window.scrollTo(0,0);
		fetchWishlist(BASE_URL+`/customer-wishlist/?customer=${user.user.id}`);

	},[])

	return(
		<div className="py-4 bg-light">
			<div className="container">
      <h4 className="text-capitalize text-center">
        My Wishlist
        <span className="text-secondary"> ({totalResult})</span> 
      </h4>
			<div className="row mt-3 g-3">
          {	!loading
					?
            wishlists.length?

              wishlists.map((item)=>{
                return(
                   <div className="col-lg-3 col-md-4 col-sm-6 col-6" key={item.id}>
                      <SingleProduct isPersonalize={item.product.is_personalize} rating={item.product.rating} id={item.product.id} image={item.product.product_imgs[0].image} title={item.product.title} oldPrice={item.product.old_price} label={item.product.label} price={item.product.price} discount={item.product.discount} />
                    </div>
                  )
              })
              :
            <div className="text-secondary text-center">
              <small className="">Oops !! You don’t seem to have any wishlist items.</small>
            </div>
              :
             <div className="text-center">
                <div className="spinner-border text-danger"></div>
              </div>              
            }
			</div>
		</div>
		</div>
		)
}

export default CustomerWishlist;