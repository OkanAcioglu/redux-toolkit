import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// import store and provider
//! store that we created
import { store } from './store'
//! connect our app to redux
import { Provider } from 'react-redux'

//! Wrap whole app with provider
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
