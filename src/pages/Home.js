import React, { Fragment } from "react";
import Banner from "../components/Home/Banner";
import CategoryList from "../components/Home/CategoryList";

const HomePage = () => {
  return (
    <Fragment>
      <Banner />
      <CategoryList />
    </Fragment>
  );
};

export default HomePage;
