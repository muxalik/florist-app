import Filter from '@/components/filters/filter'
import { manufacturerColumns } from '@/constants/manufacturers/columns'
import { nameFilter } from '@/constants/filters'
import { useManufacturerFilters } from './store'
import { defaultManufacturerFilters } from '@/constants/manufacturers/filters'

const CategoryNameFilter = () => {
  const filters = useManufacturerFilters((state) => state.filters)
  const onNameChange = useManufacturerFilters((state) => state.onNameChange)
  const clearNameFilters = useManufacturerFilters(
    (state) => state.clearNameFilters
  )

  return (
    <Filter
      title={manufacturerColumns.name}
      filters={[
        nameFilter(
          filters.min_name,
          filters.max_name,
          defaultManufacturerFilters.min_name,
          defaultManufacturerFilters.max_name,
          onNameChange
        ),
      ]}
      onClear={clearNameFilters}
      hasChanged={
        filters.max_name !== defaultManufacturerFilters.max_name ||
        filters.min_name !== defaultManufacturerFilters.min_name
      }
    />
  )
}

export default CategoryNameFilter
