import React, { useState, useEffect, ChangeEvent } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import api from '../../../services/api'
import { Product } from '../../../domain/product'
import { addProduct, updateProduct } from '../../../store/ducks/product/actions'
import { parseToProduct } from '../../../utils/parse-to-product'
import { NameField, QuantityField, PriceField } from '../../../components/FormField'

const ProductForm: React.FC = () => {

    const [ model, setModel ] = useState<Omit<Product, "id">>({
        name: '',
        quantity: 0,
        price: 0
    })
    const dispatch = useDispatch()
    const onAddProduct = (product: Product) => {
        dispatch(addProduct(product))
    }
    const onUpdateProduct = (product: Product) => {
        dispatch(updateProduct(product))
    }

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

        let product: Product
        if (!isEmpty(params)){
            product = (await api.put<Product>(`/products/${params.id}`, model)).data
            onUpdateProduct(parseToProduct(product))

        }else{
            product = (await api.post<Product>('/products', model)).data
            onAddProduct(parseToProduct(product))
        }
        back()
    }

    async function findProduct(params: any) {
        const response = await api.get(`/products/${params.id}`)
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
                <NameField
                    name={model.name}
                    getEvent={updateModel}
                />
                <QuantityField
                    quantity={model.quantity}
                    getEvent={updateModel}
                />
                <PriceField
                    price={model.price}
                    getEvent={updateModel}
                />
                <Button variant="primary" type="submit">
                    Adicionar
                </Button>
            </Form>
    
        </div>
    )
}

export default ProductForm