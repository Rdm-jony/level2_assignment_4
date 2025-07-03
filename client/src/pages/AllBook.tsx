import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetAllBooksQuery } from "@/redux/feature/book/bookApi";
import type { IBook } from "@/type/book_type";
import BookRowCard from "../components/BookRowCard";
import Loader from "@/components/Loader";
import { motion } from 'motion/react'
import { genre } from "@/constant/genreConstant";
import { selectFilterState, setFilter } from "@/redux/filterSlice";
import { useAppSelector } from "@/hooks/redux_hooks";
import { useDispatch } from "react-redux";

const AllBook = () => {
    const disPatch = useDispatch()
    const { filter, sort, limit, sortBy } = useAppSelector(selectFilterState)
    const { data, isLoading } = useGetAllBooksQuery({ filter, limit, sort, sortBy }, { refetchOnMountOrArgChange: true })




    const handleTabChange = (value: string) => {
        disPatch(setFilter(value === "All" ? "" : value));
    };

    if (isLoading) {
        return <Loader />
    }


    return (
        <div className="h-screen">
            <div className="border-b-2">
                <Tabs defaultValue={filter ? filter : "All"} onValueChange={handleTabChange} className="max-w-6xl mx-auto">
                    <TabsList className="bg-sky-50 dark:bg-gray-800 w-full overflow-auto">
                        {
                            genre.map((item: string, idx: number) => <TabsTrigger key={idx} value={item}>{item}</TabsTrigger>)
                        }

                    </TabsList>
                </Tabs>
            </div>
            <h1 className="font-semibold text-2xl text-center py-10">All Books</h1>
            {
                Array.isArray(data?.data) && data.data?.length != 0 ? <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Table className="border-2 overflow-scroll  max-w-6xl mx-auto dark:bg-gray-900 bg-white">
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
                                Array.isArray(data?.data) && data.data.map((book: IBook, idx: number) => (
                                    <BookRowCard index={idx} key={book._id} book={book} />
                                ))
                            }
                        </TableBody>
                    </Table>
                </motion.div> : <div className="text-center py-10 text-gray-500 text-xl">
                    📚 No {filter} books found.
                </div>
            }
        </div>
    );
};

export default AllBook;