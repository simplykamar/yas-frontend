import React from 'react';
import axios from 'axios'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import SingleProduct from '../SingleProduct/SingleProduct';
import ProductsSkeleton from '../LoadingSkeleton/ProductsSkeleton';


const SimilarGifts = ({ productId }) => {
  	const BASE_URL = 'http://127.0.0.1:8000/api';
  	const [products,setProducts] = useState([])
  	const [loading, setLoading] = useState(true);
	function getData(){
		axios.get(BASE_URL+`/get-similar-product/?query=${productId}`)
		.then(response=>{
			console.log(response)
			setProducts(response.data)
            setLoading(false);
		})
		.catch(error=>{
			alert('server error..!')
            console.log(error);
            setLoading(false);
		})
	}
	useEffect(()=>{
		getData();
	},[productId,])
	return(
			<div className="my-3">
				{ !loading && <h2 className="text-center">Similar Gift Recommendations</h2> }
				<div className="row g-3 mt-3">
			      {
			      !loading?
	              products.map((product)=>{
	                return(
	                   <div className="col-lg-3 col-md-4 col-sm-6 col-6" key={product.id}>
	                      <SingleProduct
	                           isPersonalize={product.is_personalize} 
	                           rating={product.rating} 
	                           id={product.id} 
	                           image={product.product_imgs[0].image} 
	                           title={product.title} 
	                           oldPrice={product.old_price} 
	                           label={product.label} 
	                           price={product.price} 
	                           discount={product.discount}
	                         />
	                    </div>
	                  )
	              })
	             :
	             <ProductsSkeleton count={8}/>
	              }
				</div>
			</div>
		)
}


export default SimilarGifts
