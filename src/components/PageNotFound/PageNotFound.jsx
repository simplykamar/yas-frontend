import notFound from '../../images/other/404.svg';
import {useEffect} from 'react';

const PageNotFound = () => {
  useEffect(()=>{
      document.title="404 | yas";
  },[])
	return(
			<div className="container-fluid text-center">
            	<div className="py-4 ">
            		<small className="d-block text-danger">Sorry, page not found. Please browse through some of our top collections.</small>
            	<img src={notFound} className="img-fluid"/>
				<h4 className="text-danger">Ohh Noo!!</h4>
				</div>
			</div>
		)
}

export default PageNotFound;