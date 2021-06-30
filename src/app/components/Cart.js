import React from 'react'
import language from '../resources/js/languages_dict'
import format_currency from '../utils/format_currency'

const Cart = (props) => {

    const { cartItems } = props
    
    return(
        <div>
           {
               cartItems.length === 0
               ?
               <div className='cart cart-header'>{language.tokens['CART_EMPTY']}</div>
               :
               <div className='cart cart-header'>
                   {cartItems.length + ' ' + language.tokens['CART_ITEMS']}
               </div>
           }
           <div>
            <div className='cart'>
                <ul className='cart-items'>
                    {
                        cartItems.map((item) => (
                            <li key={item.id}>
                                <div>
                                    <img src={item.images.main} alt={item.title}/>
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className='cart-float-right'>
                                        <p>{item.count} {" "} * {format_currency(undefined, item.price.selling_price, true)} </p>
                                        <button className='button'
                                        onClick={() => props.removeFromCartHandler(item)}                                   
                                        >
                                            {language.tokens['REMOVE']}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {
                cartItems.length !== 0 && (
                    <div className='cart'>
                        <div className='total'>
                            <div>
                                <p>{language.tokens['SUM_CART']}</p>
                                <p>{format_currency(undefined, cartItems.reduce((a, c) => a + c.price.selling_price * c.count, 0), true)}</p>
                            </div>
                            <button className='button-primary'>
                                {language.tokens['CONTINUE_BUYING_PROCESS']}
                            </button>
                        </div>
                    </div>
                )
            }
           
            </div>
        </div>

    )
}

export default Cart