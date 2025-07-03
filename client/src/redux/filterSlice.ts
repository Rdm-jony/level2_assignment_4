import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { IFliter } from "@/type/book_type";


const initialState: IFliter = {
    filter: '',
    sortBy: 'asc',
    limit: '',
    sort: 'createdAt'
}



const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
        setSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
        },
        setSortBy: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.sortBy = action.payload;
        },
        setLimit: (state, action: PayloadAction<string>) => {
            state.limit = action.payload;
        },
        resetFilter: () => initialState,
    },
});

export const selectFilterState = (state: RootState) => (state.filter)

export const { setFilter, setSort, setSortBy, setLimit, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
