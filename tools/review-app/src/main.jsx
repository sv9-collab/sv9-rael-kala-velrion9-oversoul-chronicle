import React from 'react'
import { createRoot } from 'react-dom/client'
import CodeReviewAssistant from './CodeReviewAssistant.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CodeReviewAssistant />
  </React.StrictMode>
)