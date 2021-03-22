import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Product } from '../../../domain/product'
import { ProductState } from '../../../store/ducks/product'
import { deleteProduct } from '../../../store/ducks/product/actions'
import api from '../../../services/api'

import './index.css'
import { ProductRow } from '../../../components/ProductRow'

const Products: React.FC = () => {

    const products = useSelector<ProductState, ProductState["products"]>( state => state.products )
    const onDeleteProduct = (product: Product) => {
        dispatch(deleteProduct(product))
    }
    const dispatch = useDispatch()
    const history = useHistory()

    function createProduct() {
        history.push('/product')
    }

    function editProduct(id: Number) {
        history.push(`/product/${id}`)
    }

    async function delProduct(product: Product): Promise<void> {
        await api.delete(`/products/${product.id}`)
        onDeleteProduct(product)
    }
    
    return (
        <div className="container">
            <br/>
                <div className="product-header">
                    <h1>Produtos</h1>
                    <Button variant="dark" size="sm" onClick={createProduct}>Adicionar</Button>
                </div>
            <br/>
            <Table striped bordered hover className="table-container">
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
                            <ProductRow 
                            product={product}
                            position={index}
                            onClickDelete={delProduct}
                            onClickEdit={editProduct}
                            />
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Products