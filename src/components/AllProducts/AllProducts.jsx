import SingleProduct from '../SingleProduct/SingleProduct';
import ProductsSkeleton from '../LoadingSkeleton/ProductsSkeleton';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const AllProducts = () => {
  const BASE_URL = 'http://127.0.0.1:8000/api';
  const [products,setProducts] = useState([])
  const [loading, setLoading] = useState(true);

    const fetchData = (url) => {
            axios.get(url)
              .then((response)=>{
                setProducts(response.data);
                setLoading(false);
              })
              .catch((error)=>{
                alert('server error..!')
                console.log(error);
                setLoading(false);
              });
    }
    useEffect(()=>{
      document.title="all products";
      window.scrollTo(0,0);
        fetchData(BASE_URL+'/products')
      },[])

	return(
        <div className="container">
            <div className="my-4">
                <h4 className=" d-inline">All Products</h4><small className="d-block d-lg-inline d-md-inline text-secondary ms-2"><span className="fw-bold">{products.length}</span> Items</small>               
            <div className="row g-3 mt-3">
          {!loading?
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
        </div>     
		)
}
export default AllProducts;