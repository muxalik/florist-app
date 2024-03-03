import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { Manufacturer } from '@/types/manufacturer'
import { useManufacturers } from './store'
import ManufacturerRowActions from './row-actions'
import { manufacturerColumns } from '@/constants/manufacturers/columns'
import { preview } from '@/assets'

export const columns = (): ColumnDef<Manufacturer>[] => {
  const setSort = useManufacturers((state) => state.setSort)
  const setSortOrder = useManufacturers((state) => state.setSortOrder)

  return [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader
          setSort={setSort}
          setSortOrder={setSortOrder}
          column={column}
          title={manufacturerColumns.id}
        />
      ),
      cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'image',
      header: ({ column }) => (
        <DataTableColumnHeader
          setSort={setSort}
          setSortOrder={setSortOrder}
          column={column}
          title={manufacturerColumns.image}
        />
      ),
      cell: ({ row }) => {
        const imageUrl = row.getValue('image')

        return (
          <div className='flex space-x-2'>
            <div className='max-w-[400px] truncate font-medium'>
              <img
                src={imageUrl !== null ? imageUrl + '' : preview}
                alt='Preview'
                className='h-10 rounded-sm'
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
          setSortOrder={setSortOrder}
          setSort={setSort}
          column={column}
          title={manufacturerColumns.name}
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
      accessorKey: 'productsCount',
      header: ({ column }) => (
        <DataTableColumnHeader
          setSort={setSort}
          setSortOrder={setSortOrder}
          column={column}
          title={manufacturerColumns.productsCount}
        />
      ),
      cell: ({ row }) => (
        <div className='w-[80px]'>{row.getValue('productsCount')}</div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader
          setSort={setSort}
          setSortOrder={setSortOrder}
          column={column}
          title={manufacturerColumns.createdAt}
        />
      ),
      cell: ({ row }) => {
        return (
          <div className='flex w-[100px] items-center'>
            <p>{row.getValue('createdAt')}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => (
        <DataTableColumnHeader
          setSort={setSort}
          setSortOrder={setSortOrder}
          column={column}
          title={manufacturerColumns.updatedAt}
        />
      ),
      cell: ({ row }) => {
        return (
          <div className='flex w-[100px] items-center'>
            <p>{row.getValue('updatedAt')}</p>
          </div>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => <ManufacturerRowActions row={row} />,
    },
  ]
}
