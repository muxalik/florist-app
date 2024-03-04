import { DataTableToolbarProps } from '@/types'
import CategorySearch from './search'
import { DataTableViewOptions } from '@/components/ui/data-table/view-options'
import CategoryFilters from './filters'
import ExportButton from '@/components/ExportButton'
import CreateCategory from './actions/create-category'

export function CategoryToolbar<TData>({
  table,
  columnNames,
}: DataTableToolbarProps<TData>) {
  return (
    <div className='flex items-end gap-10 justify-between'>
      <div className='flex flex-col flex-1 gap-x-2 gap-y-3 items-start'>
        <div className='flex gap-2'>
          <CategorySearch />
          <DataTableViewOptions table={table} columnNames={columnNames} />
        </div>
        <CategoryFilters />
      </div>
      <div className='flex space-x-2'>
        <ExportButton
          downloadUrl='/categories/export/excel'
          filename='Категории'
        />
        <CreateCategory />
      </div>
    </div>
  )
}
