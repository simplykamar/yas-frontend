import Sidebar from './Sidebar'
import {Link} from 'react-router-dom';
import img from '../../demo.png'


const Orders = () => {
  return(
        <div className="container">
            <div className="mt-4">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12 col-sm-12">
                  <Sidebar/>
                </div>
                <div className="col-lg-9 col-md-9 col-12 col-sm-12">
                  <div className="table-responsive mt-3">
              <table className="table border">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>title</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td><Link to=""> Product Title </Link></td>
                    <td><Link to=""> <img src={img} className="img-fluid" style={{width:'60px'}}/> </Link></td>
                    <td>Rs. 500</td>
                    <td><span className="badge bg-success">Published</span></td>
                    <td>
                        <div class="dropdown">
                          <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Change Status
                          </button>
                          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Link to="" class="dropdown-item" >Approve</Link>
                            <Link to="" class="dropdown-item" >Sent</Link>
                            <Link to="" class="dropdown-item" >Complete</Link>
                          </div>
                        </div>
                    </td>
                  </tr>
                   <tr>
                    <td>1</td>
                    <td><Link to=""> Product Title </Link></td>
                    <td><Link to=""> <img src={img} className="img-fluid" style={{width:'60px'}}/> </Link></td>
                    <td>Rs. 500</td>
                    <td><span className="badge bg-success">Published</span></td>
                    <td>
                        <div class="dropdown">
                          <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Change Status
                          </button>
                          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Link to="" class="dropdown-item" >Approve</Link>
                            <Link to="" class="dropdown-item" >Sent</Link>
                            <Link to="" class="dropdown-item" >Complete</Link>
                          </div>
                        </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
                </div>
              </div>
          </div> 
        </div>     
    )
}
export default Orders;