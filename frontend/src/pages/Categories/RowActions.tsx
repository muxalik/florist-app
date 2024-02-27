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
import { useState } from 'react'
import EditSheet from './Actions/EditSheet'
import { Category } from '@/types/category'
import { useCategories } from './store/useCategories'
import DeleteModal from './Actions/DeleteModal'
import ViewCategory from './Actions/ViewCategory'

interface DataTableRowActionsProps {
  row: Row<Category>
}

export function CategoriesRowActions({ row }: DataTableRowActionsProps) {
  const [openEditSheet, setOpenEditSheet] = useState(false)
  const [openViewSheet, setOpenViewSheet] = useState(false)

  const closeEditSheet = () => setOpenEditSheet(false)
  const closeViewSheet = () => setOpenViewSheet(false)

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
        <DropdownMenuContent align='end' className='w-[200px] font-medium'>
          <DropdownMenuItem
            className='flex gap-2 text-gray-700 mb-1'
            onClick={() => setOpenViewSheet(true)}
          >
            <Icons.eye className='w-5 h-5' />
            Посмотреть
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='flex gap-2 text-gray-700'
            onClick={() => setOpenEditSheet(true)}
          >
            <Icons.edit className='w-5 h-5' />
            Изменить
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DeleteModal row={row} />
        </DropdownMenuContent>
      </DropdownMenu>
      <ViewCategory
        open={openViewSheet}
        onOpenChange={closeViewSheet}
        row={row}
        categoryList={simpleCategories}
      />
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
