import { ProductActionType } from './types'
import { Action, ProductAction } from './actions'
import { Product } from "../../../domain/product"

export interface ProductState {
  products: Product[]
}

const initialState = {
  products: []
}

export const productReducer = (state:ProductState = initialState, action: Action<ProductAction>) => {
  switch(action.type){
    case ProductActionType.ADD_PRODUCT: {
      return {
        ...state, 
        products: [...state.products, action.payload.product]
      }
    }
    case ProductActionType.DELETE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload.product.id)
      }
    }
    case ProductActionType.UPDATE_PRODUCT: {
      return {
        ...state,
        products: state.products.map(product => product.id === action.payload.product.id ? action.payload.product : product)
      }
    }
    case ProductActionType.LOAD_PRODUCTS: {
      return {
        ...state,
        products: action.payload.products
      }
    }
    default:
      return state
  }
}