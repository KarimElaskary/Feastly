import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

const clerk_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!clerk_key){
  throw new Error('CLERK_PUBLISHABLE_KEY is not set')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <ClerkProvider publishableKey={clerk_key} afterSignOutUrl={'/'}>
    <App />
    </ClerkProvider>
    </Provider>
  </StrictMode>,
)
