// Need to use the React-specific entry point to import createApi
import type { IBookReponse, IFliter } from '@/type/book_type';
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
  tagTypes: ['book', 'borrow'],
  endpoints: (builder) => ({
    addBook: builder.mutation<IResponse, FormData>({
      query: (formData) => ({
        url: '/',
        method: 'Post',
        body: formData
      })
    }),
    getAllBooks: builder.query<IBookReponse, IFliter>({
      query: (params) => {
        const query = new URLSearchParams();

        if (params?.filter) query.set('filter', params.filter);
        if (params?.sort) query.set('sort', params.sort);
        if (params?.sortBy) query.set('sortBy', params.sortBy);
        if (params?.limit) query.set('limit', params.limit.toString());

        return `/?${query.toString()}`;
      },
      providesTags: ['book']
    }),
    deleteBooks: builder.mutation<IBookReponse, string>({
      query: (bookId) => ({
        url: `/${bookId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['book', 'borrow']
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
    }),
    getCategories: builder.query<{ success: boolean, data: { genre: string, img: string }[] }, void>({
      query: () => `/categories`
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddBookMutation, useGetAllBooksQuery, useDeleteBooksMutation, useGetSingleBookQuery, useUpdateBookMutation, useGetCategoriesQuery } = bookApi