import axios from 'axios'

export const getfilterProduct = (config) => {
    return dispatch => {
        let params = config.params 
        params.checkedStatus = params.checkedStatus ? 1 : null   

        dispatch({ type : 'FILTER_PRODUCT_REQUEST'})

        let sort = `sort=${params.sortOrder}`
        let url = `https://www.digikala.com/front-end/search/?price[min]=${params.value.min}&price[max]=${params.value.max}&page=${params.page}&rows=${params.results}&${sort}`
        if(params.checkedStatus){
            url = `${url}&has_selling_stock=${params.checkedStatus}&${sort}`
        }          

        let axiosConfig = {
            headers: {
                'token': 'mpfKW9ghVTCSuBZ7qTkSmEyvL38ShZxv'
            }
        }
        
    axios
        .get(
            url, axiosConfig  
         )
        .then(res => {
            dispatch({ type : 'FILTER_PRODUCTS_SUCCESS' , payload: { 'data' : res.data.data.products , 'pager': res.data.data.pager}})
        })
        .catch(err => {
            console.log(err)
        }); 
    }
}

export const getProductList = (config) => {
    return dispatch => {
        
        let params = config.params
       
        dispatch({ type : 'PRODUCTS_LIST_REQUEST'})
        let url = `https://www.digikala.com/front-end/search/?page=${params.page}&rows=${params.results}&sort=${params.sortOrder}`

        let axiosConfig = {
            headers: {
                'token': 'mpfKW9ghVTCSuBZ7qTkSmEyvL38ShZxv'
            }
        }
        
    axios
        .get(
            url, axiosConfig  
         )
        .then(res => {
            dispatch({ type : 'PRODUCTS_LIST_SUCCESS' , payload: { 'data' : res.data.data.products , 'pager': res.data.data.pager}})
        })
        .catch(err => {
            console.log(err)
        }); 
    }
}