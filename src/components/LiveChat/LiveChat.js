import React, { useState } from "react";
import classes from "./LiveChat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faMessage,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane, faPaperclip } from "@fortawesome/free-solid-svg-icons";
const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={classes.live_chat}>
      <FontAwesomeIcon
        icon={faMessage}
        className={classes.iconMessage}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className={classes.form_chatlive}>
          <div className={classes.header}>
            <span>Customer Support</span>
            <span>Let's Chat App</span>
          </div>
          <div className={classes.chat_box}>
            <div className={`${classes["chat"]} ${classes["outgoing"]}`}>
              <div className={classes.details}>
                <p>Xin chào</p>
              </div>
            </div>
            <div className={`${classes["chat"]} ${classes["outgoing"]}`}>
              <div className={classes.details}>
                <p>Làm thế nào để xem các sản phẩm</p>
              </div>
            </div>
            <div className={`${classes["chat"]} ${classes["incoming"]}`}>
              <div className={classes.details}>
                <p>
                  <FontAwesomeIcon icon={faUser} className={classes.iconUser} />
                  ADMIN: Chào bạn
                </p>
              </div>
            </div>
            <div className={`${classes["chat"]} ${classes["incoming"]}`}>
              <div className={classes.details}>
                <p>
                  <FontAwesomeIcon icon={faUser} className={classes.iconUser} />
                  ADMIN: Bạn có thể vào mục shop để xem các sản phẩm
                </p>
              </div>
            </div>
          </div>
          <div className={classes.footer_chat}>
            <FontAwesomeIcon icon={faUser} className={classes.iconUser} />
            <input placeholder="Enter Message!" type="text" />
            <FontAwesomeIcon
              icon={faPaperclip}
              className={classes.icon_paper}
            />
            <FontAwesomeIcon
              icon={faFaceSmile}
              className={classes.icon_smile}
            />
            <FontAwesomeIcon
              icon={faPaperPlane}
              className={classes.icon_send}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
