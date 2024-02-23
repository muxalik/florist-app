import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/ui/data-table/view-options'
import ImageFilter from './Filters/ImageFilter'
import AddSheet from './Actions/AddSheet'
import { DataTableToolbarProps } from '@/types'
import { useCategories } from './store'

export function CategoriesToolbar<TData>({
  table,
  columnNames,
}: DataTableToolbarProps<TData>) {
  const filters = useCategories((state) => state.filters)
  const setFilters = useCategories((state) => state.setFilters)
  const search = useCategories((state) => state.search)
  const onSearch = useCategories((state) => state.onSearch)

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
        <AddSheet />
      </div>
    </div>
  )
}
