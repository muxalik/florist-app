import { useTags } from '../store'
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
import { Tag } from '@/types/tag'

interface DeleteTagProps {
  row: Row<Tag>
  open: boolean
  onOpenChange: (isOpened: boolean) => void
}

const DeleteTag = ({ row, open, onOpenChange }: DeleteTagProps) => {
  const onDelete = useTags((state) => state.onDelete)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-6 leading-7'>
            Вы абсолютно уверены, что хотите удалить выбранный тег?
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

export default DeleteTag
