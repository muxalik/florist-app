import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/AuthContext'
import { ScrollArea } from '@/components/ui/scroll-area'
import sidebarLinks from '@/constants/sidebarLinks'
import { NavLink, useLocation } from 'react-router-dom'
import Icons from '@/components/ui/icons'
import useTheme from '@/hooks/useTheme'

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme()

  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  return (
    <div className='w-[250px] fixed top-0 left-0 bottom-0 z-20 bg-background border-r border-r-border'>
      <div className='relative w-full h-full overflow-y-hidden'>
        <ScrollArea className='rounded-md pb-[100px]'>
          <ul className='flex flex-col gap-2 py-4 px-2'>
            {sidebarLinks.map((link) => (
              <li key={link.title + link.to}>
                <Button
                  variant={pathname === link.to ? 'default' : 'ghost'}
                  asChild
                  className='font-bold justify-start gap-2 leading-[3px] w-full'
                >
                  <NavLink to={link.to}>
                    <link.icon className='w-[20px] h-[20px]' />
                    <span>{link.title}</span>
                  </NavLink>
                </Button>
              </li>
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
                    <p className='text-md font-bold'>
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className='text-sm text-gray-400'>{user?.email}</p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-56 font-bold mx-3 mb-2'
              side='right'
            >
              <DropdownMenuItem
                onSelect={toggleTheme}
                className='cursor-pointer flex items-center gap-2'
              >
                {theme === 'dark' ? <Icons.moon /> : <Icons.sun />}
                <span>Сменить тему</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={logout}
                className='cursor-pointer flex gap-2 items-center'
              >
                <Icons.logout />
                <span>Выйти</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
