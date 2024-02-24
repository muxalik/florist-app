import { Category } from '@/types/category'
import { Checkbox } from '@radix-ui/react-checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { Badge } from '@/components/ui/badge'
import { categoryColumns } from '@/constants/categories/columns'
import CategoriesRowActions from './RowActions'
import { preview } from '@/assets'
import { useCategories } from './store/useCategories'

export const columns = (): ColumnDef<Category>[] => {
  const setSort = useCategories((state) => state.setSort)
  const setSortOrder = useCategories((state) => state.setSortOrder)

  return [
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
          setSort={setSort}
          setSortOrder={setSortOrder}
          column={column}
          title={categoryColumns.id}
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
          title={categoryColumns.image}
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
          title={categoryColumns.name}
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
          setSort={setSort}
          setSortOrder={setSortOrder}
          column={column}
          title={categoryColumns.parentName}
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
                <Badge variant='outline'>{parentId}</Badge>
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
          setSort={setSort}
          setSortOrder={setSortOrder}
          column={column}
          title={categoryColumns.createdAt}
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
          title={categoryColumns.updatedAt}
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
      cell: ({ row }) => <CategoriesRowActions row={row} />,
    },
  ]
}
