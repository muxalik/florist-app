import { CategoryFilterNames, CategoryFilters } from '@/types/category'

export const defaultCategoryFilters: CategoryFilters = {
  id: 'any',
  has_image: 'any',
  formats: ['jpg', 'png', 'webp'],
} as const

export const categoryFilterNames: CategoryFilterNames = {
  id: {
    title: 'Четность',
    values: {
      even: 'Четные',
      odd: 'Нечетные',
      any: 'Все',
    },
  },
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
