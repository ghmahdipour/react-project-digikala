const initialState = {
	loading: false,
    data:[]
};
export default function product_details(state = initialState, action) {
    if (action.type === "PRODUCT_DETAILS_REQUEST") {
		return { ...state, 'loading': true}
	} else if (action.type === "PRODUCT_DETAILS_SUCCESS") {
		return { ...state, 'loading': false, data: action.payload }
	} else {
        return state
    }  
}