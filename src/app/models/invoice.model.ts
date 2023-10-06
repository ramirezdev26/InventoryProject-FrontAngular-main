import { Product, socketProductSold } from "./product.model"

export interface Invoice {
    id: string,
    products: Product[],
    total: number,
    date: Date,
    invoiceType: string,
    branchId: string,
}

export interface InvoiceEvent {
    id: string,
    products: socketProductSold[],
    total: number,
    date: Date,
    type: string,
    branchId: string,
}

