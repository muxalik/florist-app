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


// export const categoryHasImageFilter = (
//   selected: string,
//   onSelect: (value: string) => void
// ): BaseFilter => {
//   return {
//     type: 'radio',
//     title: 'Наличие',
//     selected: selected,
//     options: [
//       {
//         value: 'yes',
//         name: 'Есть',
//       },
//       {
//         value: 'no',
//         name: 'Нет',
//       },
//       {
//         value: 'any',
//         name: 'Неважно',
//       },
//     ],
//     onSelect: onSelect,
//   }
// }

// export const categoryFormatsFilter = (
//   selected: string[],
//   onSelect: (value: string) => void
// ): BaseFilter => {
//   return {
//     type: 'checkbox',
//     title: 'Форматы',
//     selected: selected,
//     options: [
//       {
//         value: 'jpg',
//         name: '.jpg',
//       },
//       {
//         value: 'png',
//         name: '.png',
//       },
//       {
//         value: 'webp',
//         name: '.webp',
//       },
//     ],
//     onSelect: onSelect,
//   }
// }


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
