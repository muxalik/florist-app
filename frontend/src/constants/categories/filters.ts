import { BaseFilter, SliderFilter } from '@/types'
import { CategoryFilters } from '@/types/category'

export const defaultCategoryFilters: CategoryFilters = {
  id: 'any',
  has_image: 'any',
  formats: ['jpg', 'png', 'webp'],
  min_name: 0,
  max_name: 100,
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
        defaultValue: 0,
      },
      {
        key: 'max_name',
        name: 'Макс',
        min: defaultCategoryFilters.min_name,
        max: defaultCategoryFilters.max_name,
        value: maxValue,
        defaultValue: 100,
      },
    ],
    onChange: onChange,
  }
}
