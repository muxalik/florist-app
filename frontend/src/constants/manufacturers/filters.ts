import { SliderFilter } from '@/types'
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

export const tagProductsFilter = (
  minValue: number,
  maxValue: number,
  min: number,
  max: number,
  onChange: (key: string, value: number) => void
): SliderFilter => {
  return {
    title: 'Количество',
    type: 'slider',
    options: [
      {
        key: 'min_products',
        name: 'Мин',
        min: min,
        max: max,
        value: minValue,
        step: 5,
      },
      {
        key: 'max_products',
        name: 'Макс',
        min: min,
        max: max,
        value: maxValue,
        step: 5,
      },
    ],
    onChange: onChange,
  }
}
