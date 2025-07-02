import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface IModal {
    isOpen: boolean,
    type: string,
    id?:string
}

const initialState: IModal = {
    isOpen: false,
    type: '',
    id:''
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{type:string,id:string}>) => {
            state.isOpen = true
            state.type = action.payload.type
            state.id=action.payload.id
        },
        closeModal: () => initialState,

    }
})

export const { openModal, closeModal } = modalSlice.actions;
export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;

export const selectModalType = (state: RootState) => state.modal.type;
export const selectModalId = (state: RootState) => state.modal.id;

export default modalSlice.reducer;