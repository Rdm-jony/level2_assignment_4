// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IResponse {
  status: number,
  message: string,
}

export interface IErrorResponse {
  status: number;
  data: {
    message: string;
  };
}

// Define a service using a base URL and expected endpoints
export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/books' }),
  endpoints: (builder) => ({
    addBook: builder.mutation<IResponse, FormData>({
      query: (formData) => ({
        url: '/',
        method: 'Post',
        body: formData
      })
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddBookMutation } = bookApi