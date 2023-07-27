import { useEffect, useState } from "react";

export const ApiProduct = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApiProduct = async () => {
      const response = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
      );
      //Lấy ra dữ liệu từ API
      let data = await response.json(response);
      setData(data);
    };
    fetchApiProduct();
  }, []);
  return {
    data,
  };
};
