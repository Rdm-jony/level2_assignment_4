import type { IBorrowedBook } from "@/type/borrow_type";
import { TableCell } from "@/components/ui/table"

const BorrowRowCard = ({ borrowBook }: { borrowBook: IBorrowedBook }) => {
    const { title, image, isbn } = borrowBook.book

    return (
        <tr className="border-2">
            <TableCell >
                <img className="w-20 h-20" src={image} alt="" />
            </TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{isbn}</TableCell>
            <TableCell >{borrowBook?.totalQuantity}</TableCell>

        </tr>
    );
};

export default BorrowRowCard;