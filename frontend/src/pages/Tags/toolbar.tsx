import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/ui/data-table/view-options'
import CreateCategory from './actions/create-tag'
import { DataTableToolbarProps } from '@/types'
import { useTags } from './store'
import Icons from '@/components/ui/icons'
import _ from 'lodash'
import { Button } from '@/components/ui/button'
import downloadFromUrl from '@/utils/downloadFromUrl'
import TagFilters from './filters'
import { defaultTagFilters } from '@/constants/tags/filters'
import { useTagFilters } from './filters/store'
import TableSearch from '@/components/TableSearch'

export function TagToolbar<TData>({
  table,
  columnNames,
}: DataTableToolbarProps<TData>) {
  const search = useTags((state) => state.search)
  const onSearch = useTags((state) => state.onSearch)

  const clearFilters = useTagFilters((state) => state.clearFilters)
  const filters = useTagFilters((state) => state.filters)

  const hasFiltersChanged = !_.isEqual(filters, defaultTagFilters)

  return (
    <div className='flex items-end gap-10 justify-between'>
      <div className='flex flex-col flex-1 gap-x-2 gap-y-3 items-start'>
        <div className='flex gap-2'>
          <TableSearch search={search} onSearch={onSearch} />
          <DataTableViewOptions table={table} columnNames={columnNames} />
        </div>

        <div className='flex gap-x-2 gap-y-3'>
          <TagFilters />

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
          onClick={() => downloadFromUrl('/tags/export/excel', 'Теги.xlsx')}
        >
          <Icons.donwload className='w-4 h-4' />
          <span>Скачать</span>
        </Button>
        <CreateCategory />
      </div>
    </div>
  )
}
