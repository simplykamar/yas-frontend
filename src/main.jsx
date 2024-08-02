import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './redux/store'

import CheckConnection from './CheckConnection'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <CheckConnection/> */}
        <h1 style={{textAlign:"center",color:"red"}}>Under maintenance</h1>
      </BrowserRouter>
    </Provider>

  // </React.StrictMode>,
)
