export type IconProps = React.HTMLAttributes<SVGElement>

export type CurrentUser = {
  firstName: string
  lastName: string
  avatar: string
  token: string
}

export type passwordData = {
  email: string | null
  code: string | null
}