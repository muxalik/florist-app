import ManufacturerCreatedAtFilter from './created-at-filter'
import ManufacturerIdFilter from './id-filter'
import ManufacturerImageFilter from './image-filter'
import ManufacturerNameFilter from './name-filter'
import ManufacturerProductsFilter from './products-filter'
import ManufacturerUpdatedAtFilter from './updated-at-filter'

const ManufacturerFilters = () => {
  return (
    <ul className='flex gap-2 flex-wrap'>
      <li key='id'>
        <ManufacturerIdFilter />
      </li>
      <li key='image'>
        <ManufacturerImageFilter />
      </li>
      <li key='name'>
        <ManufacturerNameFilter />
      </li>
      <li key='productsCount'>
        <ManufacturerProductsFilter />
      </li>
      <li key='createdAt'>
        <ManufacturerCreatedAtFilter />
      </li>
      <li key='updatedAt'>
        <ManufacturerUpdatedAtFilter />
      </li>
    </ul>
  )
}

export default ManufacturerFilters
