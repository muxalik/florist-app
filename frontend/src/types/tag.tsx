import { Color } from "@/types"

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
  | 'has_image'
  | 'formats'
  | 'min_name'
  | 'max_name'
  | 'parent_min'
  | 'parent_max'
  | 'updated_from'
  | 'updated_to'
  | 'created_from'
  | 'created_to'

export type TagIdFilter = 'even' | 'odd' | 'any'

export type TagFilterImage = 'yes' | 'no' | 'any'

export type TagFilterFormats = 'jpg' | 'png' | 'webp'

export type TagFilters = {
  id: TagIdFilter
  has_image: TagFilterImage
  formats: TagFilterFormats[]
  min_name: number
  max_name: number
  parent_min: number
  parent_max: number
  updated_from: string
  updated_to: string
  created_from: string
  created_to: string
}
