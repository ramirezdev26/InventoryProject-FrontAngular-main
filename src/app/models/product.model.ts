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

export interface SocketProductAdded {
    productId: string,
    name: string,
    category: string,
    description: string,
    price: number,
    branchId: string
}

export interface SocketProductSold {
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
    products: [{
        productId: string,
        quantity: number
    }],
    quantityToAdd: number
}

export interface CartItem {
    id: string,
    name: string,
    quantity: number
}