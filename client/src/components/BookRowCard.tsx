import { TableCell } from "@/components/ui/table"
import type { IBook } from "@/type/book_type";
import { CheckCircle, Edit, Info, Save, Trash, XCircle } from "lucide-react";
import { cn } from '@/lib/utils';
import { useAppDispatch } from "@/hooks/redux_hooks";
import { openModal } from "@/redux/modalSlice";
import { Button } from "@/components/ui/button";
import { motion } from 'motion/react'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const BookRowCard = ({ book, index }: { book: IBook, index: number }) => {
    const dispatch = useAppDispatch()
    const handleModalTrigger = (type: string, id: string) => {
        dispatch(openModal({ type, id }))
    }
    return (
        <motion.tr
            className="border-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
        >
            <TableCell>
                <div className="relative">
                    <img className="md:w-20 md:h-20 w-12 h-12" src={book?.image instanceof File ? URL.createObjectURL(book.image) : book.image} alt="" />
                    <span className={cn("text-xs bg-primary md:inline hidden text-white px-1 rounded-full absolute top-2 left-2", book?.available ? 'bg-primary dark:bg-gray-800' : 'bg-red-500')}>{book?.available ? 'Available' : "Unavailable"}</span>
                    <span className="absolute md:hidden top-1 left-1">
                        {
                            book?.available ? <CheckCircle className="bg-blue-600 text-white rounded-full" size={15} /> : <XCircle className="bg-red-600 text-white rounded-full" size={15} />

                        }
                    </span>

                </div>
            </TableCell>
            <TableCell className="font-semibold capitalize">{book.title}</TableCell>
            <TableCell className="capitalize">{book.author}</TableCell>
            <TableCell >{book.genre}</TableCell>
            <TableCell>{book.isbn}</TableCell>
            <TableCell>{book.copies}</TableCell>
            <TableCell className="text-center space-x-4">
                <Tooltip>
                    <TooltipTrigger>
                        <Button size={"icon"} className="bg-green-600 cursor-pointer" onClick={() => handleModalTrigger("details", book._id!)}> <Info /></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Book Info</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <Button size={"icon"} className="cursor-pointer" onClick={() => handleModalTrigger("edit", book._id!)}> <Edit /></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Edit Book</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <Button size={"icon"} className="bg-blue-600 cursor-pointer" onClick={() => handleModalTrigger("borrow", book._id!)}> <Save /></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Borrow Book</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <Button size={"icon"} className="bg-red-600 cursor-pointer" onClick={() => handleModalTrigger("delete", book._id!)}><Trash /></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Delete Book</p>
                    </TooltipContent>
                </Tooltip>
            </TableCell>
        </motion.tr>
    );
};

export default BookRowCard;