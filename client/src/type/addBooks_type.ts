import { z } from "zod";

export const AddBookFormShema = z.object({
    title: z.string().nonempty("title is required"),
    author: z.string().nonempty("author is required"),
    isbn: z.string().nonempty("isbn is required"),
    description: z.string().nonempty("description is required"),
    copies: z.coerce.number()
        .min(1, { message: "Copies is required" }),
    available: z.boolean().default(true).optional(),
    genre: z.enum(["FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY"], { required_error: 'genre is required' })
})

export type IBook = z.infer<typeof AddBookFormShema>