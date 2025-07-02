import { TableCell } from "@/components/ui/table"
import type { IBook } from "@/type/addBooks_type";
import { Delete, Edit } from "lucide-react";
import { cn } from '@/lib/utils';
import { useAppDispatch } from "@/hooks/redux_hooks";
import { openModal } from "@/redux/modalSlice";

const TableCardRow = ({ book }: { book: IBook }) => {
    const dispatch=useAppDispatch()
   const handleModalTrigger=(type:string)=>{
        dispatch(openModal(type))
    }
    return (
        <tr className="border-2">
            <TableCell >
                <div className="relative">
                    <img className="w-20 h-20" src={book?.image instanceof File ? URL.createObjectURL(book.image) : book.image} alt="" />
                    <span className={cn("text-xs bg-primary text-white px-1 rounded-full absolute top-2 left-2", book?.available ? 'bg-primary' : 'bg-red-500')}>{book?.available?'Available':"Unavailable"}</span>
                </div>
            </TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell >{book.genre}</TableCell>
            <TableCell>{book.isbn}</TableCell>
            <TableCell>{book.copies}</TableCell>
            <TableCell> <div className="flex gap-2">
                <Edit onClick={()=>handleModalTrigger("edit")} /> <Delete />
            </div> </TableCell>
        </tr>
    );
};

export default TableCardRow;