import React, { useEffect, useState, useMemo, useContext } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import pages from '../utils/pages';
import styled, { keyframes } from 'styled-components';
import defaultBackgroundImage from '../images/background/0-cover.jpg';
import { AppContext } from '../contexts/AppContext'; // Import AppContext

const BackgroundImage = styled.section`
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    width: ${props => props.width};
    height: ${props => props.height};
    max-height: ${props => props.height};
    overflow: hidden;
    ${props => props.animation && `animation: ${props.animation};`}
    opacity: ${props => (props.loaded ? 1 : 0)};
    transition: opacity 0.5s ease-in-out;
`;

const MalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; // evenly space the content
    height: 100%; // take up the entire height of the screen
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.06;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 40px;
  
  .icon-title {
    text-align: center;
    opacity: 0;
    animation: ${fadeIn} 2s ease-in-out forwards;
    animation-delay: .5s;
  }
  h3 {
    color: #337C76;
  }
`;

function Layout({ children }) {
    const { getBrowserSize } = useContext(AppContext);

    const browserSize = getBrowserSize();

    const { height, width } = browserSize; // Access the browserSize from AppContext
    const location = useLocation();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const animationString = useMemo(() => {
        const { animationName = '', animationDuration = '', animationTimingFunction = '', animationIterationCount = '' } = currentPage?.backgroundAnimation || {};
        return `${animationName} ${animationDuration} ${animationTimingFunction} ${animationIterationCount}`;
    }, [currentPage]);

    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        const image = new Image();
        image.src = currentPage?.bgImage || defaultBackgroundImage;
        image.onload = () => {
            setLoaded(true);
        };
    }, [currentPage]);

    // console.log('Layout currentPage:', sectionIcon);

    return (
        <BackgroundImage
            image={currentPage?.bgImage || defaultBackgroundImage}
            animation={animationString}
            height={height}
            width={width}
            loaded={loaded}
            className="layout-background"
        >
            <style>{currentPage?.styles || ''}</style>
            <motion.section
                className="mal-width-1-1"
                initial={{ y: height }}
                animate={{ y: 0 }}
                exit={{ y: height }}
                transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                style={{ height }}>
                <MalContainer className="mal-container mal-container-small mal-height-1-1">
                    <Header>
                        <h3 className="mal-margin-remove-top mal-padding-remove-top">&nbsp;</h3>
                        <div className="icon-title mal-flex mal-flex-middle">
                            <img
                                className="mal-margin-small-right"
                                src={currentPage?.sectionIcon?.default}
                                alt={currentPage?.sectionTitle} />
                            <h3 className="mal-margin-remove mal-padding-remove">{currentPage?.sectionTitle}</h3>
                        </div>
                    </Header>
                    {children}
                </MalContainer>
            </motion.section>
        </BackgroundImage>
    );
}

export default Layout;
