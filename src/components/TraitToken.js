import React from 'react';
import styled from 'styled-components';
import Image from '../components/Image';

const TraitTokenImage = styled.div`
    width: auto;
    padding: 32px;

    img {
        height: 100%;
        max-height: 25vh;
        object-fit: contain;
    }
`;

const TraitToken = ({ trait, selected, subheadline, title, description }) => {
    return (
        <div className="mal-padding-small mal-text-center">
            <TraitTokenImage className="mal-padding">
                <Image src={trait} alt={`The Trait of ${selected}`} />
            </TraitTokenImage>
            <h4 className="mal-margin-remove">{subheadline}</h4>
            <h2 className="mal-margin-remove">{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default TraitToken;