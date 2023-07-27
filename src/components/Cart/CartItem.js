import React from "react";
import classes from "./CartItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const item = props.item;

  const removeItemHandler = (item) => {
    dispatch(cartActions.DOWN_CART(item.id));
  };

  const addItemHandler = (item) => {
    dispatch(
      cartActions.ADD_CART({
        id: item.id,
        name: item.name,
        price: item.price,
      })
    );
  };

  const deleteItemHandler = (item) => {
    //confirm xem người dùng có thực sự muốn xóa
    const text = "Bạn có chắc muốn xóa sản phẩm này?";
    if (window.confirm(text) === true) {
      dispatch(cartActions.DELETE_CART(item.id));
    } else {
      return;
    }
  };

  return (
    <>
      <div className={classes.cart_left}>
        <div>
          <p>image</p>
          <img src={item.img} alt="img" style={{ width: "100%" }} />
        </div>
        <div>
          <p>product</p>
          {item.name}
        </div>
        <div>
          <p>price</p>
          {parseInt(item.price).toLocaleString()}/VNĐ
        </div>
        <div className={classes.actions}>
          <p>quantity</p>
          <FontAwesomeIcon
            icon={faCaretLeft}
            className={classes.btn_remove}
            onClick={() => removeItemHandler(item)}
          ></FontAwesomeIcon>
          <span style={{ margin: "0 3px" }}>{item.quantity}</span>
          <FontAwesomeIcon
            icon={faCaretRight}
            className={classes.btn_add}
            onClick={() => addItemHandler(item)}
          ></FontAwesomeIcon>
        </div>
        <div>
          <p>total</p>
          {parseInt(item.totalPrice).toLocaleString()}/VNĐ
        </div>
        <div>
          <p>remove</p>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => deleteItemHandler(item)}
            className={classes.icon_remove}
          />
        </div>
      </div>
    </>
  );
};

export default CartItem;
