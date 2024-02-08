import React, { useContext, useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import Image from '../components/Image';
import MalCarousel from '../components/MalCarousel';
import { OrnateButton, OptionButton } from '../components/Button';
import { wishesData } from '../data';
import wishesSplash from "../images/wishes/wishes-splash.png";
import wish from "../images/tokens/calligraphy.png";

const SplashImage = styled(Image)`
    img {
        width: 100%;
        object-fit: contain;
    }
`;

const StyledMalCarousel = styled(MalCarousel)`
  .slide {
    margin: 0 !important;
    padding: 0 !important;

    &.slide img {
        max-height: 40vh;
    }
  }
`;

const WishesTokenImage = styled.div`
    width: auto;
    padding: 32px;

    img {
        height: 100%;
        max-height: 25vh;
        object-fit: contain;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 16px !important;
    padding-right: 16px !important;

    * {
        font-size: 1rem;

        @media (max-width: 576px) { // When the viewport is 576px or less
            font-size: 0.875rem !important; // Reduce the font size even more
        }
    }
`;

const HeaderSection = styled(motion.div)`
  // Add your header-section styles here.
  text-align: center !important;
`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
  justify-content: flex-start;
  text-align: center !important;
  padding-top: 24px;

  .body-section-wide {
    align-self: center;
    width: 150% !important;
   }
`;

const TraitTokenImage = styled.div`
    width: auto;
    padding: 32px;

    img {
        height: 100%;
        max-height: 25vh;
        object-fit: contain;
    }
`;

const FooterSection = styled(motion.div)`
  // Add your footer-section styles here.
`;

const WhatIsYourWish = () => {
    const { updateUserSelection, getUserInfo } = useContext(AppContext);
    const replaceElementNoun = useDynamicTextReplacer();
    const [content, setContent] = useState('initial');
    const [selectedCard, setSelectedCard] = useState(null);
    const [refreshEnabled, setRefreshEnabled] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const nextPage = useMemo(() => pages.find(page => page.url === currentPage.nextPage), [currentPage]);
    const previousPage = useMemo(() => pages.find(page => page.url === currentPage.previousPage), [currentPage]);
    const headerControls = useAnimation();
    const bodyControls = useAnimation();
    const footerControls = useAnimation();

    const wishesList = wishesData.wishesList;

    const [currentSlide, setCurrentSlide] = useState(
        {
            title: wishesList[0].title,
            subtitle: replaceElementNoun(wishesList[0].subtitle),
            message: replaceElementNoun(wishesList[0].message),
            resultHeadline: replaceElementNoun(wishesList[0].resultHeadline),
            resultMessage: replaceElementNoun(wishesList[0].resultMessage),
            image: wishesList[0].image,
            slug: wishesList[0].slug
        }
    );

    const handleCurrentSlideChange = (newCurrentSlideIndex) => {
        setCurrentSlide({
            title: replaceElementNoun(wishesList[newCurrentSlideIndex].title),
            subtitle: replaceElementNoun(wishesList[newCurrentSlideIndex].subtitle),
            message: replaceElementNoun(wishesList[newCurrentSlideIndex].message),
            resultHeadline: replaceElementNoun(wishesList[newCurrentSlideIndex].resultHeadline),
            resultMessage: replaceElementNoun(wishesList[newCurrentSlideIndex].resultMessage),
            image: wishesList[newCurrentSlideIndex].image,
            slug: wishesList[newCurrentSlideIndex].slug,
        });
    };

    useEffect(() => {
        setRefreshEnabled(false);
        return () => setRefreshEnabled(true);
    }, [setRefreshEnabled]);

    const animateExit = async () => {
        await footerControls.start({ y: 100, opacity: 0 });
        await bodyControls.start({ y: 100, opacity: 0 });
        await headerControls.start({ y: 100, opacity: 0 });
    };

    const animateEnter = async () => {
        await headerControls.start({ y: 0, opacity: 1, transition: { delay: 0.01 } });
        await bodyControls.start({ y: 0, opacity: 1, transition: { delay: 0.025 } });
        await footerControls.start({ y: 0, opacity: 1, transition: { delay: 0.05 } });
    };

    const handleButtonClick = async () => {
        const chosenWish = currentSlide.title;
        console.log(chosenWish);
        setSelectedCard(chosenWish);
        updateUserSelection('chosenWish', chosenWish);

        if (chosenWish) {
            await animateExit();
            setContent(true);
            setTimeout(() => {
                animateEnter();
            }, 500);
        }
    };

    return (
        <Layout>
            <HeaderSection
                animate={headerControls}
                className="header-section"
            >
                {content === 'initial' ? (
                    <div className="mal-margin-bottom-small mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-vertical">{replaceElementNoun(wishesData.headline)}</h3>
                        <p className="mal-text-medium mal-margin-small-top">{replaceElementNoun(wishesData.subheadline)}</p>
                    </div>
                ) : content === 'active' ?
                    (
                        <div className="mal-padding-remove-horizontal">
                            <h3 className="mal-margin-remove-vertical">{replaceElementNoun(wishesData.subheadline)}</h3>
                            <p className="mal-text-medium mal-margin-small-top mal-margin-small-bottom">{replaceElementNoun(wishesData.subheadline)}</p>
                        </div>
                    ) : null}
            </HeaderSection>
            <BodySection
                animate={bodyControls}
                className="body-section"
            >
                {content === 'initial' ? (
                    <div>
                        <StyledMalCarousel
                            elementsList={wishesList}
                            initialSlide={0}
                            onCurrentSlideChange={handleCurrentSlideChange}
                            handleCardClick={handleButtonClick}
                        />
                    </div>
                ) : (
                    <div className="mal-padding-small mal-text-center">
                        <TraitTokenImage className="mal-padding">
                            <Image
                                src={wish}
                                alt={`The Trait of ${selectedCard}`} />
                        </TraitTokenImage>
                        <h4 className="mal-margin-remove">Your wish in the Year of the Dragon.</h4>
                        <h2 className="mal-margin-remove">{currentSlide.title}</h2>
                        <p className="mal-text-medium">{currentSlide.resultMessage}</p>
                    </div>
                )}

            </BodySection>
            <FooterSection
                animate={footerControls}
                className="footer-section"
            >
                {content === 'initial' ? (
                    <OrnateButton onClick={handleButtonClick}>
                        {currentSlide.title}
                    </OrnateButton>
                ) : (
                    <OrnateButton url={nextPage.url}>
                        {nextPage.title}
                    </OrnateButton>
                )}
            </FooterSection>
        </Layout>
    );
};

export default WhatIsYourWish;
