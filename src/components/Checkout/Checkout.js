import React from "react";
import classes from "./Checkout.module.css";
import YourOrder from "./YourOrder";
const Checkout = () => {
  return (
    <div>
      <section className={classes.banner}>
        <p>CHECK OUT</p>
        <p>
          HOME / CART / <span>CHECK OUT</span>
        </p>
      </section>
      <h4>billing details</h4>
      <div className={classes.container}>
        <section className={classes.information}>
          <section>
            <p>
              <label>full name:</label>
            </p>
            <input placeholder="Enter your Full Name Here" />
          </section>
          <section>
            <p>
              <label>email:</label>
            </p>
            <input placeholder="Enter your Email Here" />
          </section>
          <section>
            <p>
              <label>phone number:</label>
            </p>
            <input placeholder="Enter your Phone Number Here" />
          </section>
          <section>
            <p>
              <label>address:</label>
            </p>
            <input placeholder="Enter your Address Here" />
          </section>
          <button>Place order</button>
        </section>
        <YourOrder />
      </div>
    </div>
  );
};

export default Checkout;
