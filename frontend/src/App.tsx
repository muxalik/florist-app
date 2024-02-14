import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import ProtectedRoutes from './components/ProtectedRoutes'
import { useEffect } from 'react'
import { fetchCsrfToken } from './utils/api'

const App = () => {
  useEffect(() => {
    fetchCsrfToken()
  }, [])

  return (
    <div id='app'>
      <Routes>
        {/* Authenticated routes */}
        <Route element={<ProtectedRoutes only='auth' />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        {/* Guest routes */}
        <Route element={<ProtectedRoutes only='guest' />}>
          <Route path='/login' element={<Login />} />
        </Route>

        {/* Fallback */}
        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Routes>
    </div>
  )
}

export default App
