import Icons from '@/components/ui/icons'
import { IconProps } from '@/types'
import { FC } from 'react'

type SidebarLink = {
  title: string
  to: string
  icon: FC<IconProps>
}

const sidebarLinks: SidebarLink[] = [
  {
    title: 'Главная',
    to: '/dashboard',
    icon: Icons.home,
  },
  {
    title: 'Товары',
    to: '/products',
    icon: Icons.package,
  },
  {
    title: 'Клиенты',
    to: '/clients',
    icon: Icons.user,
  },
  {
    title: 'Категории',
    to: '/categories',
    icon: Icons.bookmark,
  },
  {
    title: 'Теги',
    to: '/tags',
    icon: Icons.hash,
  },
]

export default sidebarLinks
