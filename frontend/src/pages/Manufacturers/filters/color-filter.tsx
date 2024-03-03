import { useTagFilters } from './store'
import Filter from '@/components/filters/filter'
import { tagColumns } from '@/constants/tags/columns'
import _ from 'lodash'
import { defaultTagFilters } from '@/constants/tags/filters'
import { colorsFilter } from '@/constants/filters'
import { useTags } from '../store'

const TagColorFilter = () => {
  const filters = useTagFilters((state) => state.filters)
  const onColorsChange = useTagFilters((state) => state.onColorsChange)
  const clearColorsFilters = useTagFilters((state) => state.clearColorsFilters)
  const colors = useTags((state) => state.colors)
  const onWithoutColorChange = useTagFilters(
    (state) => state.onWithoutColorChange
  )

  return (
    <Filter
      title={tagColumns.color}
      filters={[
        colorsFilter(
          'Цвета',
          colors,
          filters.colors,
          onColorsChange,
          filters.without_color,
          onWithoutColorChange
        ),
      ]}
      onClear={clearColorsFilters}
      hasChanged={
        !_.isEqual(filters.colors, defaultTagFilters.colors) ||
        filters.without_color !== defaultTagFilters.without_color
      }
      withSearch={false}
    />
  )
}

export default TagColorFilter
