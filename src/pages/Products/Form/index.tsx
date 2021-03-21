import React, { useState, useEffect, ChangeEvent } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

import api from '../../../services/api'

interface Product {
    name: string
    quantity: number
    price: number
}

const ProductForm: React.FC = () => {

    const [ model, setModel ] = useState<Product>({
        name: '',
        quantity: 0,
        price: 0
    })
    const history = useHistory()
    const params: any = useParams()

    function isEmpty(obj: any) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    useEffect(() => {
        if(!isEmpty(params))
            findProduct(params)
    }, [params])

    function updateModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!isEmpty(params)){
            await api.put(`/product/${params.id}`, model)
        }else{
            await api.post('/product', model)
        }
        back()
    }

    async function findProduct(params: any) {
        const response = await api.get(`/product/${params.id}`)
        setModel({
            name: response.data.name,
            quantity: response.data.quantity,
            price: response.data.price,
        })
    }

    function back() {
        history.goBack()
    }

    return (
        <div className="container">
            <br/>
                <div className="product-header">
                    <h1>Produtos</h1>
                    <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
                </div>
            <br/>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="productName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text" 
                        name="name"
                        value={model.name}
                        placeholder="Insira o nome do Produto" 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} 
                    />
                </Form.Group>

                <Form.Group controlId="productQuantity">
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control 
                        placeholder="Insira a quantidade"
                        name="quantity"
                        value={model.quantity}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} 
                    />
                </Form.Group>

                <Form.Group controlId="productPrice">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control 
                        placeholder="Insira o preço"
                        name="price"
                        value={model.price}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Adicionar
                </Button>
            </Form>
    
        </div>
    )
}

export default ProductForm