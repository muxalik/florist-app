import { BaseFilter, SliderFilter } from '@/types'
import { CategoryFilters } from '@/types/category'

export const defaultCategoryFilters: CategoryFilters = {
  id: 'any',
  has_image: 'any',
  formats: ['jpg', 'png', 'webp'],
  min_name: 0,
  max_name: 100,
  parent_min: 0,
  parent_max: 100,
  updated_from: '',
  updated_to: '',
  created_from: '',
  created_to: '',
} as const

export const categoryIdFilter = (
  selected: string,
  onSelect: (value: string) => void
): BaseFilter => {
  return {
    type: 'radio',
    title: 'Четность',
    selected: selected,
    options: [
      {
        value: 'even',
        name: 'Четные',
      },
      {
        value: 'odd',
        name: 'Нечетные',
      },
      {
        value: 'any',
        name: 'Все',
      },
    ],
    onSelect: onSelect,
  }
}

export const categoryHasImageFilter = (
  selected: string,
  onSelect: (value: string) => void
): BaseFilter => {
  return {
    type: 'radio',
    title: 'Наличие',
    selected: selected,
    options: [
      {
        value: 'yes',
        name: 'Есть',
      },
      {
        value: 'no',
        name: 'Нет',
      },
      {
        value: 'any',
        name: 'Неважно',
      },
    ],
    onSelect: onSelect,
  }
}

export const categoryFormatsFilter = (
  selected: string[],
  onSelect: (value: string) => void
): BaseFilter => {
  return {
    type: 'checkbox',
    title: 'Форматы',
    selected: selected,
    options: [
      {
        value: 'jpg',
        name: '.jpg',
      },
      {
        value: 'png',
        name: '.png',
      },
      {
        value: 'webp',
        name: '.webp',
      },
    ],
    onSelect: onSelect,
  }
}

export const categoryNameFilter = (
  minValue: number,
  maxValue: number,
  onChange: (key: string, value: number) => void
): SliderFilter => {
  return {
    title: 'Длина названия',
    type: 'slider',
    options: [
      {
        key: 'min_name',
        name: 'Мин',
        min: defaultCategoryFilters.min_name,
        max: defaultCategoryFilters.max_name,
        value: minValue,
      },
      {
        key: 'max_name',
        name: 'Макс',
        min: defaultCategoryFilters.min_name,
        max: defaultCategoryFilters.max_name,
        value: maxValue,
      },
    ],
    onChange: onChange,
  }
}

export const categoryParentFilter = (
  minValue: number,
  maxValue: number,
  onChange: (key: string, value: number) => void
): SliderFilter => {
  return {
    title: 'Длина названия',
    type: 'slider',
    options: [
      {
        key: 'parent_min',
        name: 'Мин',
        min: defaultCategoryFilters.parent_min,
        max: defaultCategoryFilters.parent_max,
        value: minValue,
      },
      {
        key: 'parent_max',
        name: 'Макс',
        min: defaultCategoryFilters.parent_min,
        max: defaultCategoryFilters.parent_max,
        value: maxValue,
      },
    ],
    onChange: onChange,
  }
}
