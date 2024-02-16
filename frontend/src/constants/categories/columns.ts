export type column = {
  id: string
  title: string
}

export const categoryCols: column[] = [
  {
    id: 'id',
    title: 'Категория',
  },
  {
    id: 'image',
    title: 'Изображение',
  },
  {
    id: 'name',
    title: 'Название',
  },
  {
    id: 'parentName',
    title: 'Род. категория',
  },
  {
    id: 'createdAt',
    title: 'Cоздание',
  },
  {
    id: 'updatedAt',
    title: 'Обновление',
  },
]
