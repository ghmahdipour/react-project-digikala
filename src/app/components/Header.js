import React from 'react'
import logo from '../resources/images/logo.svg'
import { Link } from 'react-router-dom'
import language from '../resources/js/languages_dict'

const Header = (props) => {
    const { countCartItems, isCartPage } = props
    return(
        <header className='row block center'>
            
            <div className='cart-container'>
                {
                    isCartPage ? <Link to='/search'>
                        {language.tokens['MAIN_PAGE']}
                    </Link> 
                    :
                    <Link  
                        to={{     
                            pathname: '/cart',
                            state: props.cartItems
                            }}
                     >
                    {countCartItems ? (
                        <button className='badge'>
                           {countCartItems}     
                        </button>
                    )
                    :
                    (
                        ''
                    )
                    } 
                    {' '}
                    Cart 
                </Link>

                }
            </div>
            <div >
                <img src={logo} alt='digikala logo'/>
            </div>
        </header>
    )
}

export default Header