import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'

const Dashboard = () => {
  const { logout } = useAuth()

  return (
    <div>
      <Button className='bg-red-600 rounded-md' onClick={logout}>
        Logout
      </Button>
    </div>
  )
}

export default Dashboard
