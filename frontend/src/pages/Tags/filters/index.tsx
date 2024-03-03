import TagColorFilter from './color-filter'
import TagCreatedAtFilter from './created-at-filter'
import TagIdFilter from './id-filter'
import TagNameFilter from './name-filter'
import TagProductsFilter from './products-filter'
import TagUpdatedAtFilter from './updated-at-filter'

const TagFilters = () => {
  return (
    <ul className='flex gap-2 flex-wrap'>
      <li key='id'>
        <TagIdFilter />
      </li>
      <li key='name'>
        <TagNameFilter />
      </li>
      <li key='color'>
        <TagColorFilter />
      </li>
      <li key='productsCount'>
        <TagProductsFilter />
      </li>
      <li key='createdAt'>
        <TagCreatedAtFilter />
      </li>
      <li key='updatedAt'>
        <TagUpdatedAtFilter />
      </li>
    </ul>
  )
}

export default TagFilters
