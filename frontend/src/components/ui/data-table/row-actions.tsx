import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Icons from '@/components/ui/icons'
import { Row } from '@tanstack/react-table'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog'

interface BaseDataTableRowActionsProps<TData> {
  row: Row<TData>
}

type DataTableRowActionsProps<TData> = {
  onDelete: (row: Row<TData>) => void
  onEdit: (row: Row<TData>) => void
} & BaseDataTableRowActionsProps<TData>

export function DataTableRowActions<TData>({
  row,
  onDelete,
}: DataTableRowActionsProps<TData>) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Открыть меню</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[190px] font-medium'>
          <DropdownMenuItem className='flex gap-2 text-gray-700'>
            <Icons.edit className='w-5 h-5' />
            Изменить
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem
              className='flex gap-2 text-gray-700'
              // onSelect={() => onDelete(row)}
            >
              <Icons.trash className='w-5 h-5' />
              Удалить
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
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
          <Button onClick={() => onDelete(row)}>Подтвердить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DataTableRowActions
