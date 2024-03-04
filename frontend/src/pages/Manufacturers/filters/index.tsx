import TagCreatedAtFilter from './created-at-filter'
import ManufacturerIdFilter from './id-filter'
import ManufacturerNameFilter from './name-filter'
import ManufacturerProcuctsFilter from './products-filter'
import { useManufacturerFilters } from './store'
import ManufacturerUpdatedAtFilter from './updated-at-filter'
import _ from 'lodash'
import Filters from '@/components/Filters'
import { defaultManufacturerFilters } from '@/constants/manufacturers/filters'
import ManufacturerImageFilter from './image-filter'

const ManufacturerFilters = () => {
  const clearFilters = useManufacturerFilters((state) => state.clearFilters)
  const filters = useManufacturerFilters((state) => state.filters)

  const haveFiltersChanged = !_.isEqual(filters, defaultManufacturerFilters)

  return (
    <Filters
      filters={[
        ManufacturerIdFilter,
        ManufacturerImageFilter,
        ManufacturerNameFilter,
        ManufacturerProcuctsFilter,
        TagCreatedAtFilter,
        ManufacturerUpdatedAtFilter,
      ]}
      haveChanged={haveFiltersChanged}
      reset={clearFilters}
    />
  )
}

export default ManufacturerFilters
