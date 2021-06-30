import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions/productList'
import ProductRow from '../components/ProductRow'
import ReactPaginate from 'react-paginate'
import Header from '../components/Header'
import Cart from '../components/Cart'
import CustomLoading from '../components/CustomLoading'
import InfinitScroll from 'react-infinite-scroll-component'
import InputRange from 'react-input-range'
import Switch from "react-switch"
import BackgroundImage from '../components/BackgroundImage'
import empty_products_list from '../resources/images/empty-product-list.png'
import language from '../resources/js/languages_dict'

const ProductsList = () => {
    const [pagination, set_pagination] = useState({})
    const [values, set_values] = useState({ min: 1, max: 9990000 })
    const [checked_status, set_checked] = useState(false)
    const [cart_items, set_cart_items] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
    

    const loading = useSelector(state => state.products_list.loading)
    const products_list = useSelector(state => state.products_list.data)
    const pager_list = useSelector(state => state.products_list.pager)

    const dispatch = useDispatch()

    const get_products_list = (params = {}) => {
        dispatch(actions.getProductList({ params : {...params} }))
    }

    useEffect(() => {
        const launch = async () => {
            await get_products_list({ 
                page : 1,
                results : 25, 
                sortOrder: 4
            })
        }
        launch() 
    },[])

    const removeFromCartHandler = (product) => {
        const cartItems = cart_items.slice()
        set_cart_items(cartItems.filter((x) => x.id !== product.id))
        localStorage.setItem('cartItems', JSON.stringify(cartItems.filter((x) => x.id !== product.id)))
    }

    const pageClickHandler = data => {
        const pager = pagination
        pager.selected = data.selected
        pager.selected = pager.selected === 0 ? pager.selected : pager.selected + 1
        set_pagination(pager)
        get_products_list({ 
            page : pagination.selected,
            results : 25,
            sortOrder: 4
        })            
    }

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

    const get_filter_productS = (params = {}) => {
        dispatch(actions.getfilterProduct({ params : {...params} }))
    }

    const filterProductsHandler = () =>{
        get_filter_productS({ 
            page : 1,
            value: values,
            results : 25, 
            sortOrder: 4
        }) 
    }

    const changeswitchhandler = (checked) => {
        set_checked(checked)
        get_filter_productS({ 
            page : 1,
            value: values,
            results : 25, 
            sortOrder: 4,
            checkedStatus: checked_status
        })
    }
    
  
    if(loading && products_list.length === 0 ) return <CustomLoading />
    return (
        <>
            <Header 
                countCartItems={cart_items.length}
                cartItems={cart_items}
            />
            <main>
                <div className='content'>
                    <div className='main'>
                        {
                        products_list.length === 0
                            ?
                        <BackgroundImage image={empty_products_list} />
                            :
                                loading && products_list.length !== 0 
                                ?
                                <> 
                                <CustomLoading /> 
                                    <InfinitScroll 
                                        dataLength={products_list.length}                              
                                    >                
                                        <ProductRow products={products_list}/>
                                    </InfinitScroll> 
                                    { window.scrollTo({top: 0, behavior: 'smooth'})}
                                </>
                            :
                                <InfinitScroll 
                                    dataLength={products_list.length}                            
                                >                
                                    <ProductRow products={products_list} 
                                        addToCart={(data) => addToCartHandler(data)} 
                                        countCartItems={cart_items.length}
                                    />
                                </InfinitScroll>
                    } 
                    <ReactPaginate
                        pageCount={pager_list.total_pages}
                        previousClassName={'previous'}
                        nextClassName={'next'}
                        previousLinkClassName={'previous-a'}
                        nextLinkClassName={'next-a'}
                        breakClassName={'breack-li'}
                        breakLinkClassName={'breack-a'}
                        containerClassName={'pagination'}
                        pageClassName={'pagination-li'}
                        pageLinkClassName={'pagination-a'}
                        activeLinkClassName={'pagination-a-active'}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={(data) => pageClickHandler(data)}                             
                    />
                    </div>
                    <div className='sidebar'>
                        <div className='range-container'>
                            <div className='range-box'>
                                <InputRange
                                    minValue={0}
                                    maxValue={10000000}
                                    value={values}
                                    onChange={value => set_values(value)} 
                                />
                            </div>
                            <div className='range-button'>
                                <button className='button-primary'
                                    onClick={() => filterProductsHandler()}
                                >
                                    {language.tokens['APPLY_PRICE_RANGE']}
                                </button> 
                            </div>
                        </div> 
                         <div className='switch-container'>
                            <Switch 
                                onChange={(e) => changeswitchhandler(e)} 
                                checked={checked_status} 
                            />
                            <p>
                                {language.tokens['ONLY_AVAILABLE_GOODS']}
                            </p>
                         </div>   
                        <Cart cartItems={cart_items} 
                            removeFromCartHandler={(item) => removeFromCartHandler(item)}
                        />
                    </div> 
                </div>              
            </main>
        </>
    )
}

export default ProductsList