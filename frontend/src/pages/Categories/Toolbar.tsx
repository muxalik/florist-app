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

export function CategoryToolbar<TData>({
  table,
  columnNames,
}: DataTableToolbarProps<TData>) {
  const search = useCategories((state) => state.search)
  const onSearch = useCategories((state) => state.onSearch)

  const clearFilters = useCategoryFilters((state) => state.clearFilters)

  return (
    <div className='flex items-end gap-10 justify-between'>
      <div className='flex flex-1 flex-wrap gap-x-2 gap-y-3 items-start'>
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

        <CategoryFilters />

        <Button
          variant={'link'}
          onClick={clearFilters}
          size={'sm'}
          className='underline'
        >
          Сбросить все
        </Button>
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
