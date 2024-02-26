import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/ui/data-table/view-options'
import AddSheet from './Actions/AddSheet'
import { DataTableToolbarProps } from '@/types'
import { useCategories } from './store/useCategories'
import Icons from '@/components/ui/icons'
import Filter from '../../components/filters/filter'
import { categoryColumns } from '@/constants/categories/columns'
import {
  categoryFormatsFilter,
  categoryHasImageFilter,
  categoryIdFilter,
  categoryNameFilter,
  categoryParentFilter,
  defaultCategoryFilters,
} from '@/constants/categories/filters'
import { useCategoryFilters } from './store/useCategoryFilters'
import _ from 'lodash'
import DatePickerFilter from '@/components/filters/date-picker'
import { Button } from '@/components/ui/button'

export function CategoriesToolbar<TData>({
  table,
  columnNames,
}: DataTableToolbarProps<TData>) {
  const search = useCategories((state) => state.search)
  const onSearch = useCategories((state) => state.onSearch)

  const filters = useCategoryFilters((state) => state.filters)
  const clearFilters = useCategoryFilters((state) => state.clearFilters)

  const clearIdFilters = useCategoryFilters((state) => state.clearIdFilters)
  const clearImageFilters = useCategoryFilters(
    (state) => state.clearImageFilters
  )
  const clearNameFilters = useCategoryFilters((state) => state.clearNameFilters)
  const clearParentFilters = useCategoryFilters(
    (state) => state.clearParentFilters
  )
  const clearUpdatedFilters = useCategoryFilters(
    (state) => state.clearUpdatedFilters
  )
  const clearCreatedFilters = useCategoryFilters(
    (state) => state.clearCreatedFilters
  )

  const onIdSelect = useCategoryFilters((state) => state.onIdSelect)
  const onImageSelect = useCategoryFilters((state) => state.onImageSelect)
  const onFormatsSelect = useCategoryFilters((state) => state.onFormatsSelect)
  const onNameChange = useCategoryFilters((state) => state.onNameChange)
  const onParentChange = useCategoryFilters((state) => state.onParentChange)
  const onUpdatedChange = useCategoryFilters((state) => state.onUpdatedChange)
  const onCreatedChange = useCategoryFilters((state) => state.onCreatedChange)

  return (
    <div className='flex items-end gap-2 justify-between'>
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
        <ul className='flex gap-2 flex-wrap'>
          <li key='id'>
            <Filter
              title={categoryColumns.id}
              filters={[categoryIdFilter(filters.id, onIdSelect)]}
              onClear={clearIdFilters}
              hasChanged={filters.id !== defaultCategoryFilters.id}
            />
          </li>
          <li key='image'>
            <Filter
              title={categoryColumns.image}
              filters={[
                categoryHasImageFilter(filters.has_image, onImageSelect),
                categoryFormatsFilter(filters.formats, onFormatsSelect),
              ]}
              onClear={clearImageFilters}
              hasChanged={
                filters.has_image !== defaultCategoryFilters.has_image ||
                !_.isEqual(filters.formats, defaultCategoryFilters.formats)
              }
            />
          </li>
          <li key='name'>
            <Filter
              title={categoryColumns.name}
              filters={[
                categoryNameFilter(
                  filters.min_name,
                  filters.max_name,
                  onNameChange
                ),
              ]}
              onClear={clearNameFilters}
              hasChanged={
                filters.max_name !== defaultCategoryFilters.max_name ||
                filters.min_name !== defaultCategoryFilters.min_name
              }
            />
          </li>
          <li key='parentName'>
            <Filter
              title={categoryColumns.parentName}
              filters={[
                categoryParentFilter(
                  filters.parent_min,
                  filters.parent_max,
                  onParentChange
                ),
              ]}
              onClear={clearParentFilters}
              hasChanged={
                filters.parent_min !== defaultCategoryFilters.parent_min ||
                filters.parent_max !== defaultCategoryFilters.parent_max
              }
            />
          </li>
          <li key='createdAt'>
            <DatePickerFilter
              label={categoryColumns.createdAt}
              date={{
                from: filters.created_from?.length
                  ? new Date(Date.parse(filters.created_from))
                  : undefined,
                to: filters.created_to?.length
                  ? new Date(Date.parse(filters.created_to))
                  : undefined,
              }}
              onSelect={onCreatedChange}
              onClear={clearCreatedFilters}
              hasChanged={
                filters.created_from !== defaultCategoryFilters.created_from ||
                filters.created_to !== defaultCategoryFilters.created_to
              }
            />
          </li>
          <li key='updatedAt'>
            <DatePickerFilter
              label={categoryColumns.updatedAt}
              date={{
                from: filters.updated_from?.length
                  ? new Date(Date.parse(filters.updated_from))
                  : undefined,
                to: filters.updated_to?.length
                  ? new Date(Date.parse(filters.updated_to))
                  : undefined,
              }}
              onSelect={onUpdatedChange}
              onClear={clearUpdatedFilters}
              hasChanged={
                filters.updated_from !== defaultCategoryFilters.updated_from ||
                filters.updated_to !== defaultCategoryFilters.updated_to
              }
            />
          </li>
        </ul>
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
        <AddSheet />
      </div>
    </div>
  )
}
