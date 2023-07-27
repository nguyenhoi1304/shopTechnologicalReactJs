import React from "react";
import { useSelector } from "react-redux";
import classes from "./YourOrder.module.css";

const YourOrder = () => {
  const itemsFromCart = useSelector((state) => state.cart.listCart);
  const resultTotalPrice = itemsFromCart.reduce((cur, prev) => {
    return cur + prev.totalPrice;
  }, 0);
  return (
    <div className={classes.yourOder}>
      <h4>your order</h4>
      {itemsFromCart.map((item) => (
        <section key={item.id}>
          <p>
            <span>{item.name}</span>
            <span> {parseInt(item.totalPrice).toLocaleString()}/VNĐ</span>X
            {item.quantity}
          </p>
        </section>
      ))}
      <div className={classes.total}>
        <strong>TOTAL :</strong>
        <span>{parseInt(resultTotalPrice).toLocaleString()}/VNĐ</span>
      </div>
    </div>
  );
};

export default YourOrder;
