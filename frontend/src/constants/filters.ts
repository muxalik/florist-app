import { BaseFilter, Color, ColorFilter, SliderFilter } from '@/types'

export const idFilter = (
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

export const nameFilter = (
  minValue: number,
  maxValue: number,
  min: number,
  max: number,
  onChange: (key: string, value: number) => void
): SliderFilter => {
  return {
    title: 'Длина',
    type: 'slider',
    options: [
      {
        key: 'min_name',
        name: 'Мин',
        min: min,
        max: max,
        value: minValue,
      },
      {
        key: 'max_name',
        name: 'Макс',
        min: min,
        max: max,
        value: maxValue,
      },
    ],
    onChange: onChange,
  }
}

export const colorsFilter = (
  title: string,
  colors: Color[],
  selected: number[],
  onSelect: (colorId: number) => void,
  without: boolean,
  onWithoutColorChange: (includes: boolean) => void
): ColorFilter => {
  return {
    title,
    type: 'color',
    colors,
    selected,
    onSelect,
    without,
    onWithoutColorChange,
  }
}
