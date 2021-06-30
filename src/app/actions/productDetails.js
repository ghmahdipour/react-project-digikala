import axios from 'axios'

export const getProductDetails = (id) => {
    return dispatch => {
        dispatch({ type : 'PRODUCT_DETAILS_REQUEST'})

        let url = `https://www.digikala.com/front-end/product/${id}/`

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
                dispatch({ type : 'PRODUCT_DETAILS_SUCCESS' , 'payload': res.data.data.product})
            })
            .catch(err => {
                console.log(err)
            }); 
    }
}