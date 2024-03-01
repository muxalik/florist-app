import { idFilter } from '@/constants/filters'
import { useCategoryFilters } from './store'
import Filter from '@/components/filters/filter'
import { categoryColumns } from '@/constants/categories/columns'
import { defaultCategoryFilters } from '@/constants/categories/filters'

const CategoryIdFilter = () => {  
  const filters = useCategoryFilters((state) => state.filters)
  const clearIdFilters = useCategoryFilters((state) => state.clearIdFilters)
  const onIdSelect = useCategoryFilters((state) => state.onIdSelect)

  return (
    <Filter
      title={categoryColumns.id}
      filters={[idFilter(filters.id, onIdSelect)]}
      onClear={clearIdFilters}
      hasChanged={filters.id !== defaultCategoryFilters.id}
    />
  )
}

export default CategoryIdFilter
