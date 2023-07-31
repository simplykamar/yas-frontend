const CustomerLogin = () => {
	return(
        <div className="container">
            <div className="mt-4">
            <div className="d-flex justify-content-center">
            <div className="card" style={{minWidth:'400px'}}>
              <h4 className="card-header">Customer Login</h4>
              <div  className="card-body">
              <form>
                 <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control"  placeholder=""/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
              </form>
          </div> 
          </div> 
          </div>
          </div> 

        </div>     
		)
}
export default CustomerLogin;