import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout } from './Layout'
import { LegalPage } from './pages/Legal'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <LegalPage doc="disclaimer" />
    </Layout>
  </React.StrictMode>,
)
