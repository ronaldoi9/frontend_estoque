import { Product } from "../domain/product"

export function parseToProduct(JSON: any): Product {
    return {
        ...JSON,
        quantity: Number(JSON.quantity),
        price: Number(JSON.price)
    }
}