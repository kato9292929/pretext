import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout } from './Layout'
import { Research } from './pages/Research'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <Research />
    </Layout>
  </React.StrictMode>,
)
