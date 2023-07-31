import Sidebar from './Sidebar'
import {Link} from 'react-router-dom';
import img from '../../demo.png'


const Products = () => {
  return(
        <div className="container">
            <div className="mt-4">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12 col-sm-12">
                  <Sidebar/>
                </div>
                <div className="col-lg-9 col-md-9 col-12 col-sm-12">
                <Link to="/seller/add-product" className="btn btn-primary">+ Add Product</Link>
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
                    <td><span className="">Published</span></td>
                    <td>
                      <span className="btn btn-info">View</span>
                      <span className="btn btn-primary mx-2">Edit</span>
                      <span className="btn btn-danger">Delete</span>
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
export default Products;