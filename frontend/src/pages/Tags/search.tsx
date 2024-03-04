import TableSearch from '@/components/TableSearch'
import { useTags } from './store'

const TagSearch = () => {
  const search = useTags((state) => state.search)
  const onSearch = useTags((state) => state.onSearch)

  return <TableSearch search={search} onSearch={onSearch} />
}

export default TagSearch
