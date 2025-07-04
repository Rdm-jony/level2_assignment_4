"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useBorrowBookMutation } from "@/redux/feature/borrow/borrowApi"
import { closeModal, selectModalId } from "@/redux/modalSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks"
import { toast } from "sonner"
import type { IErrorResponse } from "@/redux/feature/book/bookApi"
import { useNavigate } from "react-router"
import BtnLoader from "./BtnLoader"

const FormSchema = z.object({
    dueDate: z.date({
        required_error: "A due date is required.",
    }),
    quantity: z.coerce.number({
        required_error: "Quantity is required.",
        invalid_type_error: "Quantity must be a number.",
    }),
})

function BorrowForm() {
    const navigate = useNavigate()
    const disPatch = useAppDispatch()
    const [borrowBook, { isLoading: isBtnLoading }] = useBorrowBookMutation()
    const bookId = useAppSelector(selectModalId)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            dueDate: undefined,
            quantity: undefined
        }
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (!bookId) {
            return toast.error('book id not found')
        }
        try {
            const response = await borrowBook({ ...data, book: bookId! }).unwrap()
            form.reset()
            disPatch(closeModal())
            navigate('/summery')
            toast.success(response.message)

        } catch (error) {
            const err = error as IErrorResponse
            toast.error(err?.data?.message)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="book quantity" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col ">
                            <FormLabel>Due date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date() || date < new Date("1900-01-01")
                                        }
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    isBtnLoading ? <BtnLoader /> : <Button type="submit">Submit</Button>
                }

            </form>
        </Form>
    )
}
export default BorrowForm