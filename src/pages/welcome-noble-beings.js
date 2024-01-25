import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import { OrnateButton } from '../components/Button';

const WelcomeNobleBeings = () => {
    const location = useLocation();
    const currentPage = pages.find(page => page.url === location.pathname);
    const nextPage = pages.find(page => page.url === currentPage.nextPage);
    const previousPage = pages.find(page => page.url === currentPage.previousPage);

    return (
        <Layout>
            <div className="header-section mal-text-center" />
            <div className="body-section mal-text-center">
                <div className="mal-margin-bottom-large mal-padding">
                    <h1 className="mal-margin-remove-top">Welcome, noble beings!</h1>
                    <p className="mal-text-medium">As an ethereal spirit, you're standing at the threshold of The Grand Race. The Jade Emperor has called upon all spirits to compete for a place in the Chinese Zodiac.</p>
                </div>
            </div>
            <div className="footer-section">
                <OrnateButton url={`${currentPage.nextPage}`}>Choose your adventure</OrnateButton>
            </div>
        </Layout>
    );
};

export default WelcomeNobleBeings;
