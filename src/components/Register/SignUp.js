import React from "react";
import classes from "./SignUp.module.css";
import logoBanner from "../../imgs/banner1.jpg";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/use-input";
import { User } from "../../models/User";
import { saveToStorage, userArr } from "../storage";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isPassword = (value) => value.length > 8;

const SignUp = () => {
  const navigation = useNavigate();
  const {
    value: fullNameValue,
    isValid: fullNameIsValid,
    hasError: fullNameHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    reset: resetFullName,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passWordValue,
    isValid: passWordIsValid,
    hasError: passWordHasError,
    valueChangeHandler: passWordChangeHandler,
    inputBlurHandler: passWordBlurHandler,
    reset: resetpassWord,
  } = useInput(isPassword);

  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput(isNotEmpty);

  const submitHandler = (e) => {
    //Lấy ra Email hiện có của mảng chứa các tài khoản đăng nhập: để giúp kiểm tra xem đăng ký có trùng hay chưa
    const arrayEmail = userArr.map((item) => item.email);
    const dataRegister = new User(
      fullNameValue,
      emailValue,
      passWordValue,
      phoneValue
    );

    e.preventDefault();

    //Kiểm tra Email sẽ không được trùng với các tài khoản đã có.
    if (arrayEmail.includes(emailValue)) {
      alert("Email bạn đăng ký đã tồn tại!");
      formIsValid = false;
      return;
    }
    //Nếu form đăng ký hợp lệ thì thêm user đó vào mảng USER_ARRAY để quản lý
    if (formIsValid) {
      //thêm user vào mảng
      userArr.push(dataRegister);
      //Lưu dữ liệu xuống localStorage
      saveToStorage("USER_ARRAY", userArr);
      alert("Bạn đã đăng ký tài khoản thành công");
      navigation("/login");
    }

    if (!formIsValid) {
      alert("Bạn vui lòng điền đầy đủ thông tin!");
      return;
    }

    resetFullName();
    resetEmail();
    resetpassWord();
    resetPhone();
  };

  let formIsValid = false;
  if (fullNameIsValid && emailIsValid && passWordIsValid && phoneIsValid) {
    formIsValid = true;
  }

  const handlerSignUp = () => {
    navigation("/login");
  };

  return (
    <div className={classes.login_form} onSubmit={submitHandler}>
      <div className={classes.img_banner}>
        <img src={logoBanner} alt="banner" />
      </div>
      <form className={classes.form}>
        <p className={classes.title}>Sign Up</p>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Full Name"
            value={fullNameValue}
            onChange={fullNameChangeHandler}
            onBlur={fullNameBlurHandler}
          />
          {fullNameHasError && (
            <p className={classes.error_text}>Please enter a full name.</p>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && (
            <p className={classes.error_text}>Please enter @ a E-Mail.</p>
          )}
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Password"
            value={passWordValue}
            onChange={passWordChangeHandler}
            onBlur={passWordBlurHandler}
          />
          {passWordHasError && (
            <p className={classes.error_text}>
              Please enter a PassWord more than 8.
            </p>
          )}
        </div>

        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Phone"
            value={phoneValue}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
          />
          {phoneHasError && (
            <p className={classes.error_text}>Please enter a Phone.</p>
          )}
        </div>
        <button className={classes.btn_signUp} type="submit">
          SIGN UP
        </button>
        <div className={classes.footer_signUp}>
          <span onClick={handlerSignUp}>Login?</span>
          <span>Click</span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
