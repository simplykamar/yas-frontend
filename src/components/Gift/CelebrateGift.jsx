import './CelebrateGift.css'
import {Link} from 'react-router-dom';
import {useEffect,useState} from 'react';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';

const CelebrateGift = () => {
	const BASE_URL = 'https://simplykamar.tech/api';
    // const BASE_URL = 'http://127.0.0.1:8000/api';
    const [loading,setLoading] = useState(false);
    const [celebrateGift,setCelebrateGift] = useState([]);

   function fetchCelebrateMilestoneGiftData(url){
        setLoading(true);
        axios.get(url)
        .then(response=>{
            // console.log(response);
            setCelebrateGift(response.data);
            setLoading(false);
        })
        .catch(error=>{
            alert('Server error..!');
            // console.log(error);
            setLoading(false);
        })
    }  
 useEffect(()=>{
  fetchCelebrateMilestoneGiftData(BASE_URL+'/celebrate-milestone-gift-items')
 },[])	
	return (
		<>
		{
		!loading?
	<div className="my-3">
		<div>
			<h2 className="text-capitalize text-heading">celebrate milestones</h2>
			<p className="text-secondary" style={{fontSize:'14px'}}>With our memorable gifts</p>
		</div>
		<div className="row g-3 mt-3">
		{
          celebrateGift.map((item)=>{
            return(
			<div className="col-lg-3 col-md-3 col-sm-6 col-6" key={item.id}>
				<Link to={`/category/${item.category.title}/${item.category.id}`}>
					<img src={item.image} className="img-fluid rounded-4 celebrate-img"/>
				</Link>
			</div>
              )
          })
        } 
		</div>
	</div>
	:
	  <div>
	    <Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />
	    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
	      <div className="d-flex justify-content-between">
	      <Skeleton variant="rectangular" height={150} width={150} />
	      <Skeleton variant="rectangular" height={150} width={150} />
	      </div>
	  </div>
	}
	</>
		)
}


export default CelebrateGift;

