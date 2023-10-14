import SingleProduct from '../SingleProduct/SingleProduct';
import ProductsSkeleton from '../LoadingSkeleton/ProductsSkeleton';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {Link,useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TuneIcon from '@mui/icons-material/Tune';

const SearchProducts = () => {
  const {query} = useParams();
  // const BASE_URL = 'https://simplykamar.tech/api';
    const BASE_URL = 'http://127.0.0.1:8000/api';
  
  const [products,setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const [filterBy, setFilterBy] = useState("");

    const fetchData = (url) => {
            axios.get(url)
              .then((response)=>{
                setProducts(response.data);
                setLoading(false);
              })
              .catch((error)=>{
                alert('server error..!')
                console.log(error);
              });
    }
    useEffect(()=>{
      document.title=query;
        window.scrollTo(0,0);
        // fetchData(BASE_URL+`/products/?q=${query}`);
        fetchData(BASE_URL+`/get-search-product/?query=${query}`);
        
      },[query,]);
     
        const fetchFilterData = (e) => {
          setFilterBy(e.target.value);
          if(e.target.value!==""){
              fetchData(BASE_URL+`/get-search-product/?query=${query}&sort-by=${e.target.value}`);
          }
              }

	return(
       <div className="container">
            <div className="my-4">
          {!loading?
            <div className="row ">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="d-flex justify-content-between">
                <div className="">
                <small className="text-secondary d-block">Showing results for:</small>
                  <h4 className="text-capitalize d-inline">{query}</h4><small className="text-secondary ms-2"><span className="fw-bold">{products.length}</span> Items</small>
               </div>
             <div className="d-flex">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl  fullWidth id="price-filter-focus">
                          <InputLabel id="price-filter" color="error" >
                           <TuneIcon/>Sort By</InputLabel>
                          <Select
                            labelId="price-filter"
                            id="price-filter-select"
                            value={filterBy}
                            label="Sort By......"
                            onChange={fetchFilterData}
                          >
                            <MenuItem value="-id">Latest First</MenuItem>
                            <MenuItem value="price">Price Low to High</MenuItem>
                            <MenuItem value="-price">Price High to Low</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
               </div>
         </div>
           <div className="row g-3 mt-3">
            {
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
              }
              </div>
          </div> 
          </div> 
          :
          <ProductsSkeleton count={8}/>
          }
          </div> 

        </div>         
		)
}
export default SearchProducts;