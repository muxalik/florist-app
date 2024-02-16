import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// import { DataTableFacetedFilter } from './FacetedFilter'
import { DataTableViewOptions } from './ViewOptions'
import { ChangeEvent } from 'react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void
  search: string
}

export function DataTableToolbar<TData>({
  table,
  onSearch,
  search,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Поиск...'
          value={search}
          onChange={onSearch}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {/* {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title='Status'
            options={statuses}
          />
        )}
        {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title='Priority'
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Сбросить
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}