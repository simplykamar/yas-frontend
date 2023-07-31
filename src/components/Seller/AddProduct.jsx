import Sidebar from './Sidebar'
import {Link} from 'react-router-dom';
import img from '../../demo.png'


const AddProduct = () => {
  return(
        <div className="container">
            <div className="mt-4">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12 col-sm-12">
                  <Sidebar/>
                </div>
                <div className="col-lg-9 col-md-9 col-12 col-sm-12">
                 <div className="card" style={{minWidth:'400px'}}>
              <h4 className="card-header">Add Product</h4>
              <div  className="card-body">
              <form>
              <div className="form-group">
                  <label htmlFor="username">Category</label>
                  <input type="text" className="form-control"  placeholder=""/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title</label>
                  <input type="text" className="form-control"  placeholder=" "/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Price</label>
                  <input type="number" className="form-control"/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Description</label>
                  <textarea type="text" className="form-control"></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Image</label>
                  <input type="file" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
              </form>
          </div> 
          </div>
                </div>
              </div>
          </div> 
        </div>     
    )
}
export default AddProduct;