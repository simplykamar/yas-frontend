import Sidebar from './Sidebar'
import {Link} from 'react-router-dom';

const Reports = () => {
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
                            <h5 className="">Daily Reports</h5>
                            <h5><Link to="" className="btn btn-info">View</Link></h5>
                          </div>
                        </div>
                    </div>
                     <div className="col-md-4 col-md-4 col-12">
                       <div className="card">
                         <div className="card-body text-center">
                            <h5 className="">Monthly Reports</h5>
                            <h5><Link to="" className="btn btn-info">View</Link></h5>
                          </div>
                        </div>
                    </div> 
                    <div className="col-md-4 col-md-4 col-12">
                       <div className="card">
                         <div className="card-body text-center">
                            <h5 className="">Yearly Reports</h5>
                            <h5><Link to="" className="btn btn-info">View</Link></h5>
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
export default Reports;