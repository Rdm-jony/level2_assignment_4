import { z } from "zod";

export const AddBookFormShema = z.object({
    title: z.string().nonempty("title is required"),
    author: z.string().nonempty("author is required"),
    isbn: z.string().nonempty("isbn is required"),
    description: z.string().nonempty("description is required"),
    copies: z.coerce.number({
        required_error: "Copies is required"
    }),

    image: z.union([
        z.instanceof(File).refine(file => file.size > 0, {
            message: "Image is required"
        }),
        z.string().min(1, { message: "Image is required" }) // for existing image path
    ]),

    available: z.boolean().default(true).optional(),
    genre: z.enum(["FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY"], { required_error: 'genre is required' })
})

export type IBook = z.infer<typeof AddBookFormShema> & { _id?: string }

export type IBookReponse = {
    success: boolean,
    message: string,
    data: IBook[] | IBook
}

export interface IFliter {
    filter: string,
    sortBy: 'asc' | 'desc',
    sort: string,
    limit: string,

}
