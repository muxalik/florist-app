import _ from 'lodash'
import CategoryCreatedAtFilter from './created-at-filter'
import CategoryIdFilter from './id-filter'
import CategoryImageFilter from './image-filter'
import CategoryNameFilter from './name-filter'
import ParentNameFilter from './parent-name-filter'
import { useCategoryFilters } from './store'
import CategoryUpdatedAtFilter from './updated-at-filter'
import { defaultCategoryFilters } from '@/constants/categories/filters'
import Filters from '@/components/Filters'

const CategoryFilters = () => {
  const clearFilters = useCategoryFilters((state) => state.clearFilters)
  const filters = useCategoryFilters((state) => state.filters)

  const haveFiltersChanged = !_.isEqual(filters, defaultCategoryFilters)

  return (
    <Filters
      filters={[
        CategoryIdFilter,
        CategoryImageFilter,
        CategoryNameFilter,
        ParentNameFilter,
        CategoryCreatedAtFilter,
        CategoryUpdatedAtFilter,
      ]}
      haveChanged={haveFiltersChanged}
      reset={clearFilters}
    />
  )
}

export default CategoryFilters
