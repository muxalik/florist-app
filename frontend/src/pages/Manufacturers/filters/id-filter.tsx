import { idFilter } from '@/constants/filters'
import { useManufacturerFilters } from './store'
import Filter from '@/components/filters/filter'
import { manufacturerColumns } from '@/constants/manufacturers/columns'
import { defaultManufacturerFilters } from '@/constants/manufacturers/filters'

const CategoryIdFilter = () => {
  const filters = useManufacturerFilters((state) => state.filters)
  const clearIdFilters = useManufacturerFilters((state) => state.clearIdFilters)
  const onIdSelect = useManufacturerFilters((state) => state.onIdSelect)

  return (
    <Filter
      title={manufacturerColumns.id}
      filters={[idFilter(filters.id, onIdSelect)]}
      onClear={clearIdFilters}
      hasChanged={filters.id !== defaultManufacturerFilters.id}
    />
  )
}

export default CategoryIdFilter
