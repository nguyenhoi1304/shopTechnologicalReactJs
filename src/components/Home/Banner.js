import React, { Fragment } from "react";
import banner from "../../imgs/banner1.jpg";
import classes from "./Banner.module.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigation = useNavigate();
  const handlerCollection = () => {
    navigation("/shop");
  };
  return (
    <Fragment>
      <div className={classes.banner}>
        <img src={banner} alt="Banner-img" className={classes.banner__img} />
        <div className={classes.content}>
          <p>NEW INSPIRATION 2020 </p>
          <p>20% OFF ON NEW SEASON</p>
          <button onClick={handlerCollection}>Browse collections</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Banner;
