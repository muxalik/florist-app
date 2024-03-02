import { Table } from '@tanstack/react-table'
import { FC } from 'react'

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

export type Pagination = {
  currentPage: number
  from: number
  lastPage: number
  perPage: number
  to: number
  total: number
}

export type ColNames = {
  [key: string]: string
}

export type SortOrder = 'asc' | 'desc'

export type PaginatedResponse = {
  data: {
    meta: {
      current_page: number
      from: number
      last_page: number
      per_page: number
      to: number
      total: number
    }
  }
}

export interface DataTableToolbarProps<TData> {
  table: Table<TData>
  columnNames: ColNames
}

export type BaseFilter = {
  type: 'checkbox' | 'radio'
  title: string
  selected: string | string[]
  options: {
    value: string
    name: string
  }[]
  onSelect: (value: string) => void
}

export type SliderFilterOption = {
  key: string
  name: string
  min: number
  max: number
  value: number
  step?: number
}

export type SliderFilter = {
  title: string
  type: 'slider'
  options: SliderFilterOption[]
  onChange: (key: string, value: number) => void
}

export type Color = {
  id: number
  hex: string
  name: string | null
}

export type IdFilter = 'even' | 'odd' | 'any'

export type RowActionsCommands = 'view' | 'edit' | 'delete'

export type RowActionsItems = {
  [key in RowActionsCommands]: {
    icon: FC<IconProps>
    title: string
  }
}
