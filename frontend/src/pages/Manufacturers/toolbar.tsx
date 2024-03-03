import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/ui/data-table/view-options'
import CreateCategory from './actions/create-manufacturer'
import { DataTableToolbarProps } from '@/types'
import { useManufacturers } from './store'
import Icons from '@/components/ui/icons'
import _ from 'lodash'
import { Button } from '@/components/ui/button'
import downloadFromUrl from '@/utils/downloadFromUrl'
import { useManufacturerFilters } from './filters/store'
import { defaultManufacturerFilters } from '@/constants/manufacturers/filters'
import ManufacturerFilters from './filters'

export function ManufacturerToolbar<TData>({
  table,
  columnNames,
}: DataTableToolbarProps<TData>) {
  const search = useManufacturers((state) => state.search)
  const onSearch = useManufacturers((state) => state.onSearch)

  const clearFilters = useManufacturerFilters((state) => state.clearFilters)
  const filters = useManufacturerFilters((state) => state.filters)

  const hasFiltersChanged = !_.isEqual(filters, defaultManufacturerFilters)

  return (
    <div className='flex items-end gap-10 justify-between'>
      <div className='flex flex-col flex-1 gap-x-2 gap-y-3 items-start'>
        <div className='flex gap-2'>
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
        </div>

        <div className='flex gap-x-2 gap-y-3'>
          <ManufacturerFilters />

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
      </div>
      <div className='flex space-x-2'>
        <Button
          className='gap-2'
          variant={'outline'}
          size={'sm'}
          onClick={() =>
            downloadFromUrl('/manufacturers/export/excel', 'Производители.xlsx')
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
