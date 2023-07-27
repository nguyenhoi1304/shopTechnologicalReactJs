import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiProduct } from "../ApiProduct";
import classes from "./DetailProduct.module.css";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { getFromStorage, saveToStorage } from "../storage";

const DetailProduct = () => {
  //Lấy all các sản phẩm từ api
  const { data } = ApiProduct();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const params = useParams();
  const [quantity, setQuantity] = useState(1);

  const idProduct = params.productId; //ID được trả về lấy từ params của sản phẩm khi được chọn

  //Lấy ra item được chọn hiển thị ra thông tin sản phẩm
  const detail = data.filter((item) => item._id.$oid === idProduct);

  //vì có 1 id với sản phẩm nên trả về 1 mảng chỉ có 1 phẩn tử, có thể lấy theo index là 0
  //lọc tìm sản phẩm tương tự theo danh mục
  const relatedProduct = data.filter(
    (item) => item.category === detail[0].category
  );

  const addItemHandler = (item) => {
    dispatch(
      cartActions.ADD_CART({
        id: item._id.$oid,
        name: item.name,
        price: parseInt(item.price),
        img1: item.img1,
        quantity: quantity,
      })
    );

    const products = getFromStorage("PRODUCT_ARRAY") ?? [];
    //lọc tìm xem id trong LocalStorage có trùng với name mà người dùng mới thêm vào không
    const idProduct = products.find(
      (productArray) => productArray.name === item.name
    );
    //nếu không có thì thêm vào Cart còn có rồi thì không thêm gì và chuyển sang trang shop để tiếp tục mua sắm
    if (!idProduct) {
      products.push({
        id: item._id.$oid,
        name: item.name,
        price: parseInt(item.price),
        img1: item.img1,
        quantity: quantity,
        totalPrice: quantity * item.price,
      });
      saveToStorage("PRODUCT_ARRAY", products);

      navigation("/shop");
    } else {
      navigation("/shop");
    }
  };

  const handlerAdd = () => {
    setQuantity(quantity + 1);
  };

  const handlerRemove = () => {
    setQuantity(quantity - 1);
    if (parseInt(quantity) === 1) {
      return setQuantity(1);
    }
  };

  return (
    <Fragment>
      {detail.map((item, id) => (
        <div className={classes.container} key={id}>
          <div className={classes.left_img}>
            <div className={classes.left_img_cover}>
              <img src={item.img1} alt="img1" />
              <img src={item.img2} alt="img2" />
              <img src={item.img3} alt="img3" />
              <img src={item.img4} alt="img4" />
            </div>
            <img src={item.img1} alt="img1" className={classes.img_main} />
          </div>

          <div className={classes.right}>
            <p>{item.name}</p>
            <p>{parseInt(item.price).toLocaleString()} VNĐ</p>
            <p>{item.short_desc}</p>
            <p>
              <strong>CATEGORY: </strong>
              {item.category}
            </p>
            <div className={classes.quantity}>
              <div
                style={{
                  display: "flex",
                  padding: "10px 40px",
                  border: "1px solid #ccc",
                  alignItems: "center",
                }}
              >
                <span>QUANTITY</span>
                <div className={classes.actions}>
                  <FontAwesomeIcon
                    icon={faCaretLeft}
                    className={classes.btn_add}
                    onClick={handlerRemove}
                  ></FontAwesomeIcon>
                  <span>{quantity}</span>
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className={classes.btn_remove}
                    onClick={handlerAdd}
                  ></FontAwesomeIcon>
                </div>
              </div>
              <button
                className={classes.btn_submit}
                onClick={() => addItemHandler(item)}
              >
                Add to cart
              </button>
            </div>
          </div>
          <div style={{ marginTop: "70px" }}>
            <span className={classes.text}>description</span>
            <p
              style={{
                margin: "30px 0",
                textTransform: "uppercase",
                fontSize: "1.5rem",
                fontWeight: "600",
              }}
            >
              product description
            </p>
            <p>{item.long_desc}</p>
          </div>
        </div>
      ))}

      <div className={classes.description}>
        {relatedProduct.map((item, id) => (
          <div className={classes.related} key={id}>
            <p className={classes.title}>related products</p>
            <img src={item.img1} alt="img" />
            <div className={classes.img_related}>
              <p>{item.name}</p>
              <p>{parseInt(item.price).toLocaleString()} VNĐ</p>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default DetailProduct;
