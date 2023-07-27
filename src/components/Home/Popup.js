import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Modal from "../UI/Modal";
import classes from "./Popup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShowHideDetailActions } from "../../store/viewDetail-slice";

const Popup = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  //lấy dữ liệu thông tin sản phẩm từ store để hiển thị đúng viewDetail của sản phẩm đó
  const information = useSelector((state) => state.showHideDetail.viewDetail);

  // Vừa chuyển sang trang detail và phải ẩn đi component Popup
  const handlerMoveDetailPage = (id) => {
    dispatch(ShowHideDetailActions.hideDetail());
    navigation("/detail/" + id);
  };

  return (
    <div style={{ alignItems: "center" }}>
      <Modal>
        <form className={classes.form}>
          <img src={information.img1} alt="img" />
          <div className={classes.detail}>
            <button
              onClick={() => dispatch(ShowHideDetailActions.hideDetail())}
            >
              X
            </button>
            <p>{information.name}</p>
            <p>{parseInt(information.price).toLocaleString()} VNĐ</p>
            <p>{information.long_desc}</p>
            <button
              onClick={() => handlerMoveDetailPage(information._id.$oid)}
              className={classes.btn_viewdetail}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              <span>View Detail</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Popup;
