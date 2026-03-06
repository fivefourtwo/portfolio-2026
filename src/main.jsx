import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import favicon from './assets-new/FR-Logo-grey.svg'

const faviconLink = document.querySelector('link[rel="icon"]')
if (faviconLink) faviconLink.href = favicon

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
