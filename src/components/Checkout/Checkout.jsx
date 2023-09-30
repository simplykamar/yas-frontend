import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {removeFromCart,addToCart,resetCart,deleteFromCart} from '../../redux/cartSlice'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import emptyCart from "../../images/other/emptycart.svg"
import {useEffect} from 'react';

const Checkout = (props) => {
  const cartData = useSelector((state)=>state.cart.products);
  const dispatch = useDispatch();
  const sum=0;
  const totalProducts = cartData.reduce((sum,item)=>{return sum+item.quantity},0)
  const totalAmounts = cartData.reduce((sum,item)=>{return sum+(item.price*item.quantity)},0)
  
   function vibrate(){
    if(!("vibrate" in navigator)){
       return;
  }
  navigator.vibrate(100);
}

    useEffect(()=>{
      document.title="Shopping cart";
      window.scrollTo(0,0);
    },[]);
    return (
      <div className="container " >
       <div className="my-4">
       { cartData.length?
      <>
      <h2 className="text-dark text-center ">Shopping cart</h2>
                {
                  cartData.map((item,i)=>{return(
                 <div className="row mt-4 border p-2 pb-3 custom-shadow" key={item.id}>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <Link to={`/product/${item.title}/${item.id}`} className="d-flex text-decoration-none text-dark"> 
                      <img src={item.img} className="img-fluid" style={{width:'100px'}}/> 
                      <p className="ms-2">{item.title}</p>
                      </Link>
                      {
                        item.is_personalize
                        &&
                        <div className="text-small my-2"><BrushOutlinedIcon fontSize="small"/> Personalized</div>
                        }
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="fw-bold text-small">Standard- No Delivery Fees</div>
                      <div className="text-small text-secondary">Estimated delivery between 4-5 business days
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                        <div className="float-end ">
                          <p className=" fw-600 ms-2 text-danger">₹ {item.price*item.quantity}</p>
                          <span  className=" border p-1 px-2 rounded-15">
                            <span className="cursor-pointer" onClick={()=>{vibrate();dispatch(removeFromCart(item))}}><RemoveIcon/></span>
                            <span className="mx-3">{item.quantity}</span>
                            <span className="cursor-pointer" onClick={()=>{vibrate();dispatch(addToCart(item))}}><AddIcon/></span>
                          </span>
                          <DeleteOutlineIcon className="ms-5 cursor-pointer" onClick={()=>{vibrate();dispatch(deleteFromCart(item))}} />
                      </div>
                    </div>
                    </div>
                    )})
                  }
            <div className="mt-5 d-none d-md-block d-lg-block">
                <div className="d-flex justify-content-between ">
                    <div className="">
                      <h4 className="text-secondary">Total Products: <span className="text-danger">{totalProducts}</span></h4>
                    </div>
                    <div className="">
                      <h4 className="text-secondary">Total Amounts: <span className="text-danger">₹ {totalAmounts}</span></h4>
                    </div>
                    <div className="">
                      <Link to="/checkout-step-1" className="btn btn-pink px-4 py-2 fw-600">PROCEED TO CHECKOUT</Link>
                    </div>
                </div>
            </div>
            <div className="mt-5 d-lg-none d-md-none custom-shadow p-1">
                <div className="d-flex justify-content-between text-center">
                    <div className="">
                      <p className="text-secondary fw-bold">Total Products: <span className="text-danger">{totalProducts}</span></p>
                    </div>
                    <div className="">
                      |
                    </div>
                    <div className="">
                      <p className="text-secondary fw-bold">Total Amounts: <span className="text-danger">₹ {totalAmounts}</span></p>
                    </div>
                </div>
                <div className="">
                      <Link to="/checkout-step-1" className="btn btn-pink d-block py-3 fw-600">PROCEED TO CHECKOUT</Link>
                    </div>
            </div>
            </>
         :
            <div className="text-secondary text-center mt-3">
                <h4 className="">Your <span className="text-danger">Gift Box</span> Looks Empty!</h4>
               <img src={emptyCart} className="img-fluid"/>
             </div>        
        }   
      </div>      
      </div>      
      )
}

export default Checkout;