import useLocalStorage from '@/hooks/useLocalStorage'
import { CurrentUser } from '@/types'
import { api } from '@/utils/api'
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface IAuthContext {
  user: CurrentUser | null
  login: (user: CurrentUser) => void
  logout: () => void
  isLoading: boolean
}

const initialData: IAuthContext = {
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
}

const AuthContext = createContext<IAuthContext>(initialData)

interface props {
  children: ReactNode
}

const AuthProvider: FC<props> = ({ children }) => {
  const [user, setUser, isLoading] = useLocalStorage<CurrentUser | null>(
    'user',
    null
  )
  const [fullLoaded, setFullLoaded] = useState(false)

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (!user?.token) {
      setUser(null)
      setFullLoaded(true)

      return
    }

    api
      .post('token', { token: user.token })
      .then((res) => {
        login({
          ...user,
          ...res.data.user,
          token: res.data.token,
        })
      })
      .catch((error) => {
        if (error.response.status === 401) {
          logout()
        }
        console.log(error)
      })
      .finally(() => setFullLoaded(true))
  }, [isLoading])

  const login = (currentUser: CurrentUser) => {
    setUser(currentUser)

    api.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${currentUser?.token}`
  }

  const logout = () => {
    api
      .get('logout')
      .then(() => setUser(null))
      .catch(console.log)
      .finally(() => {
        api.defaults.headers.common['Authorization'] = `Bearer`
      })
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoading: !fullLoaded }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
