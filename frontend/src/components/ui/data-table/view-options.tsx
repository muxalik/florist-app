import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { ColNames } from '@/types'
import Icons from '../icons'

interface BaseDataTableViewOptionsProps<TData> {
  table: Table<TData>
}

type DataTableViewOptionsProps<TData> = {
  columnNames: ColNames
} & BaseDataTableViewOptionsProps<TData>

export function DataTableViewOptions<TData>({
  table,
  columnNames,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 flex'>
          <Icons.eye className='mr-2 h-4 w-4' />
          Вид
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' className='w-[175px]'>
        <DropdownMenuLabel>Переключить видимость</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {columnNames[column.id]}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
