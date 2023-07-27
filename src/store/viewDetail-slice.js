const { createSlice } = require("@reduxjs/toolkit");

// 2 actions cần ẩn và hiện đi kèm với payload là sản phẩm được chọn
const initialShowHideDetail = { showHide: false, viewDetail: "" };

const showHideSlice = createSlice({
  name: "showHideDetail",
  initialState: initialShowHideDetail,
  reducers: {
    showDetail(state, action) {
      state.showHide = true;
      state.viewDetail = action.payload;
    },
    hideDetail(state) {
      state.showHide = false;
    },
  },
});

export const ShowHideDetailActions = showHideSlice.actions;

export default showHideSlice.reducer;
