import { ColNames } from '@/types'
import { columns } from '../columns'

export const categoryColumns: ColNames = {
  id: 'Категория',
  image: 'Изображение',
  name: 'Название',
  parentName: 'Род. категория',
  ...columns,
}
