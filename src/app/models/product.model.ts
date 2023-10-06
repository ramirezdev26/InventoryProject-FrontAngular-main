export interface Product{
    id: string,
    name: string,
    description: string,
    inventoryStock: number,
    price: number,
    category: string,
    branchId: string,
    type?: string,
    quantity?: number
} 

export interface socketProductSold {
    id: string,
    name: string,
    description: string,
    inventoryStock: number,
    price: number,
    category: string,
    branchId: string,
    type?: string,
    quantity: number
}

export interface ProductStockAdded {
    productId: string,
    quantityToAdd: number
}

export interface CartItem {
    id: string,
    name: string,
    quantity: number
}