import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetAllBooksQuery } from "@/redux/feature/book/bookApi";
import type { IBook } from "@/type/addBooks_type";
import BookRowCard from "../component/BookRowCard";

const AllBook = () => {
    const { data, isLoading } = useGetAllBooksQuery()
    console.log(data)
    if (isLoading) {
        return <p>Lodading.........</p>
    }

    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead >Image</TableHead>
                    <TableHead >Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead >ISBN</TableHead>
                    <TableHead >Copies</TableHead>
                    <TableHead >Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Array.isArray(data?.data) && data.data.map((book: IBook) => (
                        <BookRowCard key={book._id} book={book} />
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default AllBook;