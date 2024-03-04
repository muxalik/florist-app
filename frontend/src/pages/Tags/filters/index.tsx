import { defaultTagFilters } from '@/constants/tags/filters'
import TagColorFilter from './color-filter'
import TagCreatedAtFilter from './created-at-filter'
import TagIdFilter from './id-filter'
import TagNameFilter from './name-filter'
import TagProductsFilter from './products-filter'
import { useTagFilters } from './store'
import TagUpdatedAtFilter from './updated-at-filter'
import _ from 'lodash'
import Filters from '@/components/Filters'

const TagFilters = () => {
  const clearFilters = useTagFilters((state) => state.clearFilters)
  const filters = useTagFilters((state) => state.filters)

  const haveFiltersChanged = !_.isEqual(filters, defaultTagFilters)

  return (
    <Filters
      filters={[
        TagIdFilter,
        TagNameFilter,
        TagColorFilter,
        TagProductsFilter,
        TagCreatedAtFilter,
        TagUpdatedAtFilter,
      ]}
      haveChanged={haveFiltersChanged}
      reset={clearFilters}
    />
  )
}

export default TagFilters
