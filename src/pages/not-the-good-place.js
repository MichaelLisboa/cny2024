import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { usePageAnimations } from '../contexts/AnimationContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import useRedirectOnFail from '../hooks/useRedirectOnFail';
import Layout from '../templates/layout';
import { OptionButton } from '../components/Button'


const ButtonContainer = styled.div`
    height: 72px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 16px !important;
    padding-right: 16px !important;

    * {
        font-size: 1rem;

        @media (max-width: 576px) { // When the viewport is 576px or less
            font-size: 0.875rem !important; // Reduce the font size even more
        }
    }
`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
  justify-content: flex-start !important;
  text-align: center !important;
  padding-top: 0;

  * {
    color: #fff !important;
    }

  .body-section-wide {
    align-self: center;
    width: 130% !important;
   }
   .mal-text-large {
    margin: 0;
   }
   h2 {
    margin: 0;
   }
`;

const FooterSection = styled(motion.div)`
    // Add your footer-section styles here.
    `;

function NotTheGoodPlace() {
    const [refreshEnabled] = useState(true);
    const replaceElementNoun = useDynamicTextReplacer();
    const { controls } = usePageAnimations();
    const isMounted = useRef(false);
    const { previousPage } = useRedirectOnFail();

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    return (
        <Layout refreshEnabled={refreshEnabled}>
            <BodySection
                animate={controls.bodyControls}
                className="body-section">
                <p className="mal-text-large">{replaceElementNoun(`Oh no, spirit of *element_noun*!`)}</p>
                <h2>{replaceElementNoun(`You've wandered into the Not So Good Place.`)}</h2>
                <p className="mal-text-medium">
                    {replaceElementNoun(`It seems the choices you've made do not align with the essence of your spirit, leading you away from your destination. Fear not, for this is but a bend in your journey, not the end. The wisdom of the *element_noun* still flows within you.`)}
                </p>
                <p className="mal-text-medium mal-margin-remove-vertical">
                    {replaceElementNoun(`Reflect upon your decisions and seek the balance within and let the *alliance_noun* guide you back to the path that leads to enlightenment and glory.`)}
                </p>

            </BodySection>
            <FooterSection
                animate={controls.footerControls}
                className="footer-section"
            >
                <ButtonContainer>
                    <OptionButton url={previousPage}>
                        {replaceElementNoun('I\'m going to try again')}
                    </OptionButton>
                    <OptionButton url={`/get-your-fortune`}>
                        {replaceElementNoun('Nah, I\'m done for')}
                    </OptionButton>
                </ButtonContainer>
            </FooterSection>
        </Layout>
    );
}

export default NotTheGoodPlace;
