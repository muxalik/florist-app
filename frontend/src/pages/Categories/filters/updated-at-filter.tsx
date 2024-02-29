import DatePickerFilter from '@/components/filters/date-picker'
import { categoryColumns } from '@/constants/categories/columns'
import { defaultCategoryFilters } from '@/constants/categories/filters'
import { useCategoryFilters } from './store'

const CategoryUpdatedAtFilter = () => {
  const filters = useCategoryFilters((state) => state.filters)
  const onUpdatedChange = useCategoryFilters((state) => state.onUpdatedChange)
  const clearUpdatedFilters = useCategoryFilters(
    (state) => state.clearUpdatedFilters
  )

  return (
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
  )
}

export default CategoryUpdatedAtFilter
