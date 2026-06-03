import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Always scroll to top on refresh
window.scrollTo(0, 0)
window.history.scrollRestoration = 'manual'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found')
createRoot(rootEl).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
