import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'

// -----------------------------------------------------
import { MyShopApi } from '../sevices/MyShopApi';
import UserToken from '../features/UserToken'
import Category from '../features/Category'
import SearchQuery from '../features/SearchQuery'
// -----------------------------------------

export const store = configureStore({
  
  reducer: {
    token : UserToken,
    category : Category,
    searchquery : SearchQuery,
    [MyShopApi.reducerPath] : MyShopApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(MyShopApi.middleware)

});

setupListeners(store.dispatch)