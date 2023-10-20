import notFound from '../../images/other/404.svg';
import {useEffect} from 'react';

const PageNotFound = () => {
  useEffect(()=>{
      document.title="404 | yas";
  },[])
	return(
			<div className="container-fluid text-center">
            	<div className="py-4 ">
            		<p className="text-heading text-pink">Sorry, page not found. Please browse through some of our top collections.</p>
            	<img src={notFound} className="img-fluid"/>
				<p className="text-pink fw-600">Ohh Noo!!</p>
				</div>
			</div>
		)
}

export default PageNotFound;