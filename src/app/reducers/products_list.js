const initialState = {
	loading: false,
    data: [],
	pager: {}
};
export default function products_list(state = initialState, action) {
    if (action.type === "PRODUCTS_LIST_REQUEST") {
		return { ...state, 'loading': true}
	}else if (action.type === "PRODUCTS_LIST_SUCCESS") {
		return { ...state, 'loading': false, data: action.payload.data, pager: action.payload.pager}
	}else if (action.type === "FILTER_PRODUCT_REQUEST") {
		return { ...state, 'loading': true }
	}else if (action.type === "FILTER_PRODUCTS_SUCCESS") {
		return { ...state, 'loading': false, data: action.payload.data, pager: action.payload.pager}
	}else {
        return state
    }  
}