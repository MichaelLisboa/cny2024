import React, { useEffect, useState, useMemo, useContext, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import pages from '../utils/pages';
import styled from 'styled-components';
import defaultBackgroundImage from '../images/background/0-cover.jpg';
import { AppContext } from '../contexts/AppContext';
import RefreshContext from '../contexts/RefreshContext';

const BackgroundImage = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: ${({ height }) => height < 630 ? 'auto' : 'hidden'};
  overflow-x: hidden;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.15);
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
    // Add more cases for different animations
    default:
      // Default animation or no animation
      controls.start({ scale: 2 });  // Add a default animation
      break;
  }
};

const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

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

  return (
    <BackgroundImage
      height={browserSize.height}
      drag={refreshEnabled && enableDragRefresh ? "y" : undefined}
      dragConstraints={enableDragRefresh ? { top: 0, bottom: 0 } : undefined}
      dragElastic={enableDragRefresh ? 0.2 : 0}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrag={onDrag}
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
  );
}

export default Layout;
