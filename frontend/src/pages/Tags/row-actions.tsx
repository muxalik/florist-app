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
import { Row } from '@tanstack/react-table'
import { useState } from 'react'
import { Tag } from '@/types/tag'
import DeleteTag from './actions/delete-tag'
import ViewTag from './actions/view-tag'
import EditTag from './actions/edit-tag'
import { rowActions } from '@/constants'
import { RowActionsCommands } from '@/types'

interface DataTableRowActionsProps {
  row: Row<Tag>
}

export function TagRowActions({ row }: DataTableRowActionsProps) {
  const [open, setOpen] = useState<RowActionsCommands | null>(null)

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
            <rowActions.view.icon className='w-5 h-5' />
            {rowActions.view.title}
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='flex gap-2 text-gray-700'
            onSelect={() => setOpen('edit')}
          >
            <rowActions.edit.icon className='w-5 h-5' />
            {rowActions.edit.title}
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='flex gap-2 text-gray-700'
            onSelect={() => setOpen('delete')}
          >
            <rowActions.delete.icon className='w-5 h-5' />
            {rowActions.delete.title}
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteTag
        row={row}
        open={open === 'delete'}
        onOpenChange={() => setOpen(open === 'delete' ? null : 'delete')}
      />

      <ViewTag
        open={open === 'view'}
        onOpenChange={() => setOpen(open === 'view' ? null : 'view')}
        row={row}
      />

      <EditTag
        open={open === 'edit'}
        onOpenChange={() => setOpen(open === 'edit' ? null : 'edit')}
        row={row}
        onCancel={() => setOpen(null)}
      />
    </>
  )
}

export default TagRowActions
