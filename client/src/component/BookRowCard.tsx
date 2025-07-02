import { TableCell, TableRow } from "@/components/ui/table"
import type { IBook } from "@/type/addBooks_type";
import { Delete, Edit, Save, Trash } from "lucide-react";
import { cn } from '@/lib/utils';
import { useAppDispatch } from "@/hooks/redux_hooks";
import { openModal } from "@/redux/modalSlice";
import { Button } from "@/components/ui/button";

const BookRowCard = ({ book }: { book: IBook }) => {
    const dispatch = useAppDispatch()
    const handleModalTrigger = (type: string, id: string) => {
        dispatch(openModal({ type, id }))
    }
    return (
        <TableRow>
            <TableCell >
                <div className="relative">
                    <img className="w-20 h-20" src={book?.image instanceof File ? URL.createObjectURL(book.image) : book.image} alt="" />
                    <span className={cn("text-xs bg-primary text-white px-1 rounded-full absolute top-2 left-2", book?.available ? 'bg-primary' : 'bg-red-500')}>{book?.available ? 'Available' : "Unavailable"}</span>
                </div>
            </TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell >{book.genre}</TableCell>
            <TableCell>{book.isbn}</TableCell>
            <TableCell>{book.copies}</TableCell>
            <TableCell className="text-center space-x-4">

                <Button size={"icon"} className="cursor-pointer" onClick={() => handleModalTrigger("edit", book._id!)}> <Edit /></Button>
                <Button size={"icon"} className="bg-red-600 cursor-pointer" onClick={() => handleModalTrigger("delete", book._id!)}><Trash /></Button>
                <Button size={"icon"} className="bg-blue-600 cursor-pointer" onClick={() => handleModalTrigger("borrow", book._id!)}> <Save /></Button>

            </TableCell>
        </TableRow>
    );
};

export default BookRowCard;