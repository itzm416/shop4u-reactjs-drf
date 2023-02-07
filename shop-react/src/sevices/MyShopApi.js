import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const MyShopApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({

    // ---------------------------------------------------------------------------------

    getAllProducts: builder.query({
        query: (slug) => ({
        url:`${slug}/`,
        method:'GET'
      })
    }),
     
    // ------------------------------------------
    
    loginUser: builder.mutation({
      // ------------------------------------
      query: (userdata) => {
        return {
          url:'accounts/login/',
          method:'POST',
          body:userdata,
          headers:{
            'Content-type':'application/json'
          }
        }
      }
      // ------------------------------------
  }),
  
  productsearch: builder.mutation({
      // ------------------------------------
      query: (userdata) => {
        return {
          url:'product/search/',
          method:'POST',
          body:userdata,
          headers:{
            'Content-type':'application/json'
          }
        }
      }
      // ------------------------------------
  }),
    
  passwordreset: builder.mutation({
      // ------------------------------------
      query: ({actualData, dataurl}) => {
        return {
          url:`accounts/passwordreset/${dataurl.uid}/${dataurl.token}/`,
          method:'POST',
          body:actualData,
          headers:{
            'Content-type':'application/json'
          }
        }
      }
      // ------------------------------------
  }),
  
  passwordresetemail: builder.mutation({
      // ------------------------------------
      query: (userdata) => {
        return {
          url:'accounts/send-reset-password-email/',
          method:'POST',
          body:userdata,
          headers:{
            'Content-type':'application/json'
          }
        }
      }
      // ------------------------------------
  }),
        
    signupUser: builder.mutation({
      // ------------------------------------
      query: (userdata) => {
        return {
          url:'accounts/register/',
          method:'POST',
          body:userdata,
          headers:{
            'Content-type':'application/json'
          }
        }
      }
      // ------------------------------------
  }),
    
  customer: builder.mutation({
      // ------------------------------------
      query: ({actualData, access_token}) => {
        return {
          url:'customer/address/',
          method:'POST',
          body:actualData,
          headers : {
            'authorization' : `Bearer ${access_token}`
        }
        }
      }
      // ------------------------------------
  }),
  
  changepassword: builder.mutation({
      // ------------------------------------
      query: ({actualData, access_token}) => {
        return {
          url:'accounts/change-password/',
          method:'POST',
          body:actualData,
          headers : {
            'authorization' : `Bearer ${access_token}`
        }
        }
      }
      // ------------------------------------
  }),
  
  verifyemail: builder.query({
    // ------------------------------------
      query: (data) => {
      return {
        url:`accounts/verify-email/${data.uid}/${data.token}/`,
        method:'GET'
    }
  }
    // ------------------------------------
  }),
 
  productcategory: builder.query({
    // ------------------------------------
      query: (category) => {
      return {
        url:`productcategory/${category.price}/${category.prod.prod_category}/`,
        method:'GET'
    }
  }
    // ------------------------------------
  }),

  usercart: builder.query({
    // ------------------------------------
      query: (access_token) => {
      return {
        url:`cart/${null}/`,
        method:'GET',
        headers : {
          'authorization' : `Bearer ${access_token}`
      }
    }
  }
    // ------------------------------------
  }),
  
  // ---------------------------------------------------------------------------------

  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsQuery, useChangepasswordMutation, useProductsearchMutation, usePasswordresetemailMutation, usePasswordresetMutation, useCustomerMutation, useProductcategoryQuery, useUsercartQuery, useLoginUserMutation, useSignupUserMutation, useVerifyemailQuery } = MyShopApi
