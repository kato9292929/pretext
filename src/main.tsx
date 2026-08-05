import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout } from './Layout'
import { Home } from './pages/Home'
import { Services } from './sections/Services'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout preFooter={<Services />}>
      <Home />
    </Layout>
  </React.StrictMode>,
)
