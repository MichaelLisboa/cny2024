import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import Image from '../components/Image';
import { pathsList } from '../data';
import { OrnateButton } from '../components/Button';
import path from "../images/tokens/path.png";

const PathItemContainer = styled(motion.div)`
    position: relative;
    display: flex;
    flex: 0.75;
    flex-direction: column;
    justify-content: space-around; // Add this line
    width: 90%;
    gap: 16px;

    @media (min-width: 768px) { /* Adjust breakpoint as needed */
    flex-direction: row;
    }
`;

const PathItem = styled(motion.div)`
  flex: 1;
  background-size: cover;
  background-position: center;
  position: relative;
  background-image: url(${props => props.bgImage});
  width: 100%;
  background-repeat: no-repeat;
  overflow: visible;
`;

const PathItemContent = styled.div`
  top: 0;
  left: 0;
  padding: 48px 24px;
`;

const PathItemTitle = styled.h3`
  margin: 0;
`;

const DescriptionText = styled.p`
    display: block;
    font-size: 0.75rem;
    font-family: Lato, sans-serif;
    font-weight: 400;
    font-style: italic;
    color: #322F20;
    text-align: center;
    margin: 0;
    padding: 0;
`;

const PathTokenImage = styled.div`
    width: auto;
    padding: 32px;

    img {
        height: 100%;
        max-height: 25vh;
        object-fit: contain;
    }
`;

const HeaderSection = styled(motion.div)`
  // Add your header-section styles here.
`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
`;

const FooterSection = styled(motion.div)`
  // Add your footer-section styles here.
`;

const ChooseYourPath = () => {
    const { updateUserSelection, getUserInfo } = useContext(AppContext);
    const replaceElementNoun = useDynamicTextReplacer();
    const [content, setContent] = useState('initial');
    const [selectedCard, setSelectedCard] = useState(null);

    const location = useLocation();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const nextPage = useMemo(() => pages.find(page => page.url === currentPage.nextPage), [currentPage]);
    const previousPage = useMemo(() => pages.find(page => page.url === currentPage.previousPage), [currentPage]);
    const headerControls = useAnimation();
    const bodyControls = useAnimation();
    const footerControls = useAnimation();

    // Function to get random index
    const getRandomIndex = (length) => Math.floor(Math.random() * length);

    // Function to get unique random indices
    const getRandomIndices = (length, count) => {
        const indices = new Set();
        while (indices.size < count) {
            indices.add(getRandomIndex(length));
        }
        return [...indices];
    }

    // Get 5 random items from pathsList
    const randomItems = useMemo(() => {
        // Get 5 unique random indices
        const randomIndices = getRandomIndices(pathsList.length, 2);

        // Get 5 random items from pathsList
        return randomIndices.map(index => pathsList[index]);
    }, [pathsList]);

    const animateExit = async () => {
        await footerControls.start({ y: 100, opacity: 0 });
        await bodyControls.start({ y: 100, opacity: 0 });
        await headerControls.start({ y: 100, opacity: 0 });
    };

    const animateEnter = async () => {
        await bodyControls.start({ y: 0, opacity: 1, transition: { delay: 0.025 } });
        await footerControls.start({ y: 0, opacity: 1, transition: { delay: 0.05 } });
    };

    const handleButtonClick = async (item) => {
        const chosenPath = item.title;
        setSelectedCard(item);

        updateUserSelection('chosenPath', item.title);

        if (chosenPath) {
            await animateExit();
            setContent(true);
            setTimeout(() => {
                animateEnter();
            }, 500);
        }
    };

    const controls = useAnimation();

    useEffect(() => {
        controls.start(i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.5 + i * 0.3,
                duration: 0.5,
                ease: 'easeOut',
            },
        }));
    }, [controls]);

    return (
        <Layout>
            <HeaderSection
                animate={headerControls}
                className="header-section"
            >
                {content === 'initial' ? (
                    <div className="mal-margin-bottom-large mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-top">
                            {replaceElementNoun(`You approach a crossroads with the *alliance_noun*, two paths lay ahead.`)}
                        </h3>
                        <p className="mal-text-medium mal-margin-small-top">Which paths do you choose to traverse?</p>
                    </div>
                ) : ``}
            </HeaderSection>
            <BodySection
                animate={bodyControls}
                className="body-section">
                {content === 'initial' ? (
                    <PathItemContainer initial="hidden" animate="show">
                        {randomItems && randomItems.map((item, index) => (
                            <PathItem
                                key={index}
                                variants={item}
                                bgImage={item.image}
                                onClick={() => handleButtonClick(item)}
                                custom={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={controls}
                            >
                                <PathItemContent>
                                    <PathItemTitle>{replaceElementNoun(item.title)}</PathItemTitle>
                                </PathItemContent>
                            </PathItem>
                        ))}
                    </PathItemContainer>
                ) : (
                    <div className="mal-padding-small mal-text-center">
                        <PathTokenImage className="mal-padding">
                            <Image
                                src={path}
                                alt={`The Path of ${selectedCard}`} />
                        </PathTokenImage>
                        <h2 className="mal-margin-remove">{replaceElementNoun(selectedCard.title)}</h2>
                        <p>{replaceElementNoun(selectedCard.description)}</p>
                    </div>
                )}
            </BodySection>

            <FooterSection
                animate={footerControls}
                className="footer-section"
            >
                {content === 'initial' ? null : (
                    <OrnateButton url={nextPage.url}>
                        "What is this?"
                    </OrnateButton>
                )}
            </FooterSection>
        </Layout >
    );
};

export default ChooseYourPath;
