import React, { useState } from "react";
import classes from "./ProductsList.module.css";
import { ApiProduct } from "../ApiProduct";
import {
  IphoneAndMac,
  Wireless,
  Other,
  All,
} from "../FakeData/CategoryProductsList";
import { useNavigate } from "react-router-dom";
const ProductsList = () => {
  //Lấy all các sản phẩm từ api
  const { data } = ApiProduct();
  //type category
  const [type, setType] = useState("all");
  //value người nhập tìm kiếm
  const [value, setValue] = useState("");
  //giá người dùng chọn
  const [priceFilter, setPriceFilter] = useState("");

  const navigation = useNavigate();

  const handlerCategory = (item) => {
    setType(item.label);

    // // reset lại value để hiển thị theo đúng chỉ mục không phải theo tìm kiếm khi click vào lại chỉ mục và giá cả chọn
    setValue("");
    setPriceFilter("");
  };

  const handleFilterProduct = (data) => {
    //lọc sản phẩm theo tìm kiếm của người dùng và mức chọn giá cả
    if (priceFilter !== "" && value !== "") {
      return data.filter(
        (item) =>
          parseInt(item.price) < parseInt(priceFilter) &&
          item.category.includes(value)
      );
    }

    if (value !== "") {
      // lọc sản phẩm theo tìm kiếm người dùng
      return data.filter((item) => item.category.includes(value));
    }

    // Lọc theo giá sản phẩm ở mức giá dưới của người dùng
    if (priceFilter !== "") {
      return data.filter(
        (item) => parseInt(item.price) < parseInt(priceFilter)
      );
    }

    if (type === "all") {
      return data;
    }
    // lọc danh sách sản phẩm tương ứng với danh mục
    return data.filter((item) => item.category === type);
  };

  const handlerMoveDetailPage = (id) => {
    navigation("/detail/" + id);
  };

  return (
    <div className={classes.layout}>
      {/* Banner */}
      <section className={classes.banner}>
        <p>SHOP</p>
        <p>SHOP</p>
      </section>

      {/* Container */}
      <div className="container">
        <div className="row">
          {/* danh mục */}
          <section className="col-3">
            <div className={classes.left}>
              <h2> categories</h2>
              <div>
                <p
                  style={{
                    backgroundColor: "#000",
                    color: "white",
                    padding: "10px 20px",
                  }}
                >
                  APPLE
                </p>
                {All.map((item, index) => (
                  <div className={classes.listTitle} key={index}>
                    <ul>
                      <li
                        style={
                          type === item.label
                            ? {
                                color: "#8224e3",
                              }
                            : {}
                        }
                        onClick={() => {
                          handlerCategory(item);
                        }}
                      >
                        {item.title}
                      </li>
                    </ul>
                  </div>
                ))}

                <p
                  style={{
                    padding: "10px 0 10px 20px",
                    fontWeight: "600",
                    backgroundColor: "#ccc",
                  }}
                >
                  IPHONE & MAC
                </p>
                {IphoneAndMac.map((item, index) => (
                  <ul key={index}>
                    <li
                      style={
                        type === item.label
                          ? {
                              color: "#8224e3",
                            }
                          : {}
                      }
                      onClick={() => handlerCategory(item)}
                    >
                      {item.title}{" "}
                    </li>
                  </ul>
                ))}
                <p
                  style={{
                    padding: "10px 0 10px 20px",
                    fontWeight: "600",
                    backgroundColor: "#ccc",
                  }}
                >
                  WIRELESS
                </p>
                {Wireless.map((item, index) => (
                  <ul key={index}>
                    <li
                      style={
                        type === item.label
                          ? {
                              color: "#8224e3",
                            }
                          : {}
                      }
                      onClick={() => handlerCategory(item)}
                    >
                      {item.title}
                    </li>
                  </ul>
                ))}

                <p
                  style={{
                    padding: "10px 0 10px 20px",
                    fontWeight: "600",
                    backgroundColor: "#ccc",
                  }}
                >
                  OTHER
                </p>
                {Other.map((item, index) => (
                  <ul key={index}>
                    <li
                      style={
                        type === item.label
                          ? {
                              color: "#8224e3",
                            }
                          : {}
                      }
                      onClick={() => handlerCategory(item)}
                    >
                      {item.title}
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </section>

          {/* listproducts */}
          <section className="col-9">
            {/* search và tìm lọc */}
            <div className={classes.search}>
              <input
                placeholder="Enter Search here..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div>
                <select
                  className="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  onChange={(e) => {
                    setPriceFilter(e.target.value);
                  }}
                >
                  <option value="999999999" selected>
                    Default sorting
                  </option>
                  <option value="1000000">Dưới 1,000,000</option>
                  <option value="5000000">Dưới 5,000,000</option>
                  <option value="8000000">Dưới 8,000,000</option>
                  <option value="15000000">Dưới 15,000,000</option>
                  <option value="20000000">Dưới 20,000,000</option>
                  <option value="100000000">Dưới 100,000,000</option>
                </select>
              </div>
            </div>

            {/* Hiển thị danh sách  sản phẩm tương ứng với danh mục */}
            <section className={classes.list}>
              {handleFilterProduct(data).map((item, index) => (
                <ul key={index}>
                  <li>
                    <img
                      className={classes.imgTopTrending}
                      src={item.img1}
                      alt="img_product"
                      onClick={() => handlerMoveDetailPage(item._id.$oid)}
                    />
                    <div className={classes.information}>
                      <p>{item.name}</p>
                      <p>{parseInt(item.price).toLocaleString()} VNĐ</p>
                    </div>
                  </li>
                </ul>
              ))}
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
