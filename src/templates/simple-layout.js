import React, { useEffect, useState, useMemo, useContext, useRef, forwardRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import pages from '../utils/pages';
import styled from 'styled-components';
import defaultBackgroundImage from '../images/background/0-cover.jpg';
import { AppContext } from '../contexts/AppContext';

const BackgroundImage = styled(motion.div)`
  position: relative;
  width: auto;
  height: 100%;
  overflow-x: hidden;
`;

const BackgroundImg = styled(motion.img)`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 140%;
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
      controls.start({ x: '50%', y: '0', transition: { duration: 30, ease: 'easeOut' } });
      break;
    // Add more cases for different animations
    default:
      // Default animation or no animation
      controls.start({ scale: 2 });  // Add a default animation
      break;
  }
};

const SimpleLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getBrowserSize } = useContext(AppContext);
  const browserSize = getBrowserSize();
  const controls = useAnimation();

  const currentPage = useMemo(() =>
    pages.find(page => page.url === location.pathname),
    [location.pathname]
  );

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
};

export default SimpleLayout;
