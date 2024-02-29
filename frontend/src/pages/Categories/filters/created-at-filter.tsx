import DatePickerFilter from '@/components/filters/date-picker'
import { categoryColumns } from '@/constants/categories/columns'
import { defaultCategoryFilters } from '@/constants/categories/filters'
import { useCategoryFilters } from './store'

const CategoryCreatedAtFilter = () => {
  const filters = useCategoryFilters((state) => state.filters)
  const onCreatedChange = useCategoryFilters((state) => state.onCreatedChange)
  const clearCreatedFilters = useCategoryFilters(
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
        filters.created_from !== defaultCategoryFilters.created_from ||
        filters.created_to !== defaultCategoryFilters.created_to
      }
    />
  )
}

export default CategoryCreatedAtFilter
