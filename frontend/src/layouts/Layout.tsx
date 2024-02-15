import { FC, ReactNode } from 'react'
import Sidebar from './Sidebar'

interface props {
  children: ReactNode
}

const Layout: FC<props> = ({ children }) => {
  return (
    <div className='w-full min-h-screen h-full relative'>
      <Sidebar />
      <main className='w-full min-h-screen pl-[250px]'>
        <div className='py-8 px-6'>{children}</div>
      </main>
    </div>
  )
}

export default Layout
