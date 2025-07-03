import BorrowRowCard from "@/components/BorrowRowCard";
import Loader from "@/components/Loader";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBorrowSummeryQuery } from "@/redux/feature/borrow/borrowApi";
import type { IBorrowedBook } from "@/type/borrow_type";
import { motion } from 'motion/react'

const Summery = () => {
    const { data, isLoading } = useGetBorrowSummeryQuery()
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="h-screen">
            <h1 className="font-semibold text-2xl text-center py-10">Borrow Summary</h1>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Table className="border-2  max-w-6xl mx-auto dark:bg-gray-900 bg-white">
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
                            Array.isArray(data?.data) && data.data.map((borrowBook: IBorrowedBook, idx: number) => (
                                <BorrowRowCard index={idx} key={idx} borrowBook={borrowBook} />
                            ))
                        }
                    </TableBody>
                </Table>
            </motion.div>
        </div >
    );
};

export default Summery;