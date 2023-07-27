import showHideSliceReducer from "./viewDetail-slice";
import cartSliceReducers from "./cart-slice";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    showHideDetail: showHideSliceReducer,
    cart: cartSliceReducers,
  },
});

export default store;
