import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import { useCategories } from '../store/useCategories'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Icons from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { Category } from '@/types/category'

interface DeleteModalProps {
  row: Row<Category>
}

const DeleteModal = ({ row }: DeleteModalProps) => {
  const onDelete = useCategories((state) => state.onDelete)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className='flex gap-2 text-gray-700'
          onSelect={(e) => e.preventDefault()}
        >
          <Icons.trash className='w-5 h-5' />
          Удалить
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-6'>Вы абсолютно уверены?</DialogTitle>
          <DialogDescription>
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

export default DeleteModal
