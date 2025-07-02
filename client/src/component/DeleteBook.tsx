import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { useDeleteBooksMutation, type IErrorResponse } from "@/redux/feature/book/bookApi";
import { closeModal, selectModalId } from "@/redux/modalSlice";
import { toast } from "sonner";

const DeleteBook = () => {
    const id = useAppSelector(selectModalId)
    const dispatch = useAppDispatch()
    const [deleteBook] = useDeleteBooksMutation()

    const handleDeleteBook = async () => {
        try {
            const response = await deleteBook(id ?? '').unwrap()
            toast.success(response.message)
            dispatch(closeModal())
        } catch (error) {
            const err = error as IErrorResponse
            toast.error(err.data?.message)
        }
    }

    return (
        <div>
            <h2 className="font-semibold text-2xl text-center">Are sure to delete this book?</h2>
            <div className="flex justify-around items-center mt-10">
                <Button onClick={() => dispatch(closeModal())} className="bg-red-500">Cancel</Button>
                <Button onClick={handleDeleteBook} className="bg-green-500">Confirm</Button>
            </div>
        </div>
    );
};

export default DeleteBook;