import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchquery: null,
}

export const SearchQuery = createSlice({
  name: 'searchquery',
  initialState,
  reducers: {
    setsearchquery:(state, action) => {
        state.searchquery = action.payload.searchquery
    },
    unsetsearchquery:(state, action) => {
        state.searchquery = action.payload.searchquery
    },
  },
})

export const { setsearchquery, unsetsearchquery } = SearchQuery.actions

export default SearchQuery.reducer