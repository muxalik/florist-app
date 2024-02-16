import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div className='w-full min-h-screen h-full relative'>
      <Sidebar />
      <main className='w-full min-h-screen pl-[250px]'>
        <div className='py-8 pl-8 pr-12'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
