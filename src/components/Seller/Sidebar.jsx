import {Link} from 'react-router-dom';

const Sidebar = () => {
	return(
        <div className="container">
            <div className="list-group">
                    <Link to="/seller/dashboard" className="list-group-item active">Dashboard</Link>
                    <Link to="/seller/products" className="list-group-item">Products</Link>
                    <Link to="/seller/orders" className="list-group-item">Orders</Link>
                    <Link to="/seller/customers" className="list-group-item">Customers</Link>
                    <Link to="/seller/reports" className="list-group-item">Report</Link>
                    <Link to="" className="list-group-item text-danger">Logout</Link>
                  </div>
        </div>     
		)
}
export default Sidebar;