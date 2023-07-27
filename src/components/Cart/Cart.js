import React, { useEffect } from "react";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGift,
  faLeftLong,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { getFromStorage } from "../storage";

const Cart = () => {
  const dispatch = useDispatch();
  const getDataFromStorage = getFromStorage("PRODUCT_ARRAY") ?? [];

  const cartItems = useSelector((state) => state.cart.listCart);
  // // tính tổng tiền từ giỏ hàng hiện có
  const resultTotalPrice = cartItems.reduce((cur, prev) => {
    return cur + prev.totalPrice;
  }, 0);

  //Khi mà người dùng reload trang thì lấy dữ liệu từ LocalStorage add vào trong State để hiển thị lại dữ liệu
  useEffect(() => {
    getDataFromStorage.map((item) => dispatch(cartActions.ADD_CART(item)));
  }, []);

  return (
    <>
      <div className={classes.cart}>
        <div>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                img: item.img,
                name: item.name,
                totalPrice: item.totalPrice,
                price: item.price,
                quantity: item.quantity,
              }}
            />
          ))}
        </div>
        <div className={classes.cartTotal}>
          <p>cart total</p>
          <div className={classes.subtotal}>
            <span>subtotal</span>
            <span>{parseInt(resultTotalPrice).toLocaleString()}/VND</span>
          </div>
          <div className={classes.total}>
            <span>total</span>
            <span>{parseInt(resultTotalPrice).toLocaleString()}/VND</span>
          </div>
          <input placeholder="Enter your coupon" />
          <button>
            <FontAwesomeIcon icon={faGift} />
            <span>Apply coupon</span>
          </button>
        </div>
      </div>
      <div className={classes.movepage}>
        <p>
          <Link to="/shop">
            <FontAwesomeIcon icon={faLeftLong} />
            <span style={{ marginLeft: "7px" }}>Continue shopping</span>
          </Link>
        </p>
        <p>
          <Link to="/checkout">
            <span style={{ marginRight: "8px" }}>Proceed to checkout</span>
            <FontAwesomeIcon icon={faRightLong} />
          </Link>
        </p>
      </div>
    </>
  );
};

export default Cart;
