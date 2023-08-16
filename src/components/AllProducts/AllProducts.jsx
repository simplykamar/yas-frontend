import SingleProduct from '../SingleProduct/SingleProduct';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';

const AllProducts = () => {
  const BASE_URL = 'https://yasonlinegifting.pythonanywhere.com/api';
  const [products,setProducts] = useState([])
  const [totalResult,setTotalResult] = useState(0);
  const [baseurl,setBaseurl] = useState(BASE_URL+'/products');
  const [loading, setLoading] = useState(true);

    const fetchData = (url) => {
            fetch(url)
              .then((response)=>response.json())
              .then((data)=>{
                setProducts(data);
                setTotalResult(data.length)
                setLoading(false);
              });
    }
    useEffect(()=>{
      document.title="all products";
      window.scrollTo(0,0);
        fetchData(baseurl)
      },[baseurl])

    function changeBaseurl(baseurl){
      setBaseurl(baseurl);
    }
 
	return(
        <div className="container">
            <div className="my-4">
            <h4>All Products</h4>
            <div className="row g-3 mt-3">
          {!loading?
              products.map((product)=>{
                return(
                   <div className="col-lg-3 col-md-4 col-sm-6 col-6" key={product.id}>
                      <SingleProduct rating={product.rating} image={product.product_imgs[0].image} title={product.title} price={product.price} id={product.id}/>
                    </div>
                  )
              })
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
export default AllProducts;