import { useState } from "react";

const useInput = (validataValue) => {
  const [enTeredValue, setEnteredValue] = useState(""); // lấy dữ liệu nhập vào từ người dùng
  const [isTouched, setIsTouched] = useState(false); // xác định người dùng chạm vào input

  const valueIsValid = validataValue(enTeredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enTeredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
