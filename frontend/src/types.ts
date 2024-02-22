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

export type Category = {
  id: number
  name: string
  image: string
  parentId: number | null
  parentName: string | null
  createdAt: string
  updatedAt: string
}

export type SimpleCategory = {
  id: number
  name: string
}

export type CategoryEditData = {
  name: string
  parentId: number | null
  image: File | null
}

export type CategoryAddData = CategoryEditData

export type CategoryFilters = {
  has_image: 'yes' | 'no' | 'any'
  formats: ('jpg' | 'png' | 'webp')[]
}

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
