import { IdFilter } from '@/types'

export type Manufacturer = {
  id: number
  name: string
  image: string
  productsCount: number
  createdAt: string
  updatedAt: string
}

export type ManufacturerEditData = {
  name: string
  image: File | null
}

export type ManufacturerAddData = ManufacturerEditData

// Filters
export type ManufacturerFilter =
  | 'id'
  | 'has_image'
  | 'formats'
  | 'min_name'
  | 'max_name'
  | 'min_products'
  | 'max_products'
  | 'updated_from'
  | 'updated_to'
  | 'created_from'
  | 'created_to'

export type ManufacturerFilterImage = 'yes' | 'no' | 'any'

export type ManufacturerFilterFormats = 'jpg' | 'png' | 'webp'

export type ManufacturerFilters = {
  id: IdFilter
  has_image: ManufacturerFilterImage
  formats: ManufacturerFilterFormats[]
  min_name: number
  max_name: number
  min_products: number
  max_products: number
  updated_from: string
  updated_to: string
  created_from: string
  created_to: string
}
