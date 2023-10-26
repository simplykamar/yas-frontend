import {Helmet} from 'react-helmet';
import './CategoryProducts.css';
import ProductsSkeleton from '../LoadingSkeleton/ProductsSkeleton';
import loading1 from '../../images/loading/loading1.gif'
import SingleProduct from '../SingleProduct/SingleProduct';
import {useState,useEffect} from 'react';
import {Link,useParams} from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TuneIcon from '@mui/icons-material/Tune';

const CategoryProducts = () => {
  const {category_id} = useParams();
  const {category_slug} = useParams();
  // const BASE_URL = 'https://simplykamar.tech/api';
  const BASE_URL = 'http://127.0.0.1:8000/api';
  const [products,setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const [filterBy, setFilterBy] = useState("");

    const fetchData = (url) => {
            axios.get(url)
              .then((response)=>{
                setProducts(response.data);
                console.log(response)
                setLoading(false);
              })
              .catch(error=>{
                setLoading(false);
                alert('server error..!')
                console.log(error)
            })
    }
    useEffect(()=>{
      window.scrollTo(0,0);
        fetchData(BASE_URL+`/get-category-products/?query=${category_id}`);
      },[category_id,]);
    
        const fetchFilterData = (e) => {
          setFilterBy(e.target.value);
          if(e.target.value!==""){
              fetchData(BASE_URL+`/get-category-products/?query=${category_id}&sort=${e.target.value}`);
          }
              }
	return(
      <div className="container">
        <Helmet>
          <meta charSet="utf-8"/>
          <title>{category_slug}</title>
          <meta
           name="description"
           content="Personalized Gifts India - Buy/Send Unique Personalised Gifts Online from yasgifts Customized Gift Shop. Order Magic Mugs, Cushions, Caricature, LED Lamps, Photo Gifts, Keychains, bottle, Photo Frames with Free Shipping. Order Now!"
          />
          <meta
           name="keywords"
           content="personalized gifts, customized gifts, unique personalised gifts, customized gifts online, customized gifts online india, buy personalised gifts, send personalised gifts to india, personalized photo gifts, personalised gifts, custom gifts online, Magic Mugs, Cushions, Caricature, LED Lamps, Photo Gifts, Keychains, bottle, Photo Frames."
          />
      </Helmet>
        <div className="my-4">
      {
        !loading?
        <div className="row ">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="d-flex justify-content-between">
                <div className="">
                  <h4 className="text-capitalize d-inline">{category_slug}</h4><small className="d-block d-lg-inline d-md-inline text-secondary ms-2"><span className="fw-bold">{products.length}</span> Items</small>               
                  </div>
              <div className="d-flex">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl  fullWidth id="price-filter-focus">
                          <InputLabel id="price-filter" color="error" size="small">
                           <TuneIcon fontSize="small"/>Sort By</InputLabel>
                          <Select
                            labelId="price-filter"
                            id="price-filter-select"
                            value={filterBy}
                            label="Sort By......"
                            onChange={fetchFilterData}
                            size="small"
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
                products.length?
                  products.map((product)=>{
                    return(
                       <div className="col-lg-3 col-md-4 col-sm-6 col-6" key={product.id}>
                          <SingleProduct
                           isPersonalize={product.is_personalize} 
                           rating={product.rating} 
                           id={product.id} 
                           image={product.product_imgs.length&&product.product_imgs[0].image} 
                           title={product.title} 
                           oldPrice={product.old_price} 
                           label={product.label} 
                           price={product.price} 
                           discount={product.discount}
                           productReviews={product.product_reviews}
                         />
                        </div>
                      )
                    })
                  :<small>No found in this category..!</small>
              }
              </div>
          </div> 
          </div> 
          :
             <ProductsSkeleton count={8}/>
             // <div className="text-center">
             //    {/* <div className="spinner-border text-danger"></div> */}
             // <img src={loading1}/>
             //  </div>
           }
          </div> 
        </div>     
		)
}
export default CategoryProducts;