import React from 'react'
import { Product } from '../domain/product'
import { Button } from 'react-bootstrap'

interface Props {
    product: Product
    position: number
    onClickDelete: (product: Product) => Promise<void>
    onClickEdit: (id: number) => void
}

function formatPrice(price: Number): String {
    return price.toFixed(2)
}

export const ProductRow: React.FC<Props> = (props: Props)=> {
    return(
        <tr key={Math.random() * Number.MAX_SAFE_INTEGER}>
            <td>{ props.position }</td>
            <td>{ props.product.name }</td>
            <td>{ props.product.quantity }</td>
            <td>R${ formatPrice(props.product.price) }</td>
            <td className="buttons-container">
                <Button size="sm" variant="success" onClick={() => props.onClickEdit(props.product.id)}>Editar</Button>
                <Button size="sm" variant="danger" onClick={() => props.onClickDelete(props.product)}>Deletar</Button>
            </td>
        </tr>
    )
}