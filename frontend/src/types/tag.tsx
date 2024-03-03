import { Color, IdFilter } from "@/types"

export type Tag = {
  id: number
  name: string
  color: Color
  productsCount: number
  createdAt: string
  updatedAt: string
}

export type TagEditData = {
  name: string
  colorId: number
}

export type TagAddData = TagEditData

// Filters
export type TagFilter =
  | 'id'
  | 'min_name'
  | 'max_name'
  | 'colors'
  | 'without_color'
  | 'min_products'
  | 'max_products'
  | 'updated_from'
  | 'updated_to'
  | 'created_from'
  | 'created_to'

export type TagFilters = {
  id: IdFilter
  min_name: number
  max_name: number
  colors: number[]
  without_color: boolean
  min_products: number
  max_products: number
  updated_from: string
  updated_to: string
  created_from: string
  created_to: string
}
