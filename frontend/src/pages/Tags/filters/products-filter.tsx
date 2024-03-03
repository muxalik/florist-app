import Filter from '@/components/filters/filter'
import { tagProductsFilter } from '@/constants/tags/filters'
import { useTagFilters } from './store'
import { defaultTagFilters } from '@/constants/tags/filters'
import { tagColumns } from '@/constants/tags/columns'

const TagProductsFilter = () => {
  const filters = useTagFilters((state) => state.filters)
  const onProductsChange = useTagFilters((state) => state.onProductsChange)
  const clearProductsFilters = useTagFilters(
    (state) => state.clearProductsFilters
  )

  return (
    <Filter
      title={tagColumns.productsCount}
      filters={[
        tagProductsFilter(
          filters.min_products,
          filters.max_products,
          defaultTagFilters.min_products,
          defaultTagFilters.max_products,
          onProductsChange
        ),
      ]}
      onClear={clearProductsFilters}
      hasChanged={
        filters.max_products !== defaultTagFilters.max_products ||
        filters.min_products !== defaultTagFilters.min_products
      }
    />
  )
}

export default TagProductsFilter
