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
} from '@/components/ui/dialog'
import { useState } from 'react'
import EditSheet from './Actions/EditSheet'
import { Category } from '@/types/category'
import { useCategories } from './store'

interface DataTableRowActionsProps {
  row: Row<Category>
}

export function CategoriesRowActions({ row }: DataTableRowActionsProps) {
  const [openEditSheet, setOpenEditSheet] = useState(false)

  const closeEditSheet = () => setOpenEditSheet(false)

  const onDelete = useCategories((state) => state.onDelete)
  const onEdit = useCategories((state) => state.onEdit)
  const simpleCategories = useCategories((state) => state.simpleCategories)

  return (
    <>
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
          <DropdownMenuItem
            className='flex gap-2 text-gray-700'
            onClick={() => setOpenEditSheet(true)}
          >
            <Icons.edit className='w-5 h-5' />
            Изменить
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

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
                <DialogTitle className='mb-6'>
                  Вы абсолютно уверены?
                </DialogTitle>
                <DialogDescription>
                  Это действие нельзя отменить! Вы уверены что хотите
                  продолжить?
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
        </DropdownMenuContent>
      </DropdownMenu>
      <EditSheet
        open={openEditSheet}
        onOpenChange={closeEditSheet}
        row={row}
        onSave={onEdit}
        onCancel={closeEditSheet}
        categoryList={simpleCategories}
      />
    </>
  )
}

export default CategoriesRowActions
