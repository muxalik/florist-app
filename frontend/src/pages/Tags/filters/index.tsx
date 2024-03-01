import CategoryCreatedAtFilter from './created-at-filter'
import CategoryIdFilter from './id-filter'
import CategoryImageFilter from './image-filter'
import CategoryNameFilter from './name-filter'
import ParentNameFilter from './parent-name-filter'
import CategoryUpdatedAtFilter from './updated-at-filter'

const CategoryFilters = () => {
  return (
    <ul className='flex gap-2 flex-wrap'>
      <li key='id'>
        <CategoryIdFilter />
      </li>
      <li key='image'>
        <CategoryImageFilter />
      </li>
      <li key='name'>
        <CategoryNameFilter />
      </li>
      <li key='parentName'>
        <ParentNameFilter />
      </li>
      <li key='createdAt'>
        <CategoryCreatedAtFilter />
      </li>
      <li key='updatedAt'>
        <CategoryUpdatedAtFilter />
      </li>
    </ul>
  )
}

export default CategoryFilters
