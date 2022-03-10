import types from "../types";

const initialState = {
    loading: true,
    data: null,
    error: null
}
const cryptoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.GET_CRYPTO:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};

export default cryptoReducer