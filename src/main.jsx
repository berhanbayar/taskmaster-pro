import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ToastProvider from './components/ToastContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(<ToastProvider><App /></ToastProvider> )
