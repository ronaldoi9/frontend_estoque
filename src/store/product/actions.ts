import { Product } from "../../domain/product"

type ActionMap<T extends { [index: string]: any }> = {
  [K in keyof T]: T[K] extends undefined
    ? { type: K }
    : { type: K; payload: T[K] }
};

export type Action<T> = ActionMap<T>[keyof ActionMap<T>]

export enum ProductActionType {
  ADD_PRODUCT = 'ADD_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  LOAD_PRODUCTS = 'LOAD_PRODUCTS',
}

export type ProductAction = {
    [ProductActionType.ADD_PRODUCT]: { product: Product }
    [ProductActionType.DELETE_PRODUCT]: { product: Product }
    [ProductActionType.UPDATE_PRODUCT]: { product: Product }
    [ProductActionType.LOAD_PRODUCTS]: { products: Product[] 
  }
};

export const addProduct = (product: Product): Action<ProductAction> => ({
  type: ProductActionType.ADD_PRODUCT,
  payload: {
    product
  }
})

export const updateProduct = (product: Product): Action<ProductAction> => ({
  type: ProductActionType.UPDATE_PRODUCT,
  payload: {
    product
  }
})

export const deleteProduct = (product: Product): Action<ProductAction> => ({
  type: ProductActionType.DELETE_PRODUCT,
  payload: {
    product
  }
})

export const loadProducts = (products: Product[]): Action<ProductAction> => ({
  type: ProductActionType.LOAD_PRODUCTS,
  payload: {
    products
  }
})