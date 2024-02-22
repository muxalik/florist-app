import { Table } from '@tanstack/react-table'
import { ChangeEvent } from 'react'

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
  search: string
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void
}
