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
import EditCategory from './actions/edit-category'
import { Category } from '@/types/category'
import { useCategories } from './store'
import DeleteCategory from './actions/delete-category'
import ViewCategory from './actions/view-category'
import { CategoryRawActions } from '@/types'

interface DataTableRowActionsProps {
  row: Row<Category>
}

export function CategoryRowActions({ row }: DataTableRowActionsProps) {
  const onEdit = useCategories((state) => state.onEdit)
  const simpleCategories = useCategories((state) => state.simpleCategories)

  const [open, setOpen] = useState<CategoryRawActions | null>(null)

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
            onSelect={() => setOpen('view')}
          >
            <Icons.eye className='w-5 h-5' />
            Посмотреть
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='flex gap-2 text-gray-700'
            onSelect={() => setOpen('edit')}
          >
            <Icons.edit className='w-5 h-5' />
            Изменить
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='flex gap-2 text-gray-700'
            onSelect={() => setOpen('delete')}
          >
            <Icons.trash className='w-5 h-5' />
            Удалить
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteCategory
        row={row}
        open={open === 'delete'}
        onOpenChange={() => setOpen(open === 'delete' ? null : 'delete')}
      />

      <ViewCategory
        open={open === 'view'}
        onOpenChange={() => setOpen(open === 'view' ? null : 'view')}
        row={row}
        categoryList={simpleCategories}
      />

      <EditCategory
        open={open === 'edit'}
        onOpenChange={() => setOpen(open === 'edit' ? null : 'edit')}
        row={row}
        onSave={onEdit}
        onCancel={() => setOpen(null)}
        categoryList={simpleCategories}
      />
    </>
  )
}

export default CategoryRowActions
