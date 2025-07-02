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
import { AddBookFormShema, type IBook } from "@/type/addBooks_type"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUp } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useAddBookMutation, type IErrorResponse } from "@/redux/feature/book/bookApi"
import { toast } from "sonner"



export const AddBook = () => {
    const [addBook] = useAddBookMutation()
    const form = useForm<IBook>({
        resolver: zodResolver(AddBookFormShema),
        defaultValues: {
            title: '',
            author: '',
            isbn: '',
            description: '',
            copies: 0,
            genre: 'FICTION',
            available: true,
        },
    })

    

    const bookImage = form.watch("image")

    async function onSubmit(values: IBook) {
        const formdata = new FormData()
        for (const key in values) {
            const value = values[key as keyof typeof values]
            if (value instanceof File) {
                formdata.append(key, value)
            } else {
                formdata.append(key, String(value))
            }
        }
        try {
            const response = await addBook(formdata).unwrap()
            form.reset()
            toast.success(response.message)
        } catch (error: unknown) {
            const err = error as IErrorResponse
            toast.error(err?.data?.message)
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-10">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upload book image</FormLabel>
                            <FormControl>
                                <Label htmlFor="image">
                                    <div className="w-20 h-20 bg-gray-100 flex justify-center items-center">
                                        {
                                            bookImage ? <img className="object-cover w-full h-full" src={URL.createObjectURL(bookImage)} alt="" /> : <ImageUp />
                                        }

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
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}