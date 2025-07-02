import BorrowRowCard from "@/component/BorrowRowCard";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBorrowSummeryQuery } from "@/redux/feature/borrow/borrowApi";
import type { IBorrowedBook } from "@/type/borrow_type";

const Summery = () => {
    const { data, isLoading } = useGetBorrowSummeryQuery()
    if (isLoading) {
        return <p>loading....</p>
    }
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead >Image</TableHead>
                    <TableHead >Book Title</TableHead>
                    <TableHead >ISBN</TableHead>
                    <TableHead>Total Quantity Borrowed</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Array.isArray(data?.data) && data.data.map((borrowBook: IBorrowedBook, idx) => (
                        <BorrowRowCard key={idx} borrowBook={borrowBook} />
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default Summery;