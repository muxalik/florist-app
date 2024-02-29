import Filter from '@/components/filters/filter'
import { categoryColumns } from '@/constants/categories/columns'
import {
  categoryFormatsFilter,
  categoryHasImageFilter,
  defaultCategoryFilters,
} from '@/constants/categories/filters'
import { useCategoryFilters } from './store'
import _ from 'lodash'

const CategoryImageFilter = () => {
  const filters = useCategoryFilters((state) => state.filters)
  const onFormatsSelect = useCategoryFilters((state) => state.onFormatsSelect)
  const onImageSelect = useCategoryFilters((state) => state.onImageSelect)
  const clearImageFilters = useCategoryFilters(
    (state) => state.clearImageFilters
  )

  return (
    <Filter
      title={categoryColumns.image}
      filters={[
        categoryHasImageFilter(filters.has_image, onImageSelect),
        categoryFormatsFilter(filters.formats, onFormatsSelect),
      ]}
      onClear={clearImageFilters}
      hasChanged={
        filters.has_image !== defaultCategoryFilters.has_image ||
        !_.isEqual(filters.formats, defaultCategoryFilters.formats)
      }
    />
  )
}

export default CategoryImageFilter
