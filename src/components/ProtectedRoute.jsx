import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth()

  // Show loading while checking authentication status
  if (!isLoaded) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary'></div>
      </div>
    )
  }

  // Redirect to home if not signed in
  if (!isSignedIn) {
    return <Navigate to='/' replace />
  }

  // Render the protected component if signed in
  return children
}

export default ProtectedRoute
