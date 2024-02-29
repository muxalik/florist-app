import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Auth/Login/Login'
import ProtectedRoutes from './components/ProtectedRoutes'
import { useEffect } from 'react'
import { fetchCsrfToken } from './utils/api'
import RequestPassword from './pages/Auth/RequestPassword/RequestPassword'
import VerifyPassword from './pages/Auth/VerifyPassword/VerifyPassword'
import UpdatePassword from './pages/Auth/UpdatePassword/UpdatePassword'
import Layout from './layouts/Layout'
import Categories from './pages/Categories'
import { useAuth } from './context/AuthContext'
import Preloader from './components/Preloader'

const App = () => {
  const { isLoading } = useAuth()

  useEffect(() => {
    fetchCsrfToken()
  }, [])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div id='app'>
      <Routes>
        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route element={<ProtectedRoutes only='auth' />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/categories' element={<Categories />} />
          </Route>
        </Route>

        {/* Guest routes */}
        <Route element={<ProtectedRoutes only='guest' />}>
          {/* Auth */}
          <Route path='/login' element={<Login />} />
          <Route path='/request-password' element={<RequestPassword />} />
          <Route path='/verify-password' element={<VerifyPassword />} />
          <Route path='/update-password' element={<UpdatePassword />} />
        </Route>

        {/* Fallback */}
        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Routes>
    </div>
  )
}

export default App
