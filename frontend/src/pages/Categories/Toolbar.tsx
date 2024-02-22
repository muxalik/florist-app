import { CategoryAddData, CategoryFilters, SimpleCategory } from '@/types/category'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/ui/data-table/view-options'
import { Dispatch, SetStateAction } from 'react'
import ImageFilter from './Filters/ImageFilter'
import AddSheet from './AddSheet'
import { DataTableToolbarProps } from '@/types'

type ToolbarAdditionalProps = {
  setFilters: Dispatch<SetStateAction<CategoryFilters>>
  filters: CategoryFilters
  categoryList: SimpleCategory[]
  onSave: (data: CategoryAddData) => void
}

export function Toolbar<TData>({
  table,
  columnNames,
  search,
  onSearch,
  setFilters,
  filters,
  categoryList,
  onSave,
}: DataTableToolbarProps<TData> & ToolbarAdditionalProps) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Поиск...'
          value={search}
          onChange={onSearch}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <ul className='flex gap-2'>
          <li key='image'>
            <ImageFilter filters={filters} setFilters={setFilters} />
          </li>
        </ul>
        <DataTableViewOptions table={table} columnNames={columnNames} />
      </div>
      <div className='flex flex-1 items-center space-x-2'>
        <AddSheet categoryList={categoryList} onSave={onSave} />
      </div>
    </div>
  )
}
