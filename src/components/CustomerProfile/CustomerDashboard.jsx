import Sidebar from '../Sidebar/Sidebar'


const CustomerDashboard = () => {
	return(
        <div className="container">
            <div className="mt-4">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12 col-sm-12">
                  <Sidebar/>
                </div>
                <div className="col-lg-9 col-md-9 col-12 col-sm-12">
                  <div className="row">
                    <div className="col-md-4 col-md-4 col-12">
                       <div className="card">
                         <div className="card-body text-center">
                            <h5 className="">Total Orders</h5>
                            <h5><a href="">123</a></h5>
                          </div>
                        </div>
                    </div>
                     <div className="col-md-4 col-md-4 col-12">
                       <div className="card">
                         <div className="card-body text-center">
                            <h5 className="">Total Wishlist</h5>
                            <h5><a href="">123</a></h5>
                          </div>
                        </div>
                    </div>
                     <div className="col-md-4 col-md-4 col-12">
                       <div className="card">
                         <div className="card-body text-center">
                            <h5 className="">Total Address</h5>
                            <h5><a href="">5</a></h5>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
          </div> 

        </div>     
		)
}
export default CustomerDashboard;