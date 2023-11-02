import {useState,useEffect} from 'react';
import App from './App'
import wifierror from './images/other/wifierror.png'
const CheckConnection = () => {
	const [isOnline,setIsOnline] = useState(navigator.onLine);
	useEffect(() => {
    	function onlineHandler() {
      		setIsOnline(true);
    	}
	
    	function offlineHandler() {
      		setIsOnline(false);
    	}
	
    	window.addEventListener("online", onlineHandler);
    	window.addEventListener("offline", offlineHandler);

	
    	return () => {
      		window.removeEventListener("online", onlineHandler);
      		window.removeEventListener("offline", offlineHandler);
    	}
    });
	return (
			<div>
				<img src={wifierror} className="d-none"/>
			{
				isOnline ?
					<App />:
					<div className="text-center">
						<img src={wifierror} className="img-fluid"/>
						<h2 className="text-pink mt-3 text-heading">Whoops!!</h2>
						<p className="mb-1 fs-14 text-pink">slow or no internet connectiom</p>
						<p className="fs-14 text-pink">Please check your internet settings</p>
					</div>
			}
		</div>
			// <h1 className="text-center text-pink">Under Maintenance!</h1>
		)
			
}
export default CheckConnection;