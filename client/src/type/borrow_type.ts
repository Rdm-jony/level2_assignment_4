export type IBorrow = {
    book: string,
    quantity: number,
    dueDate: Date
}

export type IBorrowReponse = {
    success: boolean,
    message: string,
    data?: IBorrowedBook[]
}

export interface IBorrowedBook {
    
    totalQuantity: number;
    book: {
        title: string;
        isbn: string;
        image:string;
    };
}