import { createStore } from 'redux'
import { productReducer } from './ducks/product'

export const store = createStore(productReducer)