import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

// import { labels, priorities, statuses } from '@/constants/categories/data'
import { Task } from '@/constants/categories/schema'
import { DataTableColumnHeader } from './ColumnHeader'
import { DataTableRowActions } from './RowActions'
import { categoryCols } from '@/constants/categories/columns'

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Выбрать все'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Выбрать ряд'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={categoryCols.find((col) => col.id === 'id')?.title!}
      />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'image',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={categoryCols.find((col) => col.id === 'image')?.title!}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <div className='max-w-[400px] truncate font-medium'>
            <img
              src={`${row.getValue('image')}`}
              alt='Preview'
              className='h-12 rounded-sm'
            />
          </div>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={categoryCols.find((col) => col.id === 'name')?.title!}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[400px] truncate font-medium'>
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'parentName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={categoryCols.find((col) => col.id === 'parentName')?.title!}
      />
    ),
    cell: ({ row }) => {
      const parentId = row.original.parentId

      return (
        <div className='flex space-x-2'>
          {!parentId ? (
            <span>Нет</span>
          ) : (
            <>
              <Badge variant='outline'>{row.original.parentId}</Badge>
              <span className='max-w-[500px] truncate font-medium'>
                {row.getValue('parentName')}
              </span>
            </>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={categoryCols.find((col) => col.id === 'createdAt')?.title!}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-[100px] items-center'>
          <p>{row.getValue('createdAt')}</p>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={categoryCols.find((col) => col.id === 'updatedAt')?.title!}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-[100px] items-center'>
          <p>{row.getValue('updatedAt')}</p>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  // {
  //   accessorKey: 'priority',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Priority' />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue('priority')
  //     )

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className='flex items-center'>
  //         {priority.icon && (
  //           <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
