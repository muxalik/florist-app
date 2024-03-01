import { IdFilter } from "@/types"

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

// Filters
export type CategoryFilter =
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

export type CategoryFilterImage = 'yes' | 'no' | 'any'

export type CategoryFilterFormats = 'jpg' | 'png' | 'webp'

export type CategoryFilters = {
  id: IdFilter
  has_image: CategoryFilterImage
  formats: CategoryFilterFormats[]
  min_name: number
  max_name: number
  parent_min: number
  parent_max: number
  updated_from: string
  updated_to: string
  created_from: string
  created_to: string
}
