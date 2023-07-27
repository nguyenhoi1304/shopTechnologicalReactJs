import React from "react";
import classes from "./Login.module.css";
import logoBanner from "../../imgs/banner1.jpg";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/use-input";
import { saveToStorage, userArr } from "../storage";

const isEmail = (value) => value.includes("@");
const isNotEmpty = (value) => value.trim() !== "";

const Login = () => {
  const navigation = useNavigate();
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    // reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passWordValue,
    isValid: passWordIsValid,
    hasError: passWordHasError,
    valueChangeHandler: passWordChangeHandler,
    inputBlurHandler: passWordBlurHandler,
    reset: resetpassWord,
  } = useInput(isNotEmpty);

  const submitHandler = (e) => {
    e.preventDefault();

    //Thông báo lỗi khi người dùng chưa nhập đã nhất submit
    if (!formIsValid) {
      alert("Bạn vui lòng điền đầy đủ thông tin!");
      return;
    }

    //Nếu đăng nhập  hợp lệ thì được lưu user đó vào  Storage và thông báo đăng nhập thành công , ngược lại không đúng sẽ thông báo thông tin đăng nhập không chính xác
    if (formIsValid) {
      //Tìm kiếm trong userArr thông tin user người dùng nhập vào có đúng hay không
      const user = userArr.find(
        (item) => item.email === emailValue && item.passWord === passWordValue
      );
      if (user) {
        // lưu thông tin user hiện tại đang đăng nhập lên trang
        saveToStorage("currentUser", user);
        //Chuyển hướng về trang chủ
        navigation("/");
        alert("Đăng nhập thành công");
      } else {
        alert("Thông tin đăng nhập không đúng, vui lòng kiểm tra lại !");
        //reset lại password để người dùng nhập sai có thể nhập lại
        resetpassWord();
      }
    }
  };

  let formIsValid = false;
  if (emailIsValid && passWordIsValid) {
    formIsValid = true;
  }

  const handlerSignUp = () => {
    navigation("/register");
  };
  return (
    <div className={classes.login_form}>
      <div className={classes.img_banner}>
        <img src={logoBanner} alt="banner" />
      </div>
      <form className={classes.form} onSubmit={submitHandler}>
        <p className={classes.title}>Sign In</p>
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
            <p className={classes.error_text}>Please enter @ a E-Mail .</p>
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
            <p className={classes.error_text}>wrong password</p>
          )}
        </div>
        <button type="submit" className={classes.btn_signIn}>
          SIGN IN
        </button>
        <div className={classes.footer_signIn}>
          <span onClick={handlerSignUp}>Create an account?</span>
          <span>Click</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
