import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import calculate_rate from '../utils/calculate_rate'
import * as actions from '../actions/productDetails'
import CustomLoading from '../components/CustomLoading'
import BackgroundImage from '../components/BackgroundImage'
import empty_products_list from '../resources/images/empty-product-list.png'
import format_currency from '../utils/format_currency'
import star from '../resources/images/star3.png'
import language from '../resources/js/languages_dict'


const ProductDetails = () => {
    const [cart_items, set_cart_items] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

    const loading = useSelector(state => state.product_details.loading)
    const product_detail = useSelector(state => state.product_details.data)

    const dispatch = useDispatch()
    const location = useLocation()
      
    const addToCartHandler = (product) => {
        const cartItems = cart_items.slice()
        let entry_in_cart = false
        cartItems.forEach((item) => {
            if(item.id === product.id){
                item.count++;
                entry_in_cart = true
            }
        })
        if(!entry_in_cart) {
            cartItems.push({...product, count: 1})
        }
        set_cart_items(cartItems)
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }

    const get_product_details = (id) => {
        dispatch(actions.getProductDetails(id))
    }

    useEffect(() => {
        let product_id = location.state.product_id
        get_product_details(product_id)
    },[])

    if(loading && product_detail.length === 0 ) return <CustomLoading />
    return (
        <>
            <Header 
                cartItems={cart_items}
                countCartItems={cart_items.length}
            />
            <main>
                <div className='content'>
                <div className='main'>
                    {
                        product_detail.length === 0
                        ?
                        <BackgroundImage image={empty_products_list} />
                        :
                        <div className='product-detail-box' key={product_detail.id}>
                            <div className='product-detail-pic'>
                                <img src={product_detail.images.main}/>
                            </div>
                            <div className='product-detail'>
                                <p>{product_detail.title}</p>
                                <div className='product-detail-rate'>
                                <div className='product-detail-rating'>
                                    {
                                        product_detail.rating.rate && product_detail.rating.count !== 0
                                        ?                             
                                            <><img src={star} alt='detail star' />
                                            <div className='detail-rate'>
                                                {calculate_rate(product_detail.rating.rate)}
                                            </div>
                                            <div className='detail-count'>
                                                { "(" + product_detail.rating.count + ")"}
                                            </div></>                                  
                                        :
                                        null
                                    }
                                </div>
                                <div className='product-detail-price'>
                                    <div>
                                        {product_detail.price.rrp_price > product_detail.price.selling_price 
                                            ?
                                                <><del className='product-detail-delete'>
                                                    {format_currency(product_detail.price.rrp_price, undefined, undefined)}
                                                </del>
                                                <button className='badge'>
                                                    {format_currency(product_detail.price.rrp_price, product_detail.price.selling_price, undefined)}
                                                </button></>
                                            :
                                            null
                                        }                                 
                                        <div className='product-detail-selling-price'>
                                            {format_currency(undefined, product_detail.price.selling_price, true)}  
                                        </div>
                                    </div>
                                    
                                </div>
                                <button className='product-detail-button-primary'
                                     onClick={() => addToCartHandler(product_detail)}                              
                                    >
                                        {language.tokens['ADD_TO_SHOPPING_CART']}
                                </button>
                            </div>
                            </div>
                           
                        </div>
                    } 
            </div>
                </div>
            </main>
        </>
    )
}

export default ProductDetails