import React, {FC} from 'react'
// @ts-ignore
import {Searchbar, SearchForm} from '@strapi/design-system'

interface SearchBarProps {
  clearSearch: () => void
  handleSearch: (e: any) => void
  search: string
}

const SearchBar: FC<SearchBarProps> = ({clearSearch, handleSearch, search}) => {
  return (
    <SearchForm>
      <Searchbar
        name="searchbar"
        onClear={clearSearch}
        value={search}
        onChange={(e: any) => handleSearch(e.target.value)}
        clearLabel="Clearing the plugin search"
        placeholder="filter by title"
      >
        Searching for a plugin
      </Searchbar>
    </SearchForm>
  )
}

export default SearchBar
