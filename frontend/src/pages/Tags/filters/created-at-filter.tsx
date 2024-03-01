import DatePickerFilter from '@/components/filters/date-picker'
import { categoryColumns } from '@/constants/categories/columns'
import { useTagFilters } from './store'
import { defaultTagFilters } from '@/constants/tags/filters'

const CategoryCreatedAtFilter = () => {
  const filters = useTagFilters((state) => state.filters)
  const onCreatedChange = useTagFilters((state) => state.onCreatedChange)
  const clearCreatedFilters = useTagFilters(
    (state) => state.clearCreatedFilters
  )

  return (
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
        filters.created_from !== defaultTagFilters.created_from ||
        filters.created_to !== defaultTagFilters.created_to
      }
    />
  )
}

export default CategoryCreatedAtFilter
