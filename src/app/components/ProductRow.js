import React from 'react'
import format_currency from '../utils/format_currency'
import calculate_rate from '../utils/calculate_rate'
import language from '../resources/js/languages_dict'
import star from '../resources/images/star3.png'
import { Link } from 'react-router-dom'

const ProductRow = (props) => {
    const { countCartItems, addToCart } = props

    return (
        <div>
                <ul className='products'>
                    {props.products.map(product => (
                        <li key={product.id}>
                            <div className='product'>
                                <Link 
                                    to={{
                                        pathname: "/product/",
                                        state: {
                                            product_id: product.id,
                                            countItems: countCartItems
                                        },
                                        search: `?${product.id}`
                                    }}
                                >
                                    <img src={product.images.main} alt={product.title} />
                                    <p>{product.title}</p>
                                </Link>
                                <div className='product-rate'>
                                    <div className='rating'>
                                        {
                                            product.rating.rate && product.rating.count !== 0
                                            ?                             
                                                <><img src={star} alt='star' />
                                                <div className='rate'>
                                                    {calculate_rate(product.rating.rate)}
                                                </div>
                                                <div className='count'>
                                                    { "(" + product.rating.count + ")"}
                                                </div></>                                  
                                            :
                                            null
                                        }
                                    </div>                                
                                </div>
                                <div className='product-price'>
                                    <div>
                                        {product.price.rrp_price > product.price.selling_price 
                                            ?
                                                <><del className='delete'>
                                                    {format_currency(product.price.rrp_price, undefined, undefined)}
                                                </del>
                                                <button className='badge'>
                                                    {format_currency(product.price.rrp_price, product.price.selling_price, undefined)}
                                                </button></>
                                            :
                                            null
                                        }                                 
                                        <div className='selling-price'>
                                            {format_currency(undefined, product.price.selling_price, true)}  
                                        </div>
                                    </div>
                                    <button className='button-primary'
                                        onClick={() => addToCart(product)}
                                    >
                                        {language.tokens['ADD_TO_CART']}
                                    </button>
                                </div>
                            </div>
                        </li>
                    )
                    )}
                </ul>                    
        </div>
    )
}

export default React.memo(ProductRow)