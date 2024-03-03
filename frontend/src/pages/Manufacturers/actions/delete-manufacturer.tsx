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
import { Manufacturer } from '@/types/manufacturer'
import { useManufacturers } from '../store'

interface DeleteManufacturersProps {
  row: Row<Manufacturer>
  open: boolean
  onOpenChange: (isOpened: boolean) => void
}

const DeleteManufacturer = ({
  row,
  open,
  onOpenChange,
}: DeleteManufacturersProps) => {
  const onDelete = useManufacturers((state) => state.onDelete)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-6 leading-7'>
            Вы абсолютно уверены, что хотите удалить выбранного производителя?
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

export default DeleteManufacturer
