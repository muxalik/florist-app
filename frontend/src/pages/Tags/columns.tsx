import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { Badge } from '@/components/ui/badge'
import { TagRowActions } from './row-actions'
import { useTags } from './store'
import { Tag } from '@/types/tag'
import { tagColumns } from '@/constants/tags/columns'

export const columns = (): ColumnDef<Tag>[] => {
  const setSort = useTags((state) => state.setSort)
  const setSortOrder = useTags((state) => state.setSortOrder)

  return [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader
          setSort={setSort}
          setSortOrder={setSortOrder}
          column={column}
          title={tagColumns.id}
        />
      ),
      cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader
          setSortOrder={setSortOrder}
          setSort={setSort}
          column={column}
          title={tagColumns.name}
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
      accessorKey: 'color',
      header: ({ column }) => (
        <DataTableColumnHeader
          setSort={setSort}
          setSortOrder={setSortOrder}
          column={column}
          title={tagColumns.color}
        />
      ),
      cell: ({ row }) => {
        const color: { hex: string; name: string | null } =
          row.getValue('color')

        return (
          <div className='flex items-center space-x-2'>
            {!color ? (
              <span>Нет</span>
            ) : (
              <>
                <div
                  className='w-6 h-6 rounded-full'
                  style={{ backgroundColor: color.hex }}
                />
                <span className='max-w-[100px] truncate font-medium'>
                  {color.name}
                </span>
              </>
            )}
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
          title={tagColumns.productsCount}
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
          title={tagColumns.createdAt}
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
          title={tagColumns.updatedAt}
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
      cell: ({ row }) => <TagRowActions row={row} />,
    },
  ]
}
