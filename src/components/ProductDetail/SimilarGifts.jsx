import React from 'react';
import axios from 'axios'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import SingleProduct from '../SingleProduct/SingleProduct';


const SimilarGifts = ({productTitle}) => {
  	const BASE_URL = 'http://127.0.0.1:8000/api';
  	const [products,setProducts] = useState([])
	function getData(){
		axios.get(BASE_URL+`/get-similar-product/?query=${productTitle}`)
		.then(response=>{
			console.log(response)
			setProducts(response.data)
		})
		.catch(error=>{
			console.log(error)
		})
	}
	useEffect(()=>{
		getData();
		console.log(productTitle)
	},[productTitle,])
	return(
			<div className="my-3">
				<h2 className="text-center">Similar Gift Recommendations</h2>
				<div className="row g-3 mt-3">
		      {
		      	products.map(product=>{
		      		return(
					      <div className="col-lg-3 col-md-3 col-sm-6 col-6" key={product.id}>
                         	 <SingleProduct isPersonalize={product.is_personalize} rating={product.rating} id={product.id} image={product.product_imgs[0].image} title={product.title} oldPrice={product.old_price} label={product.label} price={product.price} discount={product.discount} />
                         </div>
		      			)
		      	})
		      }	
				</div>
			</div>
		)
}


export default SimilarGifts
