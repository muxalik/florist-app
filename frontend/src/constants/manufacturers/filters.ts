import { ManufacturerFilters } from '@/types/manufacturer'

export const defaultManufacturerFilters: ManufacturerFilters = {
  id: 'any',
  min_name: 0,
  max_name: 100,
  has_image: 'any',
  formats: ['jpg', 'png', 'webp'],
  min_products: 0,
  max_products: 100,
  updated_from: '',
  updated_to: '',
  created_from: '',
  created_to: '',
} as const
