import { configureStore } from '@reduxjs/toolkit'
import { bookApi } from './feature/book/bookApi'
import { borrowApi } from './feature/borrow/borrowApi'
import modalReducer from '@/redux/modalSlice'
import filterReducer from '@/redux/filterSlice'


export const store = configureStore({
    reducer: {
        modal: modalReducer,
        filter:filterReducer,
        [bookApi.reducerPath]: bookApi.reducer,
        [borrowApi.reducerPath]: borrowApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(bookApi.middleware)
            .concat(borrowApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch