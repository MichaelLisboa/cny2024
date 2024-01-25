import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import { AppContext } from '../contexts/AppContext';

const EmbraceWhatInFrontOfYou = () => {
    const { userState, updateUserInfo } = useContext(AppContext) || JSON.parse(localStorage.getItem('userState'));
    const location = useLocation();
    const currentPage = pages.find(page => page.url === location.pathname);
    const nextPage = pages.find(page => page.url === currentPage.nextPage);
    const previousPage = pages.find(page => page.url === currentPage.previousPage);

    return (
        // make this component full screen

        <Layout>
            {/* using framer-motion make the carousel swipe and stick to each card. the focused card should be centered and
            fill the width 80% and the height should be 80% of the parent container the cards to the left and right of the focused card should be 
            visible slightly smaller and at 80% opacity but not centered. the cards should snap to the center when the user stops dragging
            */}
            <h1>{currentPage ? currentPage.title : ''}</h1>
            <Link to={`${nextPage.url}`}>Go to {nextPage.title}</Link>
        </Layout>
    );
};

export default EmbraceWhatInFrontOfYou;
