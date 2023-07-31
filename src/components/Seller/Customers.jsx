import Sidebar from './Sidebar'
import {Link} from 'react-router-dom';
import img from '../../demo.png'


const Customers = () => {
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Kamar Alam</td>
                    <td>kamaralam366@gmail.com</td>
                    <td>9045371255</td>
                    <td>
                      <Link to="" className="btn btn-primary">Orders</Link>
                      <Link to="" className="btn btn-danger ms-1">Remove from list</Link>
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
export default Customers;