import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import birthday from '../../images/occasion/birthday.jpg'
import anniversary from '../../images/occasion/anniversary.webp'
import babyshower from '../../images/occasion/babyshower.webp'
import house from '../../images/occasion/house.webp'
import wedding from '../../images/occasion/wedding.webp'
import wishes from '../../images/occasion/wishes.jpg'

const Categories = () => {
  // const BASE_URL = 'https://simplykamar.tech/api';
  const BASE_URL = 'http://127.0.0.1:8000/api';
  
  const [categories,setCategories] = useState([])
  const [loading, setLoading] = useState(true);

    const fetchData = (url) => {
      axios.get(url)
              .then((response)=>{
                console.log(response);
                setCategories(response.data);
                setLoading(false);
              })
              .catch((error)=>{
                alert('server error..!')
                console.log(error);
              });
    }
    useEffect(()=>{
      document.title="Best Gifts Collections";
      window.scrollTo(0,0);
        fetchData(BASE_URL+'/categories');
      },[])

  return(
        <div className="container">
            <div className="my-4">
            {/* <h4>All Categories</h4> */}
            <h4 className="">Sale - Upto 70% Off</h4>
            <div className="row g-4 mt-3">
              { !loading?
                categories.map((cat)=>{
                  return(
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 " key={cat.id}>
                    <div className="border rounded-5" >
                    <div className="row" >
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6" >
                            <img src={cat.image} className="img-fluid h-100 rounded-5"/>
                        {/* <div style={{width:'100%',height:'100%',backgroundImage:`${cat.image}`}}></div> */}
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-6 p-2">
                            <div className="">
                              <h5 className="text-capitalize text-dark">{cat.title}</h5>
                              <p className="text-secondary text-justify me-2 ">{cat.detail.slice(0,140)}...</p>
                              <Link to={`/category/${cat.title}/${cat.id}`} className="btn w-75 btn-danger">Explore</Link>
                            </div>
                          </div>
                    </div>
                    </div>

                </div>
                  )})
                :
             <div className="text-center">
                <div className="spinner-border text-danger"></div>
              </div>
              }
              </div>
               <div className="mt-5">
                <h2>Occasions</h2>
                <p className="text-secondary">Celebrate each occasion with a gift that has a lasting impression</p>
              </div>
               <div className="row g-2 mt-3 text-center">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="">
                        <img src={birthday} className="img-fluid rounded-4"/>
                      </div>
                  </div>
                   <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="">
                        <img src={wedding} className="img-fluid rounded-4"/>
                      </div>
                  </div>
                   <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="">
                          <img src={house} className="img-fluid rounded-4"/>
                      </div>
                  </div>
            </div>
            <div className="row g-2 mt-3 text-center">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="">
                        <img src={babyshower} className="img-fluid rounded-4"/>
                      </div>
                  </div>
                   <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="">
                        <img src={anniversary} className="img-fluid rounded-4"/>
                      </div>
                  </div>
                   <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="">
                        <img src={wishes} className="img-fluid rounded-4"/>
                      </div>
                  </div>
            </div>  
          </div> 
        </div>     
    )
}
export default Categories;

