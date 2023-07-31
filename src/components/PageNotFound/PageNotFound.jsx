import notFound from '../../images/other/404.svg';

const PageNotFound = () => {

	return(
			<div className="container-fluid text-center">
            	<div className="pt-5 ">
            		<p className="text-danger">Sorry, page not found. Please browse through some of our top collections.</p>
            	<img src={notFound} className="img-fluid"/>
				<h4 className="text-danger">Ohh Noo!!</h4>
				</div>
			</div>
		)
}

export default PageNotFound;