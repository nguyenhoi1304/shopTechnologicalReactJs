import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./cartButton.module.css";
import { useSelector } from "react-redux";

const CartButton = () => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <>
      <FontAwesomeIcon icon={faCartShopping} className={classes.icon} />
      <span>Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </>
  );
};

export default CartButton;
