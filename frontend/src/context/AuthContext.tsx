import useLocalStorage from '@/hooks/useLocalStorage'
import { CurrentUser } from '@/types'
import { FC, ReactNode, createContext, useContext } from 'react'

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

const AuthProvider: FC<props> = ({ children }) => {
  const [user, setUser] = useLocalStorage<CurrentUser | null>('user', null)

  const login = (currentUser: CurrentUser) => setUser(currentUser)

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
