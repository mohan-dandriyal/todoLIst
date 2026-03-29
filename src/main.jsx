import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MyContextProvider } from './context/MyContext'
import App from './App'

createRoot(document.getElementById('root')).render(
  <>
    <MyContextProvider>
        <App />
    </MyContextProvider>
  </>,
)
