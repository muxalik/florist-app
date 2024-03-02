import Icons from '@/components/ui/icons'
import { RowActionsItems } from '@/types'

export const rowActions: RowActionsItems = {
  view: {
    icon: Icons.eye,
    title: 'Просмотреть',
  },
  edit: {
    icon: Icons.edit,
    title: 'Изменить',
  },
  delete: {
    icon: Icons.trash,
    title: 'Удалить',
  },
}
