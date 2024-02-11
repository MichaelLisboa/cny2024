import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, useAnimation } from 'framer-motion';
import styled from "styled-components";
import usePortal from "../../hooks/usePortal";
import style from  "./Notification.module.css";

const NotificationPanel = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 100%;
  min-height: 64px;
  background-color: rgba(19,19,19,1);
  border-radius: 16px 16px 0 0;
  color: #fff;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding-top: 8px;

  p {
    margin: 0;
    padding: 0;
  }
`;

const Notification = ({isActive, children, ...props}) => {
  const target = usePortal("NotificationParent");
  const [isShowing, setIsShowing] = useState(false);
  const showingRef = useRef(false);
  const controls = useAnimation();

  useEffect(
    () => {
      let timer;
      if (isActive) {
        setIsShowing(true);
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.overflow = "hidden";
        controls.start({
          opacity: 1,
          bottom: -1,
          transition: { duration: 0.5 },
        });
      } else {
        timer = setTimeout(() => {
          setIsShowing(showingRef.current);
        }, 1000)
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.overflow = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
        controls.start({
          opacity: 0,
          bottom: -45,
          transition: { duration: 0.5 },
        });
      }
      return () => clearTimeout(timer);
    }, [isActive, controls]
  )

  return (
    isShowing ?
      ReactDOM.createPortal(
        <NotificationPanel
          id="notificationRoot"
          tabIndex={-1} role="dialog"
          animate={controls}
          className={`${style.notificationRoot}`}
        >
          {children}
        </NotificationPanel>,
        target
      )
    :
    null
  )
}

export default Notification;