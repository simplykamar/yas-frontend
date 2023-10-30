import { Link,useNavigate } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import {useState,useEffect} from 'react';
import './SingleProduct.css';
import {useSelector} from 'react-redux';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import ProgressiveImage from "react-progressive-graceful-image";
import yas from '../../images/other/yas.png'

const SingleProduct = (props) => {
    const user = useSelector((state)=>state.auth);
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    const [avgRating,setAvgRating] = useState(0);

    function calculateRating(productReviews){
        let sum = 0;
        const totalRating = productReviews.reduce((sum,item)=>sum+item.rating,0)
        const result = Math.round((totalRating/productReviews.length) * 10) / 10
        setAvgRating(result)
      }
      useEffect(()=>{
        calculateRating(props.productReviews);
      },[])
    return (
      <div>
          <div className="card product-card ">
                    {
                      props.isPersonalize&& 
                      <div className="product-card-wishlist-icon px-1 " style={{borderBottomLeftRadius:"20px",backgroundColor:"#fc7e93"}}>
                          <BrushOutlinedIcon fontSize="" className="text-white mb-1"/>
                        </div>
                    }
                        <div className="product-card-offer">
                          {
                            (props.label===2)&& <span className="fw-600 px-1 card-offer">Bestseller</span>
                          }
                          {
                            (props.label===3)&& <span className="fw-600 px-1 ms-1 card-offer">Special Offer</span>
                          }
                          {
                            (props.label===4)&& <span className="fw-600 px-1 card-offer">Premium</span>
                          }
                          {
                            (props.label===5)&& <span className="fw-600 px-1 card-offer">Value Pack</span>
                          }
                          {
                            (props.label===6)&& <span className="fw-600 px-1 card-offer">Top Rated</span>
                          }
                        </div>
                      <Link to={`/product/${props.title}/${props.id}`}>
                      <ProgressiveImage src={props.image} placeholder={yas}>
                          {(src, loading) => (
                            <div className="product-card-img-inner">
                            <img
                              className={`card-img-top product-card-img${loading ? " loading" : " loaded"}`}
                              src={src}
                              alt={props.title}
                            />
                            </div>
                            )}
                          </ProgressiveImage>
                      {/* <img src={props.image} className="card-img-top product-card-img"/> */}
                        </Link>
                      <div className="card-body p-2">
                        <Link to={`/product/${props.title}/${props.id}`} className="text-decoration-none">
                        <p className="card-title fw-bold product-card-title" style={{fontSize:"13px"}}>{props.title}...</p>
                        </Link>
                        <div className="d-flex flex-wrap">
                        <span className="card-title text-dark fw-600 fs-14">₹ {props.price}</span>
                          {
                            (props.discount!==0)&&
                            <>
                              <span className="text-decoration-line-through text-light-gray mx-2" style={{fontSize:"10px"}}>₹ {props.oldPrice}</span> 
                              <span>
                                <span className="p-1" style={{border:'1px solid #35b847',color:'#35b847',borderRadius:'5px',fontSize:'10px'}}> {props.discount}% OFF</span> 
                              </span>                            
                            </>
                            
                        }
                        </div>
                        {
                          avgRating
                          ?
                          <div className="">
                            <small className="text-secondary text-small">{avgRating}</small>
                            <StarIcon style={{color:'#ffd400'}} fontSize=""/> <small className="text-secondary text-small"> ({props.productReviews.length})</small>
                          </div>
                          :''
                        }
                      </div>
                    </div>
          </div>
          
      )
}

export default SingleProduct;