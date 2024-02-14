import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ProtectedRoutes from './components/ProtectedRoutes'

const App = () => {
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
          <Route path='/register' element={<Register />} />
        </Route>

        {/* Fallback */}
        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Routes>
    </div>
  )
}

export default App
