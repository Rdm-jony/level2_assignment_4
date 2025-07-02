// Need to use the React-specific entry point to import createApi
import type { IBookReponse } from '@/type/addBooks_type';
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

// Define a service using a base URL and exppected endpoints
export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/books' }),
  tagTypes: ['book'],
  endpoints: (builder) => ({
    addBook: builder.mutation<IResponse, FormData>({
      query: (formData) => ({
        url: '/',
        method: 'Post',
        body: formData
      })
    }),
    getAllBooks: builder.query<IBookReponse, void>({
      query: () => '/',
      providesTags: ['book']
    }),
    deleteBooks: builder.mutation<IBookReponse, string>({
      query: (bookId) => ({
        url: `/${bookId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['book']
    }),
    getSingleBook: builder.query<IBookReponse, string | undefined>({
      query: (bookId) => `/${bookId}`
    }),
    updateBook: builder.mutation<IBookReponse, { bookId: string; formData: FormData }>({
      query: ({ bookId, formData }) => ({
        url: `/${bookId}`,
        method: 'PUT',
        body: formData
      }),
      invalidatesTags: ['book']
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddBookMutation, useGetAllBooksQuery, useDeleteBooksMutation, useGetSingleBookQuery, useUpdateBookMutation } = bookApi