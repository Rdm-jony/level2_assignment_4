import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface IModal {
    isOpen: boolean,
    type: string
}

const initialState: IModal = {
    isOpen: false,
    type: ''
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<string>) => {
            state.isOpen = true
            state.type = action.payload
        },
        closeModal: (state) => {
            state.isOpen = false
            state.type = ""
        },

    }
})

export const { openModal, closeModal } = modalSlice.actions;
export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;

export const selectModalType = (state: RootState) => state.modal.type;

export default modalSlice.reducer;