import DatePickerFilter from '@/components/filters/date-picker'
import { defaultCategoryFilters } from '@/constants/categories/filters'
import { useTagFilters } from './store'
import { columns } from '@/constants/columns'

const CategoryUpdatedAtFilter = () => {
  const filters = useTagFilters((state) => state.filters)
  const onUpdatedChange = useTagFilters((state) => state.onUpdatedChange)
  const clearUpdatedFilters = useTagFilters(
    (state) => state.clearUpdatedFilters
  )

  return (
    <DatePickerFilter
      label={columns.updatedAt}
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
