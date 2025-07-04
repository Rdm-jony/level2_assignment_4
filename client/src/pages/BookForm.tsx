"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AddBookFormShema, type IBook } from "@/type/book_type"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUp } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useAddBookMutation, useGetSingleBookQuery, useUpdateBookMutation, type IErrorResponse } from "@/redux/feature/book/bookApi"
import { toast } from "sonner"
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks"
import { closeModal, selectModalId } from "@/redux/modalSlice"
import { useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import Loader from "@/components/Loader"
import BtnLoader from "@/components/BtnLoader"



export const BookForm = () => {
    const dispatch = useAppDispatch()
    const bookId = useAppSelector(selectModalId)
    const [updateBook, { isLoading: isBtnLoading }] = useUpdateBookMutation()
    const { data, isLoading } = useGetSingleBookQuery(bookId, { skip: !bookId })
    const book = data?.data as IBook | undefined;
    const [addBook,{ isLoading: isBtnLoadingUpdate }] = useAddBookMutation()


    const form = useForm<IBook>({
        resolver: zodResolver(AddBookFormShema),
        defaultValues: {
            title: book?.title || "",
            author: book?.author || "",
            isbn: book?.isbn || "",
            description: book?.description || "",
            copies: book?.copies || 0,
            genre: book?.genre || "FICTION",
            available: book?.available ?? true,
            image: book?.image || undefined,
        },
    })

    useEffect(() => {
        if (book) {
            form.reset({
                title: book.title,
                author: book.author,
                isbn: book.isbn,
                description: book.description,
                copies: book.copies,
                genre: book.genre,
                available: book.available,
                image: book.image, // this is only needed if you're storing file here
            });
        }
    }, [book, form]);

    const bookImage = form.watch("image")

    async function onSubmit(values: IBook) {
        const formData = new FormData()
        for (const key in values) {
            const value = values[key as keyof typeof values]
            if (value instanceof File) {
                formData.append(key, value)
            } else {
                formData.append(key, String(value))
            }
        }
        try {
            let response;
            if (book && bookId) {
                response = await updateBook({ bookId, formData }).unwrap()
                dispatch(closeModal())
            } else {
                response = await addBook(formData).unwrap()
                form.reset()
            }

            toast.success(response.message)

        } catch (error: unknown) {
            const err = error as IErrorResponse
            toast.error(err?.data?.message)
        }

    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div>
            <h1 className="font-semibold text-2xl text-center py-10">{bookId ? "Edit Existing" : 'Add New'} book</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-10 border-2 p-5 max-w-6xl mx-auto dark:bg-gray-900 bg-white">

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload book image</FormLabel>
                                <FormControl>
                                    <Label className="w-20 h-20" htmlFor="image">
                                        <div className="w-full h-full dark:bg-gray-800 bg-gray-100 flex justify-center items-center">
                                            {bookImage ? (
                                                typeof bookImage === "string" ? (
                                                    <img className="object-cover w-full h-full" src={bookImage} alt="" />
                                                ) : (
                                                    <img className="object-cover w-full h-full" src={URL.createObjectURL(bookImage)} alt="" />
                                                )
                                            ) : (
                                                <ImageUp />
                                            )}

                                        </div>
                                        <Input id="image" className="hidden" onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            field.onChange(file)
                                        }} type="file"
                                            accept="image/*" />
                                    </Label>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Genre</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select genre" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent  >
                                        <SelectItem value="FICTION">FICTION</SelectItem>
                                        <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                                        <SelectItem value="HISTORY">HISTORY</SelectItem>
                                        <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                                        <SelectItem value="FANTASY">FANTASY</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isbn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Isbn</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="copies"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Copies</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about book"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        isBtnLoading || isBtnLoadingUpdate ? <BtnLoader  /> : <Button className="col-span-2" type="submit">Submit</Button>
                    }


                </form>
            </Form>
        </div>
    )
}