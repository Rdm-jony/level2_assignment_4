import type { IBorrowedBook } from "@/type/borrow_type";
import { TableCell } from "@/components/ui/table"
import { motion } from 'motion/react'

const BorrowRowCard = ({ borrowBook,index}: { borrowBook: IBorrowedBook,index:number }) => {
    const { title, image, isbn } = borrowBook.book

    return (
        <motion.tr
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="border-2">
            <TableCell >
                <img className="md:w-20 w-12 h-12 md:h-20" src={image} alt="" />
            </TableCell>
            <TableCell className="font-semibold capitalize">{title}</TableCell>
            <TableCell>{isbn}</TableCell>
            <TableCell >{borrowBook?.totalQuantity}</TableCell>

        </motion.tr>
    );
};

export default BorrowRowCard;