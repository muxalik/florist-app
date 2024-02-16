export type IconProps = React.HTMLAttributes<SVGElement>

export type CurrentUser = {
  firstName: string
  lastName: string
  avatar: string
  token: string
  email: string
}

export type passwordData = {
  email: string | null
  code: string | null
}

export type Theme = 'dark' | 'light'

export type Category = {
  id: number
  name: string
  image: string
  parentId: number | null
  parentName: string | null
  createdAt: string
  updatedAt: string
}

export type CategoryFilters = {
  page?: string
  per_page?: string
  q?: string
  has_children?: boolean
  has_image?: boolean
}
