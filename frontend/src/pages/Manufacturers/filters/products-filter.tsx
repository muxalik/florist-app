import Filter from '@/components/filters/filter'
import { productCountFilter } from '@/constants/filters'
import { useManufacturerFilters } from './store'
import { defaultManufacturerFilters } from '@/constants/manufacturers/filters'
import { manufacturerColumns } from '@/constants/manufacturers/columns'

const ManufacturerProductsFilter = () => {
  const filters = useManufacturerFilters((state) => state.filters)
  const onProductCountChange = useManufacturerFilters(
    (state) => state.onProductCountChange
  )
  const clearProductCountFilters = useManufacturerFilters(
    (state) => state.clearProductCountFilters
  )

  return (
    <Filter
      title={manufacturerColumns.productsCount}
      filters={[
        productCountFilter(
          filters.min_products,
          filters.max_products,
          defaultManufacturerFilters.min_products,
          defaultManufacturerFilters.max_products,
          onProductCountChange
        ),
      ]}
      onClear={clearProductCountFilters}
      hasChanged={
        filters.max_products !== defaultManufacturerFilters.max_products ||
        filters.min_products !== defaultManufacturerFilters.min_products
      }
    />
  )
}

export default ManufacturerProductsFilter
