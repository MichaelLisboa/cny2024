import React, { useEffect, useState, useMemo, useContext, useRef } from 'react';
import { motion, useAnimation, useCycle } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import pages from '../utils/pages';
import styled, { keyframes } from 'styled-components';
import defaultBackgroundImage from '../images/background/0-cover.jpg';
import { AppContext } from '../contexts/AppContext';

const BackgroundImage = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  // overflow-y: ${({ height }) => height < 630 ? 'auto' : 'hidden'};
  overflow-x: hidden !important;
`;

const BackgroundImg = styled(motion.img)`
  position: absolute;
  z-index: -1;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
`;

const MalContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Header = styled.div`
  .icon-title {
    text-align: center;
    transition: opacity 2s ease-in-out forwards;
    transition-delay: 0.5s;
  }
  h4 { color: #337C76; }
  img { height: 24px; }
`;

// Animation utility function
const startAnimation = (controls, animationConfig) => {
  switch (animationConfig.animationName) {
    case 'scaleDownAnimation':
      controls.start({ scale: 1.2, transition: { duration: 20, ease: 'easeInOut' } });
      break;
    case 'slideScaleAnimation':
      controls.start({ x: '-10%', scale: 1.2, transition: { duration: 30, ease: 'easeInOut' } });
      break;
    case 'slideAnimation':
      controls.start({
        x: ['0%', '50%', '0%'], // Start at 0%, move to 50%, and back to 0%
        transition: {
          duration: 30,
          ease: 'easeOut',
          repeat: Infinity, // Repeat the animation infinitely
          repeatType: 'reverse', // Move back and forth
        }
      });

      break;
    // Add more cases for different animations
    default:
      // Default animation or no animation
      controls.start({ scale: 2 });  // Add a default animation
      break;
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: {
    opacity: 0,
    transition: { ease: 'easeInOut', duration: 0.5 }
  }
};

const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

const refreshVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const RefreshIndicator = styled(motion.div)`
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  z-index: 1000;
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;

const StyledSvg = styled(motion.svg)`
  width: 24px;
  height: 24px;
  fill: none;
  stroke: #231F20;
  stroke-linecap: round;
`;

const RefreshIconAnimation = () => {
  return (
    <StyledSvg xmlns="http://www.w3.org/2000/svg" fill="none" height="24" width="24" viewBox="0 0 48 48">
        <path stroke="#231F20" stroke-linecap="round" stroke-width="8" d="M41.2 33.3c-1.6 3-4 5.7-7 7.7a20 20 0 1 1 6.5-27" />
        <path fill="#231F20" d="m30.8 14 12.5 12.7 4.8-17.3L30.8 14Z" />
    </StyledSvg>
  );
}

const Layout = ({ children, refreshEnabled = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getBrowserSize } = useContext(AppContext);
  const browserSize = getBrowserSize();

  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState(null);
  // Add this state to manage whether the device is a touch device
  const [enableDragRefresh, setEnableDragRefresh] = useState(isTouchDevice());

  useEffect(() => {
    const html = document.documentElement;
    let timeoutId; // Declare timeoutId at the top of the useEffect to ensure it's accessible throughout

    if (isDragging) {
      // Apply the class to change the background color
      html.classList.add('html-drag-refresh');
    } else {
      // Use setTimeout to delay the removal of the class
      timeoutId = setTimeout(() => {
        html.classList.remove('html-drag-refresh');
      }, 500);
    }

    // Cleanup function to ensure we remove the class when the component unmounts
    // or if isDragging changes before the timeout completes
    return () => {
      if (timeoutId) clearTimeout(timeoutId); // Make sure to clear the timeout here as well
      html.classList.remove('html-drag-refresh');
    };
  }, [isDragging]);

  useEffect(() => {
    // Update the state based on actual device capability when component mounts or when window resizes
    const updateDeviceCapability = () => setEnableDragRefresh(isTouchDevice());
    window.addEventListener('resize', updateDeviceCapability);
    return () => window.removeEventListener('resize', updateDeviceCapability);
  }, []);

  const refreshPage = () => {
    navigate(0);
  };

  const onDrag = refreshEnabled && enableDragRefresh ? (event, info) => {
    const offsetY = info.offset.y;
    const offsetX = Math.abs(info.offset.x);
    if (offsetY > 0 && offsetY > offsetX) {
      setDragDirection('down');
    } else {
      setDragDirection(null);
    }
  } : undefined;

  const onDragStart = refreshEnabled && enableDragRefresh ? (event, info) => {
    setIsDragging(true);
    setDragDirection(null);
  } : undefined;

  const onDragEnd = refreshEnabled && enableDragRefresh ? (event, info) => {
    setIsDragging(false);
    if (dragDirection === 'down' && info.offset.y > 100) {
      refreshPage();
    }
    setDragDirection(null);
  } : undefined;

  const getOverflowStyle = () => {
    let overflow = browserSize.height < 668 ? 'auto' : 'hidden';
    if (isDragging && dragDirection === 'down') {
      overflow = 'hidden';
    }
    return overflow;
  };

  const currentPage = useMemo(() =>
    pages.find(page => page.url === location.pathname),
    [location.pathname]
  );

  const controls = useAnimation();
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef(new Image());

  useEffect(() => {
    if (!currentPage || imageRef.current.src === currentPage.bgImage) {
      return;
    }

    setLoaded(false);
    const img = imageRef.current;
    img.src = currentPage.bgImage;
    img.onload = () => {
      setLoaded(true);
      startAnimation(controls, currentPage.backgroundAnimation);
    };
    img.onerror = (e) => console.error('Failed to load image', e);
  }, [currentPage, controls]);

  const refreshIcon = RefreshIconAnimation();

  return (
    <>
      {isDragging && dragDirection === 'down' && (
        <RefreshIndicator
          initial="initial"
          animate="animate"
          variants={refreshVariants}
          exit="exit">
          {refreshIcon}
        </RefreshIndicator>
      )}
      <BackgroundImage
        height={browserSize.height}
        drag={refreshEnabled && enableDragRefresh ? "y" : undefined}
        dragConstraints={enableDragRefresh ? { top: 0, bottom: 0 } : undefined}
        dragElastic={enableDragRefresh ? 0.2 : 0}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDrag={onDrag}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        exit="exit"
        style={{
          overflow: getOverflowStyle(),
          overflowX: 'hidden'
        }}
      >
        <BackgroundImg
          ref={imageRef}
          src={currentPage?.bgImage || defaultBackgroundImage}
          animate={controls}
          initial={{ scale: 2 }}
        />
        <motion.section
          initial={{ y: browserSize.height }}
          animate={{ y: 0 }}
          exit={{ y: browserSize.height }}
          enter={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 20 }}
          style={{ height: browserSize.height }}
        >
          <MalContainer className="mal-container mal-container-small">
            <Header className="chapter-title">
              <h3>&nbsp;</h3>
              <div className="icon-title mal-flex mal-flex-middle">
                <img
                  className="mal-margin-small-right"
                  src={currentPage?.sectionIcon?.default}
                  alt={currentPage?.sectionTitle}
                />
                <h4 className="mal-margin-remove mal-padding-remove">{currentPage?.sectionTitle}</h4>
              </div>
            </Header>
            {children}
          </MalContainer>
        </motion.section>
      </BackgroundImage>
    </>
  );
}

export default Layout;

