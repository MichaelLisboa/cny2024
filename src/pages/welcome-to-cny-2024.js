import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import { OrnateButton } from '../components/Button';

function WelcomeToCny2024() {
    const location = useLocation();
    const currentPage = pages.find(page => page.url === location.pathname);
    const nextPage = pages.find(page => page.url === currentPage.nextPage);
    const [refreshEnabled] = useState(true);


    return (
        <Layout refreshEnabled={refreshEnabled}>
            <div className="body-section mal-text-center">
                <div className="mal-margin-bottom-large mal-padding">
                    <h4 className="mal-margin-remove-vertical">Embark on a mystical journey to</h4>
                    <h1 className="mal-margin-remove-top">Discover your innate zodiac!</h1>
                    <p className="mal-text-medium">Every decision shapes your destiny. Find out which extraordinary creature you're destined to become.</p>
                </div>
            </div>
            <div className="footer-section">
                <OrnateButton url={`${nextPage.url}`}>Let's Go</OrnateButton>
            </div>
        </Layout>
    );
}

export default WelcomeToCny2024;
