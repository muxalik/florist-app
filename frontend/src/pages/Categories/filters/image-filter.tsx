import Filter from '@/components/filters/filter'
import { categoryColumns } from '@/constants/categories/columns'
import { formatsFilter, hasImageFilter } from '@/constants/filters'
import { useCategoryFilters } from './store'
import _ from 'lodash'
import { defaultCategoryFilters } from '@/constants/categories/filters'

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
        hasImageFilter(filters.has_image, onImageSelect),
        formatsFilter(filters.formats, onFormatsSelect),
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
