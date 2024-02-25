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

export function CategoriesToolbar<TData>({
  table,
  columnNames,
}: DataTableToolbarProps<TData>) {
  const search = useCategories((state) => state.search)
  const onSearch = useCategories((state) => state.onSearch)

  const filters = useCategoryFilters((state) => state.filters)
  const clearIdFilters = useCategoryFilters((state) => state.clearIdFilters)
  const clearImageFilters = useCategoryFilters(
    (state) => state.clearImageFilters
  )
  const clearNameFilters = useCategoryFilters((state) => state.clearNameFilters)
  const clearParentFilters = useCategoryFilters(
    (state) => state.clearParentFilters
  )

  const onIdSelect = useCategoryFilters((state) => state.onIdSelect)
  const onImageSelect = useCategoryFilters((state) => state.onImageSelect)
  const onFormatsSelect = useCategoryFilters((state) => state.onFormatsSelect)
  const onNameChange = useCategoryFilters((state) => state.onNameChange)
  const onParentChange = useCategoryFilters((state) => state.onParentChange)

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
        </ul>
      </div>
      <div className='flex flex-1 items-center space-x-2'>
        <AddSheet />
      </div>
    </div>
  )
}
