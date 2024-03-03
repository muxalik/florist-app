import DatePickerFilter from '@/components/filters/date-picker'
import { manufacturerColumns } from '@/constants/manufacturers/columns'
import { defaultManufacturerFilters } from '@/constants/manufacturers/filters'
import { useManufacturerFilters } from './store'

const CategoryCreatedAtFilter = () => {
  const filters = useManufacturerFilters((state) => state.filters)
  const onCreatedChange = useManufacturerFilters(
    (state) => state.onCreatedChange
  )
  const clearCreatedFilters = useManufacturerFilters(
    (state) => state.clearCreatedFilters
  )

  return (
    <DatePickerFilter
      label={manufacturerColumns.createdAt}
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
        filters.created_from !== defaultManufacturerFilters.created_from ||
        filters.created_to !== defaultManufacturerFilters.created_to
      }
    />
  )
}

export default CategoryCreatedAtFilter
