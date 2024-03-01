import Filter from '@/components/filters/filter'
import { categoryColumns } from '@/constants/categories/columns'
import { nameFilter } from '@/constants/filters'
import { useTagFilters } from './store'
import { defaultCategoryFilters } from '@/constants/categories/filters'

const CategoryNameFilter = () => {
  const filters = useTagFilters((state) => state.filters)
  const onNameChange = useTagFilters((state) => state.onNameChange)
  const clearNameFilters = useTagFilters((state) => state.clearNameFilters)

  return (
    <Filter
      title={categoryColumns.name}
      filters={[
        nameFilter(
          filters.min_name,
          filters.max_name,
          defaultCategoryFilters.min_name,
          defaultCategoryFilters.max_name,
          onNameChange
        ),
      ]}
      onClear={clearNameFilters}
      hasChanged={
        filters.max_name !== defaultCategoryFilters.max_name ||
        filters.min_name !== defaultCategoryFilters.min_name
      }
    />
  )
}

export default CategoryNameFilter
