import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  prod_category: null,
}

export const Category = createSlice({
  name: 'prod_category',
  initialState,
  reducers: {
    setCategory:(state, action) => {
        state.prod_category = action.payload.prod_category
    },
    unSetCategory:(state, action) => {
        state.prod_category = action.payload.prod_category
    },
  },
})

export const { setCategory, unSetCategory } = Category.actions

export default Category.reducer