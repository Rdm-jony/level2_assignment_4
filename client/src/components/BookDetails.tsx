import { useAppSelector } from "@/hooks/redux_hooks";
import { useGetSingleBookQuery } from "@/redux/feature/book/bookApi";
import { selectModalId } from "@/redux/modalSlice";
import Loader from "./Loader";
import type { IBook } from "@/type/book_type";
import { cn } from "@/lib/utils";

const genreColorMap: Record<string, string> = {
    FICTION: "bg-blue-100 text-blue-800",
    NON_FICTION: "bg-green-100 text-green-800",
    SCIENCE: "bg-yellow-100 text-yellow-800",
    HISTORY: "bg-red-100 text-red-800",
    BIOGRAPHY: "bg-purple-100 text-purple-800",
    FANTASY: "bg-pink-100 text-pink-800",
};

const BookDetails = () => {
    const bookId = useAppSelector(selectModalId);
    const { data, isLoading, isError } = useGetSingleBookQuery(bookId, { skip: !bookId });
    const book = data?.data as IBook | undefined;

    if (isLoading) return <Loader />;
    if (isError || !book) return <p className="text-center text-red-600">Failed to load book details.</p>;

    return (
        <div className=",d:max-w-md w-full mx-auto p-6 border rounded-md shadow-md dark:bg-gray-900 bg-white">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative">
                    <img
                        src={book.image instanceof File ? URL.createObjectURL(book.image) : book.image}
                        alt={book.title}
                        className="w-full md:w-32 h-40 object-cover rounded-md border"
                    />
                    <span className={cn("text-xs bg-primary md:inline hidden text-white px-1 rounded-full absolute top-2 left-2", book?.available ? 'bg-primary dark:bg-gray-800' : 'bg-red-500')}>{book?.available ? 'Available' : "Unavailable"}</span>

                </div>
                <div className="flex flex-col justify-between">
                    <h2 className="text-2xl font-bold capitalize">{book.title}</h2>
                    <p className="text-gray-600 italic">by {book.author}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full font-semibold ${genreColorMap[book.genre]}`}>
                        {book.genre}
                    </span>
                    <p className="mt-2">
                        <span className="font-semibold">ISBN:</span> {book.isbn}
                    </p>
                    <p className="mt-1">
                        <span className="font-semibold">Copies:</span> {book.copies}
                    </p>

                </div>
            </div>
            {book.description && (
                <p className="mt-4 text-gray-700 whitespace-pre-line">{book.description}</p>
            )}
        </div>
    );
};

export default BookDetails;
