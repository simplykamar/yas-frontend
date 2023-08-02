import SingleProduct from '../SingleProduct/SingleProduct';
import {useState,useEffect} from 'react';
import {Link,useParams} from 'react-router-dom';
import './CategoryProducts.css';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';

const CategoryProducts = () => {
  const {category_id} = useParams();
  const {category_slug} = useParams();
  const BASE_URL = 'https://yasonlinegifting.pythonanywhere.com/api';
  const [products,setProducts] = useState([])
  const [totalResult,setTotalResult] = useState(0);
  const [loading, setLoading] = useState(true);

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
      console.log("in cat product")
        fetchData(BASE_URL+`/products/?q=${category_slug}`);
      },[category_slug,]);
    
        const fetchDataByPriceFilter = (e) => {
          if(e.target.value!==""){
              fetchData(BASE_URL+`/products/?q=${category_slug}&sort=${e.target.value}`);
                console.log(e.target.value);
          }
              }
	return(
        <div className="container">
            <div className="mt-4">
            <div className="row ">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="d-flex justify-content-between">
                <div className="">
                  <h4 className="text-capitalize d-inline">{category_slug}</h4><small className="text-secondary ms-2"><span className="fw-bold">{totalResult}</span> Items</small>               
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
              !loading?
                products.length?
                  products.map((product)=>{
                    return(
                       <div className="col-lg-3 col-md-4 col-sm-6 col-6" key={product.id}>
                          <SingleProduct rating={product.rating} id={product.id} image={product.product_imgs[0].image} title={product.title} price={product.price}/>
                        </div>
                      )
                    })
                  :"No category found..!"

              :
             <div className="text-center">
                <div className="spinner-border text-danger"></div>
              </div>
              }
                
              </div>
              {/* <nav aria-label="Page navigation example" className="mt-5"> */}
              {/*   <ul className="pagination"> */}
              {/*     <li className="page-item"><Link className="page-link" to="#">Previous</Link></li> */}
              {/*     {links}  */}
              {/*   </ul> */}
              {/* </nav> */}
          </div> 
          </div> 
          </div> 

        </div>     
		)
}
export default CategoryProducts;