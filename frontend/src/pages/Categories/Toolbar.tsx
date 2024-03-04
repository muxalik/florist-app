import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/ui/data-table/view-options'
import CreateCategory from './actions/create-category'
import { DataTableToolbarProps } from '@/types'
import { useCategories } from './store'
import Icons from '@/components/ui/icons'
import { useCategoryFilters } from './filters/store'
import _ from 'lodash'
import { Button } from '@/components/ui/button'
import downloadFromUrl from '@/utils/downloadFromUrl'

import CategoryFilters from './filters'
import { defaultCategoryFilters } from '@/constants/categories/filters'
import TableSearch from '@/components/TableSearch'

export function CategoryToolbar<TData>({
  table,
  columnNames,
}: DataTableToolbarProps<TData>) {
  const search = useCategories((state) => state.search)
  const onSearch = useCategories((state) => state.onSearch)

  const clearFilters = useCategoryFilters((state) => state.clearFilters)
  const filters = useCategoryFilters((state) => state.filters)

  const hasFiltersChanged = !_.isEqual(filters, defaultCategoryFilters)

  return (
    <div className='flex items-end gap-10 justify-between'>
      <div className='flex flex-col flex-1 gap-x-2 gap-y-3 items-start'>
        <div className='flex gap-2'>
          <TableSearch search={search} onSearch={onSearch} />
          <DataTableViewOptions table={table} columnNames={columnNames} />
        </div>

        <CategoryFilters />

        {hasFiltersChanged && (
          <Button
            variant={'link'}
            onClick={clearFilters}
            size={'sm'}
            className='underline'
          >
            <span>Сбросить все</span>
            <Icons.close className='ml-1 w-4 h-4' />
          </Button>
        )}
      </div>
      <div className='flex space-x-2'>
        <Button
          className='gap-2'
          variant={'outline'}
          size={'sm'}
          onClick={() =>
            downloadFromUrl('/categories/export/excel', 'Категории.xlsx')
          }
        >
          <Icons.donwload className='w-4 h-4' />
          <span>Скачать</span>
        </Button>
        <CreateCategory />
      </div>
    </div>
  )
}
