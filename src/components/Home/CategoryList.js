import React, { Fragment, useEffect, useState } from "react";
import classes from "./CategoryList.module.css";
import { imgCategory1, imgCategory2 } from "../FakeData/imgCategoryList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShowHideDetailActions } from "../../store/viewDetail-slice";
import Popup from "./Popup";
const CategoryList = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [dataTopTrending, setDataTopTrending] = useState([]);
  const [information, setInformation] = useState();

  const showHideDetail = useSelector((state) => state.showHideDetail.showHide);

  const handlerProduct = () => {
    navigation("/shop");
  };

  useEffect(() => {
    const fetchApiProduct = async () => {
      const response = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
      );
      //Lấy ra dữ liệu từ API
      let data = await response.json(response);
      setDataTopTrending(data);
    };
    fetchApiProduct();
  }, []);

  return (
    <Fragment>
      {/* Danh sách các danh mục */}
      <section>
        <div className={classes.title}>
          <p>carefully created collections</p>
          <p>browse our categories</p>
        </div>
        <div className={classes.categoryList1}>
          {imgCategory1.map((imgSrc, index) => (
            <ul key={index}>
              <li>
                <img src={imgSrc} alt="img" onClick={handlerProduct} />
              </li>
            </ul>
          ))}
        </div>

        <div className={classes.categoryList2}>
          {imgCategory2.map((imgSrc, index) => (
            <ul key={index}>
              <li>
                <img src={imgSrc} alt="img" onClick={handlerProduct} />
              </li>
            </ul>
          ))}
        </div>
      </section>

      {/* Danh sách các sản phẩm */}
      <section>
        <div className={classes.titleTrending}>
          <p>made the hard way</p>
          <p>top trending products</p>
        </div>
        <div className={classes.listTopTrending}>
          {dataTopTrending.map((item, index) => (
            <ul key={index}>
              <li>
                <img
                  className={classes.imgTopTrending}
                  src={item.img1}
                  alt="img_product"
                  onClick={() => {
                    setInformation(item);
                    dispatch(ShowHideDetailActions.showDetail(item));
                  }}
                />
                <div className={classes.information}>
                  <p>{item.name}</p>
                  <p>{parseInt(item.price).toLocaleString()} VNĐ</p>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </section>

      {/* other information */}
      <section>
        <div className={classes.row1}>
          <div className="container text-center">
            <div className="row">
              <div className="col">
                <div className={classes.nameRow1}>
                  <p>free shipping</p>
                  <p>free shipping worlwide</p>
                </div>
              </div>
              <div className="col">
                <div className={classes.nameRow1}>
                  <p>24 X 7 service</p>
                  <p>free shipping worlwide</p>
                </div>
              </div>
              <div className="col">
                <div className={classes.nameRow1}>
                  <p>festival offer</p>
                  <p>free shipping worlwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.row2}>
          <div className="row">
            <div className="col">
              <div className={classes.nameRow2Left}>
                <p>let's be friends!</p>
                <p>Nisi nisi tempor consequat laboris nisi.</p>
              </div>
            </div>
            <div className="col">
              <div className={classes.nameRow2Right}>
                <input placeholder="Enter your email address" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showHideDetail && <Popup information={information} />}
    </Fragment>
  );
};

export default CategoryList;
