import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, useAnimation } from 'framer-motion';
import usePortal from "../../hooks/usePortal";
import style from  "./Notification.module.css";

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
        <motion.div
          id="notificationRoot"
          tabIndex={-1} role="dialog"
          animate={controls}
          className={`${style.notificationRoot}`}
        >
          {children}
        </motion.div>,
        target
      )
    :
    null
  )
}

export default Notification;