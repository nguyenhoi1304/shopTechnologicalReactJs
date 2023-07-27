import { Product } from "../models/Product";
import { User } from "../models/User";

const users = getFromStorage("USER_ARRAY") ?? [];
const products = getFromStorage("PRODUCT_ARRAY") ?? [];

export const userArr = users.map((user) => parseUser(user));
export const productsArr = products.map((product) => parseProduct(product));

//Hàm lấy dữ liệu
export function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Hàm lưu dữ liệu
export function saveToStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

//Hàm chuyển từ Js Object sang Class Instance của User class
function parseUser(userData) {
  const user = new User(
    userData.fullName,
    userData.email,
    userData.passWord,
    userData.phone
  );
  return user;
}

//Hàm chuyển từ Js Object sang Class Instance của User class
function parseProduct(productData) {
  const product = new Product(
    productData.id,
    productData.img,
    productData.name,
    productData.quantity,
    productData.price,
    productData.totalPrice
  );
  return product;
}
