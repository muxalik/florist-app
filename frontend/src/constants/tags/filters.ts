import { BaseFilter, SliderFilter } from '@/types'
import { TagFilters } from '@/types/tag'

export const defaultTagFilters: TagFilters = {
  id: 'any',
  min_name: 0,
  max_name: 100,
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


// export const categoryParentFilter = (
//   minValue: number,
//   maxValue: number,
//   onChange: (key: string, value: number) => void
// ): SliderFilter => {
//   return {
//     title: 'Длина названия',
//     type: 'slider',
//     options: [
//       {
//         key: 'parent_min',
//         name: 'Мин',
//         min: defaultTagFilters.parent_min,
//         max: defaultTagFilters.parent_max,
//         value: minValue,
//       },
//       {
//         key: 'parent_max',
//         name: 'Макс',
//         min: defaultTagFilters.parent_min,
//         max: defaultTagFilters.parent_max,
//         value: maxValue,
//       },
//     ],
//     onChange: onChange,
//   }
// }
