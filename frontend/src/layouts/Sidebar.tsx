import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/AuthContext'
import { ScrollArea } from '@/components/ui/scroll-area'
import sidebarLinks from '@/constants/sidebarLinks'
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  return (
    <div className='w-[250px] absolute top-0 left-0 bottom-0 h-screen z-20 bg-white border-r border-r-border'>
      <div className='relative w-full h-full overflow-y-hidden'>
        <ScrollArea className='rounded-md py-4 px-2 pb-[100px]'>
          <ul className='flex flex-col gap-2'>
            {sidebarLinks.map((link) => (
              <Button
                variant={pathname === link.to ? 'default' : 'outline'}
                asChild
                className='font-semibold justify-start gap-2 leading-[3px]'
              >
                <NavLink to={link.to}>
                  <link.icon className='w-[20px] h-[20px]' />
                  <span>{link.title}</span>
                </NavLink>
              </Button>
            ))}
          </ul>
        </ScrollArea>
        <div className='absolute bottom-0 left-0 right-0 p-2 shadow-md border-t border-t-border'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                asChild
                variant={'ghost'}
                className='w-full flex h-auto cursor-pointer'
              >
                <div className='py-1 flex gap-4 justify-center items-center'>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='text-md font-semibold'>
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className='text-sm text-gray-400'>{user?.email}</p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 font-medium mx-2' side='right'>
              <DropdownMenuItem onSelect={logout} className='cursor-pointer'>
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
