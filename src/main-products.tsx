import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout } from './Layout'
import { Products } from './pages/Products'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <Products />
    </Layout>
  </React.StrictMode>,
)
