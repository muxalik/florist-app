import { TagFilters } from '@/types/tag'

export const defaultTagFilters: TagFilters = {
  id: 'any',
  min_name: 0,
  max_name: 100,
  colors: [],
  without_color: false,
  min_products: 0,
  max_products: 100,
  updated_from: '',
  updated_to: '',
  created_from: '',
  created_to: '',
} as const