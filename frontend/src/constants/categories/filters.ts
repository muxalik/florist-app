import { CategoryFilterNames, CategoryFilters } from '@/types/category'

export const defaultCategoryFilters: CategoryFilters = {
  has_image: 'any',
  formats: ['jpg', 'png', 'webp'],
} as const

export const categoryFilterNames: CategoryFilterNames = {
  has_image: {
    title: 'Наличие',
    values: {
      yes: 'Есть',
      no: 'Нет',
      any: 'Неважно',
    },
  },
  formats: {
    title: 'Форматы',
    values: {
      jpg: '.jpg',
      png: '.png',
      webp: '.webp',
    },
  },
} as const
