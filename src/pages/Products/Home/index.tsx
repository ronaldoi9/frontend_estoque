import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import api from '../../../services/api'
import './index.css'

interface Product {
    id: number
    name: string
    quantity: number
    price: number
}

const Products: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([])
    const history = useHistory()

    useEffect(() => {
        loadProducts()
    }, [])

    async function loadProducts(): Promise<void> {
        const response = await api.get('/product')
        setProducts(response.data.items)
    }

    async function deleteProduct(id: Number) {
        await api.delete(`/product/${id}`)
        loadProducts()
    }


    function formatPrice(price: Number): String {
        return price.toFixed(2)
    }

    function createProduct() {
        history.push('/product')
    }

    function editProduct(id: Number) {
        history.push(`/product/${id}`)
    }

    return (
        <div className="container">
            <br/>
                <div className="product-header">
                    <h1>Produtos</h1>
                    <Button variant="dark" size="sm" onClick={createProduct}>Adicionar</Button>
                </div>
            <br/>
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map( (product, index) => (
                            <tr key={index}>
                                <td>{ index + 1 }</td>
                                <td>{ product.name }</td>
                                <td>{ product.quantity }</td>
                                <td>R${ formatPrice(product.price) }</td>
                                <td>
                                    <Button size="sm" variant="success" onClick={() => editProduct(product.id)}>Editar</Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => deleteProduct(product.id)}>Deletar</Button>{' '}
                                    <Button size="sm" variant="info">Visualizar</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Products