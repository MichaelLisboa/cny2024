import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { usePageAnimations } from '../contexts/AnimationContext';
import Image from '../components/Image';

const TraitTokenContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    h2 {
        margin: 0;
    }

    h4 {
        margin: 0;
    }

    p {
        margin: 8px 0 0 0;
    }

`;

const TraitTokenImage = styled.div`
    width: auto;
    padding: 0 0 8px 0;

    img {
        height: 100%;
        max-height: 25vh;
        object-fit: contain;
    }
`;

const TraitToken = ({ trait, selected, subheadline, title, description }) => {
    const { animations } = usePageAnimations();
    return (
        <TraitTokenContainer>
            <TraitTokenImage className="mal-padding">
                <Image src={trait} alt={`The Trait of ${selected}`} />
            </TraitTokenImage>
            <motion.div
                variants={{
                    hidden: { ...animations.slideUpFadeIn.hidden },
                    visible: {
                        ...animations.slideUpFadeIn.visible,
                        transition: {
                            ...animations.slideUpFadeIn.visible.transition,
                            delay: 0.125 // Delay in seconds
                        }
                    },
                    exit: { ...animations.slideUpFadeIn.exit }
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <h4>{subheadline}</h4>
                <h2>{title}</h2>
                <p className="mal-text-medium">{description}</p>
            </motion.div>
        </TraitTokenContainer>
    );
};

export default TraitToken;