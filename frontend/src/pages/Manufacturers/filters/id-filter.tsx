import { idFilter } from '@/constants/filters'
import { useTagFilters } from './store'
import Filter from '@/components/filters/filter'
import { defaultTagFilters } from '@/constants/tags/filters'
import { tagColumns } from '@/constants/tags/columns'

const TagIdFilter = () => {
  const filters = useTagFilters((state) => state.filters)
  const clearIdFilters = useTagFilters((state) => state.clearIdFilters)
  const onIdSelect = useTagFilters((state) => state.onIdSelect)

  return (
    <Filter
      title={tagColumns.id}
      filters={[idFilter(filters.id, onIdSelect)]}
      onClear={clearIdFilters}
      hasChanged={filters.id !== defaultTagFilters.id}
    />
  )
}

export default TagIdFilter
