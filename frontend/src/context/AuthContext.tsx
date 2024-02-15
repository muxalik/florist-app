import useLocalStorage from '@/hooks/useLocalStorage'
import { CurrentUser } from '@/types'
import { api } from '@/utils/api'
import { FC, ReactNode, createContext, useContext, useEffect } from 'react'

interface IAuthContext {
  user: CurrentUser | null
  login: (user: CurrentUser) => void
  logout: () => void
}

const initialData: IAuthContext = {
  user: null,
  login: () => {},
  logout: () => {},
}

const AuthContext = createContext<IAuthContext>(initialData)

interface props {
  children: ReactNode
}

let firstMount = true

const AuthProvider: FC<props> = ({ children }) => {
  const [user, setUser] = useLocalStorage<CurrentUser | null>('user', null)

  useEffect(() => {
    if (user?.token && firstMount) {
      firstMount = false

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
          console.log(error)
          logout()
        })
    }
  }, [user?.token])

  const login = (currentUser: CurrentUser) => {
    firstMount = false
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

    api.defaults.headers.common['Authorization'] = `Bearer`
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
