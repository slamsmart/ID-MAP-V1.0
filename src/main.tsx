import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import './index.css'
import App from './App'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const convexUrl = import.meta.env.VITE_CONVEX_URL || 'https://placeholder.convex.cloud'
const convex = new ConvexReactClient(convexUrl)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey} afterSignOutUrl="/#/">
      <ConvexProvider client={convex}>
        <HashRouter>
          <App />
        </HashRouter>
      </ConvexProvider>
    </ClerkProvider>
  </StrictMode>,
)
