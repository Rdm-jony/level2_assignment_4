import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetAllBooksQuery } from "@/redux/feature/book/bookApi";
import type { IBook } from "@/type/addBooks_type";
import BookRowCard from "../component/BookRowCard";

const AllBook = () => {
    const { data, isLoading } = useGetAllBooksQuery()
    if (isLoading) {
        return <p>Lodading.........</p>
    }

    return (
        <div>
            <h1 className="font-semibold text-2xl text-center my-10">All Books</h1>
            <Table className="border-2">
                <TableHeader>
                    <TableRow>
                        <TableHead >Image</TableHead>
                        <TableHead >Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead >ISBN</TableHead>
                        <TableHead >Copies</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
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
        </div>
    );
};

export default AllBook;