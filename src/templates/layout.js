import React, { useEffect, useState, useMemo, useContext, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import pages from '../utils/pages';
import styled from 'styled-components';
import defaultBackgroundImage from '../images/background/0-cover.jpg';
import { AppContext } from '../contexts/AppContext';

const BackgroundImage = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: ${({ height }) => height < 630 ? 'auto' : 'hidden'};
  overflow-x: hidden;
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


function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { getBrowserSize } = useContext(AppContext);
  const browserSize = getBrowserSize();

  const refreshPage = () => {
    // Method to refresh the current page
    navigate(0); // This will refresh the page in React Router v6
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
    <>
      <BackgroundImage
        height={browserSize.height}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(event, info) => {
          // Calculate the distance dragged in both x and y directions
          const distanceX = Math.abs(info.offset.x);
          const distanceY = Math.abs(info.offset.y);
        
          // Set a threshold for what you consider a "significant" vertical drag
          const verticalThreshold = 50; // Adjust based on desired sensitivity
          
          // Optionally, set a threshold for horizontal movement to filter out diagonal drags
          const horizontalThreshold = 30; // This helps to ignore purely horizontal swipes or minor horizontal movements
        
          // Check if the vertical drag is significant and the horizontal drag is within an acceptable range
          if (distanceY > verticalThreshold && distanceX < horizontalThreshold) {
            refreshPage(); // Call the refresh logic only if the drag meets these conditions
          }
        }}
        style={{ overflow: 'hidden' }} // Prevent scrolling during drag
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
    </>
  );
}

export default Layout;
