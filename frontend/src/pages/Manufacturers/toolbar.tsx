import { DataTableViewOptions } from '@/components/ui/data-table/view-options'
import { DataTableToolbarProps } from '@/types'
import ManfuacturerSearch from './search'
import ManufacturerFilters from './filters'
import ExportButton from '@/components/ExportButton'
import CreateManufacturer from './actions/create-manufacturer'

export function ManufacturerToolbar<TData>({
  table,
  columnNames,
}: DataTableToolbarProps<TData>) {
  return (
    <div className='flex items-end gap-10 justify-between'>
      <div className='flex flex-col flex-1 gap-x-2 gap-y-3 items-start'>
        <div className='flex gap-2'>
          <ManfuacturerSearch />
          <DataTableViewOptions table={table} columnNames={columnNames} />
        </div>
        <ManufacturerFilters />
      </div>
      <div className='flex space-x-2'>
        <ExportButton
          downloadUrl='/manfuacturers/export/excel'
          filename='Производители'
        />
        <CreateManufacturer />
      </div>
    </div>
  )
}
