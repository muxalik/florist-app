import Filter from '@/components/filters/filter'
import { categoryColumns } from '@/constants/categories/columns'
import {
  categoryParentFilter,
  defaultCategoryFilters,
} from '@/constants/categories/filters'
import { useCategoryFilters } from './store'

const ParentNameFilter = () => {
  const filters = useCategoryFilters((state) => state.filters)
  const onParentChange = useCategoryFilters((state) => state.onParentChange)
  const clearParentFilters = useCategoryFilters(
    (state) => state.clearParentFilters
  )

  return (
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
  )
}

export default ParentNameFilter
