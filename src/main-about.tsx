import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout } from './Layout'
import { About } from './pages/About'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <About />
    </Layout>
  </React.StrictMode>,
)
