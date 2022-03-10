import types from "../types"

export const getCryptos = (payload: any) => (dispatch: any) => {
    dispatch({
        type: types.GET_CRYPTO,
        payload: payload
    })
}