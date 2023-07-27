import { createSlice } from "@reduxjs/toolkit";

const cartSliceReducers = createSlice({
  name: "cart",
  initialState: {
    listCart: [], // chứa các sản phẩm được chọn
    totalQuantity: 0, // số lượng không giống nhau được đưa vào giỏ
    changed: false,
  },
  reducers: {
    // thêm sản phẩm  vào giỏ hàng
    ADD_CART(state, action) {
      const newItem = action.payload;
      //Kiểm tra xem hàng đã có sẵn trong giỏ chưa
      const existingItem = state.listCart.find(
        (item) => item.id === newItem.id
      );
      state.changed = true;

      //nếu chưa có thì thêm vào giỏ hàng và tăng số hiện ở cart lên 1 , còn có rồi thì sẽ tăng số lượng lên và cập nhật lại tổng tiền
      if (!existingItem) {
        state.listCart.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          img: newItem.img1,
          // số đếm của 1 sản phẩm
          quantity: newItem.quantity,
          //tổng tiền của 1 sản phẩm
          totalPrice: newItem.price * newItem.quantity,
        });
        state.totalQuantity++;
      } else {
        //cập nhật lại số lượng khi chọn tiếp tục 1 sản phẩm đã có ở giỏ hàng
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },

    //action Giảm số lượng sản phẩm
    DOWN_CART(state, action) {
      //lấy id sản phẩm mà người dùng chọn từ sản phẩm
      const id = action.payload;
      // tìm sản phẩm được chọn
      const existingItem = state.listCart.find((item) => item.id === id);
      state.changed = true;
      //Nếu số lượng hạ xuống còn 1 thì sẽ xóa khỏi giỏ hàng và trừ số lượng hiển thị ở trên giỏ hàng
      if (existingItem.quantity === 1) {
        state.listCart = state.listCart.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        // còn > hơn 1 sẽ giảm đi 1 sau mỗi lần trừ, và cập nhật lại tổng tiền của món đó
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },

    DELETE_CART(state, action) {
      //nhận id sản phẩm được chọn xóa
      const idItemRemove = action.payload;
      //Xóa đi sản phẩm đó và lưu lại vào listCart danh sách mới
      state.listCart = state.listCart.filter(
        (item) => item.id !== idItemRemove
      );
      // giảm đi số lượng hiển thị ở giỏ hàng
      state.totalQuantity--;
    },
  },
});

export const cartActions = cartSliceReducers.actions;
export default cartSliceReducers.reducer;
