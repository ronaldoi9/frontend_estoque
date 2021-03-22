import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './App.css'
import Routes from './routes'
import api from './services/api'
import { Product } from './domain/product'
import { loadProducts } from './store/ducks/product/actions'
import { parseToProduct } from './utils/parse-to-product'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    (async (): Promise<void> => {
      const response = await api.get('/products')
      const products = response.data.items.map((product: Product) => parseToProduct(product))
      dispatch(loadProducts(products))
    })()
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>    
  )
}

export default App
