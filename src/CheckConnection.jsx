import {useState,useEffect} from 'react';
import App from './App'
import wifierror from './images/other/wifierror.png'
const CheckConnection = () => {
	const [isOnline,setIsOnline] = useState(navigator.onLine);
	useEffect(() => {
	console.log(navigator.onLine)

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
						<h1 className="text-primary mt-3">Whoops!!</h1>
						<p className="text-danger mb-1">slow or no internet connectiom</p>
						<p className="text-danger">Please check your internet settings</p>
					</div>
			}

		</div>
		)
			
}
export default CheckConnection;