import BorrowRowCard from "@/component/BorrowRowCard";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBorrowSummeryQuery } from "@/redux/feature/borrow/borrowApi";
import type { IBorrowedBook } from "@/type/borrow_type";

const Summery = () => {
    const { data, isLoading } = useGetBorrowSummeryQuery()
    if (isLoading) {
        return <p>loading....</p>
    }
    return (
        <div>
            <h1 className="font-semibold text-2xl text-center my-10">Borrow Summary</h1>

            <Table className="border-2">
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
        </div>
    );
};

export default Summery;