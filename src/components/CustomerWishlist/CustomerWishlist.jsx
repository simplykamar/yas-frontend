import {Link} from 'react-router-dom'
import ProductsSkeleton from '../LoadingSkeleton/ProductsSkeleton';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import SingleProduct from '../SingleProduct/SingleProduct';

const CustomerWishlist = () => {
	const BASE_URL = 'https://simplykamar.tech/api';
  // const BASE_URL = 'http://127.0.0.1:8000/api';

	const [wishlists, setWishlists] = useState([]);
  const [totalResult,setTotalResult] = useState(0);
	const [loading, setLoading] = useState(true);
  const user = useSelector((state)=>state.auth);

	async function fetchWishlist(url){
      await axios.get(url,{headers:{"Authorization" : `JWT ${user.access}`}})
              .then((response)=>{
                // console.log(response)
              	setWishlists(response.data);
                setTotalResult(response.data.length)
              	setLoading(false);
          })
              .catch(error=>{
                alert('server error..!')
            })
    }
	useEffect(()=>{
      document.title="Wishlist";
      window.scrollTo(0,0);
		fetchWishlist(BASE_URL+`/customer-wishlist/?customer=${user.user.id}`);

	},[])

	return(
		<div className="py-4">
			<div className="container">
      <h4 className="text-capitalize text-center text-heading">
        My Wishlist
        <span className="text-secondary"> ({totalResult})</span> 
      </h4>
			<div className="row mt-3 g-3">
          {	!loading
					?
            wishlists.length?

              wishlists.map((product)=>{
                return(
                   <div className="col-lg-3 col-md-4 col-sm-6 col-6" key={product.id}>
                       <SingleProduct
                           isPersonalize={product.product.is_personalize} 
                           rating={product.product.rating} 
                           id={product.product.id} 
                           image={product.product.product_imgs[0].image} 
                           title={product.product.title} 
                           oldPrice={product.product.old_price} 
                           label={product.product.label} 
                           price={product.product.price} 
                           discount={product.product.discount}
                           productReviews={product.product.product_reviews}
                         />
                    </div>
                  )
              })
              :
            <div className="text-secondary text-center">
              <small className="">Oops !! You don’t seem to have any wishlist items.</small>
            </div>
              :
            <ProductsSkeleton count={8}/>
            }
			</div>
		</div>
		</div>
		)
}

export default CustomerWishlist;