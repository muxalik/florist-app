import { useAuth } from '@/context/AuthContext'
import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface props {
  only?: 'auth' | 'guest'
  redirectTo?: string
}

const ProtectedRoutes: FC<props> = ({ only = 'auth', redirectTo = '' }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  // Must be authenticated
  if (only === 'auth') {
    // Authenticated
    if (user?.token) {
      return <Outlet />
    }

    // Not authenticated
    return <Navigate to={redirectTo || '/login'} />
  }

  // Must be guest
  if (only === 'guest') {
    // Guest
    if (!user?.token) {
      return <Outlet />
    }

    // Authenticated
    return <Navigate to={redirectTo || '/dashboard'} />
  }
}

export default ProtectedRoutes
