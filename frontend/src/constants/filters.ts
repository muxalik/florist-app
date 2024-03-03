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

export const hasImageFilter = (
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

export const formatsFilter = (
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

export const productCountFilter = (
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
