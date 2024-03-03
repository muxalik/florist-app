import DatePickerFilter from '@/components/filters/date-picker'
import { defaultManufacturerFilters } from '@/constants/manufacturers/filters'
import { useManufacturerFilters } from './store'
import { manufacturerColumns } from '@/constants/manufacturers/columns'

const CategoryUpdatedAtFilter = () => {
  const filters = useManufacturerFilters((state) => state.filters)
  const onUpdatedChange = useManufacturerFilters(
    (state) => state.onUpdatedChange
  )
  const clearUpdatedFilters = useManufacturerFilters(
    (state) => state.clearUpdatedFilters
  )

  return (
    <DatePickerFilter
      label={manufacturerColumns.updatedAt}
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
        filters.updated_from !== defaultManufacturerFilters.updated_from ||
        filters.updated_to !== defaultManufacturerFilters.updated_to
      }
    />
  )
}

export default CategoryUpdatedAtFilter
