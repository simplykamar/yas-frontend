import SingleProduct from '../SingleProduct/SingleProduct';
import {useState,useEffect} from 'react';
import {Link,useParams} from 'react-router-dom';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';

const TagProducts = () => {
  const {tag} = useParams();
  const BASE_URL = 'https://yasonlinegifting.pythonanywhere.com/api';
  const [products,setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const [totalResult,setTotalResult] = useState(0);
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
            window.scrollTo(0,0);
        fetchData(BASE_URL+`/products/?q=${tag}`);
      },[]);
       const fetchDataByPriceFilter = (e) => {
          if(e.target.value!==""){
              fetchData(BASE_URL+`/products/?q=${tag}&sort=${e.target.value}`);
                console.log(e.target.value);
          }
              }
    
    // function changeBaseurl(baseurl){
    //   setBaseurl(baseurl);
    //       console.log(baseurl)
    // }
    // var limit=1;
    // var totalLinks =totalResult/limit;
    // var links = [];
    // for(let i=1; i <= totalLinks; i++){
    //   links.push(<li className="page-item" key={i}><Link className="page-link" onClick={()=>changeBaseurl(BASE_URL+`/products/${tag}?page=${i}`)} to={`/products/${tag}?page=${i}`}>{i}</Link> </li>)
    // }
	return(
       <div className="container">
            <div className="my-4">
          {!loading?
            <div className="row ">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="d-flex justify-content-between">
                <div className="">
                  <h4 className="text-capitalize d-inline">{tag}</h4><small className="text-secondary ms-2"><span className="fw-bold">{totalResult}</span> Items</small>
               </div>
              <div className="d-flex">
                <FilterListOutlinedIcon fontSize="large" className="fw-600 text-danger"/>
                  <select className="form-select cursor-pointer" onChange={fetchDataByPriceFilter} style={{maxWidth:'200px'}}>
                      <option value="">Sort By</option>
                      <option value="price">Price Low to High</option>
                      <option value="-price">Price High to Low</option>
                    </select>
               </div>
         </div>
           <div className="row g-3 mt-3">
            {
              products.map((product)=>{
                return(
                   <div className="col-lg-3 col-md-4 col-sm-6 col-6" key={product.id}>
                      <SingleProduct rating={product.rating} image={product.product_imgs[0].image} title={product.title} price={product.price} id={product.id}/>
                    </div>
                  )
              })
              }
                
              </div>
            
          </div> 
          </div> 
          :
             <div className="text-center py-4">
                <div className="spinner-border text-danger"></div>
              </div>
          }
          </div> 

        </div>         
		)
}
export default TagProducts;