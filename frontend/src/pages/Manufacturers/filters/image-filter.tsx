import Filter from '@/components/filters/filter'
import { manufacturerColumns } from '@/constants/manufacturers/columns'
import { formatsFilter, hasImageFilter } from '@/constants/filters'
import { useManufacturerFilters } from './store'
import _ from 'lodash'
import { defaultCategoryFilters } from '@/constants/categories/filters'

const ManufacturerImageFilter = () => {
  const filters = useManufacturerFilters((state) => state.filters)
  const onFormatsSelect = useManufacturerFilters(
    (state) => state.onFormatsSelect
  )
  const onImageSelect = useManufacturerFilters((state) => state.onImageSelect)
  const clearImageFilters = useManufacturerFilters(
    (state) => state.clearImageFilters
  )

  return (
    <Filter
      title={manufacturerColumns.image}
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

export default ManufacturerImageFilter
