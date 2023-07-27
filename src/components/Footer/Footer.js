import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div>
        <h3>CUSTOMER SERVICES</h3>
        <ul>
          <li>Help & Contacts Us</li>
          <li>Returns & Refunds</li>
          <li>Online Stores</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
      <div>
        <h3>COMPANY</h3>
        <ul>
          <li>What We Do</li>
          <li>Available Services</li>
          <li>Latest Posts</li>
          <li>FAQs</li>
        </ul>
      </div>
      <div>
        <h3>SOCIAL MEDIA</h3>
        <ul>
          <li>Twitter</li>
          <li>Instagram</li>
          <li>Facebook</li>
          <li>Pinterest</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
