import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/ui/data-table/view-options'
import ImageFilter from './Filters/ImageFilter'
import AddSheet from './Actions/AddSheet'
import { DataTableToolbarProps } from '@/types'
import { useCategories } from './store'
import Icons from '@/components/ui/icons'

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
        <div className='relative'>
          <Input
            placeholder='Поиск...'
            value={search}
            onChange={onSearch}
            className='h-8 w-[150px] lg:w-[250px] pl-8'
          />
          <Icons.search className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 w-4 h-4' />
        </div>
        <DataTableViewOptions table={table} columnNames={columnNames} />
        <ul className='flex gap-2'>
          <li key='image'>
            <ImageFilter filters={filters} setFilters={setFilters} />
          </li>
        </ul>
      </div>
      <div className='flex flex-1 items-center space-x-2'>
        <AddSheet />
      </div>
    </div>
  )
}
