import SingleProduct from '../SingleProduct/SingleProduct';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';


const AllProducts = () => {
  const BASE_URL = 'https://yasonlinegifting.pythonanywhere.com/api';
  const [products,setProducts] = useState([])
  const [totalResult,setTotalResult] = useState(0);
  const [baseurl,setBaseurl] = useState(BASE_URL+'/products');
  const [loading, setLoading] = useState(true);

  // const [currentPage, setCurrentPage ] = useState(1);
  console.log(products)

    const fetchData = (url) => {
            fetch(url)
              .then((response)=>response.json())
              .then((data)=>{
                console.log(data)
                setProducts(data);
                setTotalResult(data.length)
                setLoading(false);
              });
    }
    useEffect(()=>{
        fetchData(baseurl)
        console.log("test")
      },[baseurl])

    function changeBaseurl(baseurl){
      setBaseurl(baseurl);
          console.log(baseurl)
    }
    var limit=3;
    var totalLinks = Math.round(totalResult/limit);
    var links = [];
    for(let i=1; i <= totalLinks; i++){
      links.push(<li className="page-item" key={i}><Link className="page-link" onClick={()=>changeBaseurl(BASE_URL+`/products/?page=${i}`)} to={`/products/?page=${i}`}>{i}</Link> </li>)
    }
 
	return(
        <div className="container">
            <div className="mt-4">
            <h4>All Products</h4>
            <div className="row g-3 mt-3">
          {!loading?
              products.map((product)=>{
                return(
                   <div className="col-lg-3 col-md-4 col-sm-12 col-12" key={product.id}>
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