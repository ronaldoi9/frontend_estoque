import { createStore } from 'redux'
import { productReducer } from './product/productReducer'

export const store = createStore(productReducer)