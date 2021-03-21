import React from 'react'
import { Switch, Route } from 'react-router-dom'

import home from './pages/Products/Home'
import productForm from './pages/Products/Form'

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={home}/>
            <Route path="/product" exact component={productForm}/>
            <Route path="/product/:id" exact component={productForm}/>
        </Switch>
    )
}

export default Routes