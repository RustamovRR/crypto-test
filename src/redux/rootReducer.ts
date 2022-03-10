import { combineReducers } from "redux"
import cryptoReducer from '../redux/crypto/reducer'

const rootReducer = combineReducers({
  crypto: cryptoReducer
})

export default rootReducer