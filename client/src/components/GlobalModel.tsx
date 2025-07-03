import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { closeModal, selectIsModalOpen, selectModalType } from "@/redux/modalSlice";
import DeleteBook from "./DeleteBook";
import { BookForm } from "@/pages/BookForm";
import BorrowForm from "./BorrowForm";
import BookDetails from "./BookDetails";

const GlobalModel = () => {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector(selectIsModalOpen)
    const type = useAppSelector(selectModalType)

    const handleOnChange = () => dispatch(closeModal())

    let content: React.ReactNode = null

    if (isOpen && type == "edit") {
        content = <BookForm />
    } else if (isOpen && type == "delete") {
        content = <DeleteBook />
    } else if (isOpen && type == 'borrow') {
        content = <BorrowForm />
    } else if (isOpen && type == 'details') {
        content = <BookDetails />
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOnChange} >
            <DialogContent className="dark:bg-gray-900">
                {content}
            </DialogContent>
        </Dialog>
    );
};

export default GlobalModel;