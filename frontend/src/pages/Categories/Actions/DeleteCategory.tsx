import { useCategories } from '../store/useCategories'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { Category } from '@/types/category'

interface DeleteCategoryProps {
  row: Row<Category>
  open: boolean
  onOpenChange: (isOpened: boolean) => void
}

const DeleteCategory = ({ row, open, onOpenChange }: DeleteCategoryProps) => {
  const onDelete = useCategories((state) => state.onDelete)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-6 leading-7'>
            Вы абсолютно уверены, что хотите удалить выбранную категорию?
          </DialogTitle>
          <DialogDescription className='leading-6'>
            Это действие нельзя отменить! Вы уверены что хотите продолжить?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Отмена</Button>
          </DialogClose>
          <Button variant={'destructive'} onClick={() => onDelete(row)}>
            Подтвердить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCategory
