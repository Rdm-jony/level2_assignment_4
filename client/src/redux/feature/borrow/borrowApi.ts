// Need to use the React-specific entry point to import createApi
import type { IBorrowReponse } from '@/type/borrow_type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const borrowApi = createApi({
    reducerPath: 'borrowApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://librarymanagementexpress.vercel.app/api/borrow' }),
    tagTypes: ['book','borrow'],
    endpoints: (builder) => ({
        borrowBook: builder.mutation<IBorrowReponse, { book: string, quantity: number, dueDate: Date }>({
            query: (formData) => ({
                url: '/',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['book','borrow']
        }),
        getBorrowSummery:builder.query<IBorrowReponse,void>({
            query:()=>'/',
            providesTags:['borrow']
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useBorrowBookMutation,useGetBorrowSummeryQuery} = borrowApi