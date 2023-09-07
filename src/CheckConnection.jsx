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
			<App />
			

		</div>
		)
			
}
export default CheckConnection;