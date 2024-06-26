import React, { useContext, useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, easeInOut } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { usePageAnimations } from '../contexts/AnimationContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import Image from '../components/Image';
import { OrnateButton } from '../components/Button';
import { resultData } from '../data';
import jadeEmperor from '../images/happy-jade-emperor.png';

const StyledAnimalImage = styled.div`
  width: 85%;
  max-height: 30vh;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  position: relative;
  z-index: -1;
`;

const CopyContainer = styled(motion.div)`
  text-align: center !important;
  padding: 24px;

    @media (min-width: 768px) {
        border-radius: 16px;
        background-color: rgba(255, 255, 255, 0.5);
    }
`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
  justify-content: flex-start;
  text-align: center !important;
`;

const FooterSection = styled(motion.div)`
  // Add your footer-section styles here.
`;

const ZodiacInfo = ({ animal }) => {
    if (!animal) {
        return null;
    }

    const animalImage = require(`../images/zodiac_actual/animals/${animal.toLowerCase()}.png`);

    const animalVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: -72, transition: { duration: 0.7, delay: .4, ease: easeInOut } }
    };

    return (
        <ImageContainer>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={animalVariants}>
                <StyledAnimalImage>
                    <Image src={animalImage} alt={animal} />
                </StyledAnimalImage>
            </motion.div>
        </ImageContainer>
    );
};

const PursueYourDreams = () => {
    const { updateUserSelection, getUserInfo } = useContext(AppContext);
    const replaceElementNoun = useDynamicTextReplacer();
    const [content, setContent] = useState('initial');
    const [refreshEnabled, setRefreshEnabled] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const nextPage = useMemo(() => pages.find(page => page.url === currentPage.nextPage), [currentPage]);
    const previousPage = useMemo(() => pages.find(page => page.url === currentPage.previousPage), [currentPage]);
    const { controls, animateEnter, animateExit } = usePageAnimations();
    

    const userInfo = getUserInfo();
    const ally = userInfo.chosenAlliance.choice.toLowerCase().split(' ')[1];

    const AnimatedZodiacInfo = motion(ZodiacInfo);

    useEffect(() => {
        if (content === 'initial' || content === 'active') {
            setRefreshEnabled(true);
        } else {
            setRefreshEnabled(false);
        }
    }, [content]);

    const handleButtonClick = async () => {
        await animateExit();
        setContent('complete');
        setTimeout(() => {
            animateEnter();
        }, 500);
    };

    const emperorVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: -72, transition: { duration: 0.7, delay: .4, ease: easeInOut } }
    };

    const copyContainerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1, ease: easeInOut } }
    };

    return (
        <Layout>
            <BodySection
                animate={controls.bodyControls}
                className="body-section"
            >
                {content === 'initial' ? (
                    <>
                        <div>
                            <AnimatedZodiacInfo
                                animal={ally}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 3, duration: 2, ease: 'easeOut' }} />
                        </div>
                        <CopyContainer
                            initial="hidden"
                            animate="visible"
                            variants={copyContainerVariants}>
                            <h3 className="mal-margin-remove">
                                {replaceElementNoun(resultData[0].headline)}
                            </h3>
                            <p className="mal-text-medium mal-margin-small-top">
                                {replaceElementNoun(resultData[0].message)}
                            </p>
                        </CopyContainer>
                    </>

                ) : (
                    <>
                        <Image
                            initial="hidden"
                            animate="visible"
                            variants={emperorVariants}
                            src={jadeEmperor} alt="Jade Emperor" />
                        <CopyContainer
                            initial="hidden"
                            animate="visible"
                            variants={copyContainerVariants}>
                            <h3 className="mal-margin-remove">
                                {replaceElementNoun(`The Jade Emperor chuckles and says, “Ah, certainly! The time has come!”`)}
                            </h3>
                            <p className="mal-text-medium mal-margin-small-top">
                                {replaceElementNoun(`You stand before the Jade Emperor, the atmosphere is charged with excitement. The crowd waits in anticipation as the Emperor's magic unveils your true form, revealing your role in the world.`)}
                            </p>
                        </CopyContainer>
                    </>
                )}

            </BodySection>
            <FooterSection
                animate={controls.footerControls}
                className="footer-section"
            >
                {content === 'initial' ? (
                    <OrnateButton onClick={handleButtonClick}>
                        Continue
                    </OrnateButton>
                ) : (
                    <OrnateButton url={nextPage.url}>
                        What is your true form?
                    </OrnateButton>
                )}
            </FooterSection>
        </Layout>
    );
};

export default PursueYourDreams;
