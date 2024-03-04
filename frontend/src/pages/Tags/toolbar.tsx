import { DataTableViewOptions } from '@/components/ui/data-table/view-options'
import CreateTag from './actions/create-tag'
import { DataTableToolbarProps } from '@/types'
import _ from 'lodash'
import TagFilters from './filters'
import ExportButton from '@/components/ExportButton'
import TagSearch from './search'

export function TagToolbar<TData>({
  table,
  columnNames,
}: DataTableToolbarProps<TData>) {
  return (
    <div className='flex items-end gap-10 justify-between'>
      <div className='flex flex-col flex-1 gap-x-2 gap-y-3 items-start'>
        <div className='flex gap-2'>
          <TagSearch />
          <DataTableViewOptions table={table} columnNames={columnNames} />
        </div>
        <TagFilters />
      </div>
      <div className='flex space-x-2'>
        <ExportButton downloadUrl='/tags/export/excel' filename='Теги' />
        <CreateTag />
      </div>
    </div>
  )
}
