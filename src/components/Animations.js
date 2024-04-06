export const animations = {
    fadeIn: { 
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5 } },
      exit: { opacity: 0, transition: { duration: 0.5 } }
    },
    fadeOut: { 
      hidden: { opacity: 1 },
      visible: { opacity: 0, transition: { duration: 0.5 } }
    },
    slideUpFadeIn: { 
      hidden: { y: "100%", opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.25 } },
      exit: { y: "50%", opacity: 0, transition: { duration: 0.25 } }
    },
    slideDownFadeOut: { 
      hidden: { y: 0, opacity: 1 },
      visible: { y: 20, opacity: 0, transition: { duration: 0.25 } }
    },
    slideLeftFadeIn: { 
      hidden: { x: -100, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
      exit: { x: -100, opacity: 0, transition: { duration: 0.5 } }
    },
    slideRightFadeIn: { 
      hidden: { x: 100, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
      exit: { x: 100, opacity: 0, transition: { duration: 0.5 } }
    },
    slideLeftFadeOut: { 
      hidden: { x: 0, opacity: 1 },
      visible: { x: -100, opacity: 0, transition: { duration: 0.5 } }
    },
    slideRightFadeOut: { 
      hidden: { x: 0, opacity: 1 },
      visible: { x: 100, opacity: 0, transition: { duration: 0.5 } }
    },
    scaleUpFadeIn: { 
      hidden: { scale: 0.8, opacity: 0 },
      visible: { scale: 1, opacity: 1, zIndex: 1, transition: { duration: 0.5 } },
      exit: { scale: 0.8, opacity: 0, zIndex: 1, transition: { duration: 0.5 } }
    },
    scaleDownFadeIn: { 
      hidden: { scale: 1.2, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
      exit: { scale: 1.2, opacity: 0, transition: { duration: 0.5 } }
    },
    scaleUpFadeOut: { 
      hidden: { scale: 1, opacity: 1 },
      visible: { scale: 1.2, opacity: 0, zIndex: 1, transition: { duration: 0.5 } }
    },
    scaleDownFadeOut: { 
      hidden: { scale: 1, opacity: 1 },
      visible: { scale: 0.8, opacity: 0, transition: { duration: 0.5 } }
    },
    textFadeIn: { 
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
      exit: { opacity: 0, y: 10, transition: { duration: 0.5 } }
    },
    divFadeIn: { 
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5 } },
      exit: { opacity: 0, transition: { duration: 0.5 } }
    },
  };