
import React from 'react'
import ProductsList from './screens/ProductsList'
import ProductDetails from './screens/ProductDetails'
import ShoppingCart from './screens/ShoppingCart'
import Layout from './Layout/Layout'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

export const AppWrapper = () => {
    let routes = (
        <Switch>
            <Route path="/search" exact component={ProductsList}/>
            <Route path="/product" exact component={ProductDetails}/>
            <Route path="/cart" exact component={ShoppingCart}/>
            <Redirect to="/search" />
        </Switch>
    )

    return(
        <Layout>{routes}</Layout>
    )
}

export default withRouter(AppWrapper)