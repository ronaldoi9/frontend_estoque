import React, { ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'

interface Event {
    getEvent: (e: ChangeEvent<HTMLInputElement>) => void
}

interface NameProps extends Event {
    name: string
}

interface QuantityProps extends Event {
    quantity: number
}

interface PriceProps extends Event {
    price: number
}

export const NameField: React.FC<NameProps> = (props: NameProps)=> {
    return(
        <Form.Group controlId="productName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
                type="text" 
                name="name"
                value={props.name}
                placeholder="Insira o nome do Produto" 
                onChange={props.getEvent} 
            />
        </Form.Group>
    )
}

export const QuantityField: React.FC<QuantityProps> = (props: QuantityProps)=> {
    return(
        <Form.Group controlId="productQuantity">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control 
                placeholder="Insira a quantidade"
                name="quantity"
                value={props.quantity === 0 ? '' : props.quantity}
                onChange={props.getEvent} 
            />
        </Form.Group>
    )
}

export const PriceField: React.FC<PriceProps> = (props: PriceProps)=> {
    return(
        <Form.Group controlId="productPrice">
            <Form.Label>Preço</Form.Label>
            <Form.Control 
                placeholder="Insira o preço"
                name="price"
                value={props.price === 0 ? '' : props.price}
                onChange={props.getEvent} 
            />
        </Form.Group>
    )
}