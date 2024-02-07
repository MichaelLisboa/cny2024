import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import { AppContext } from '../contexts/AppContext';
import CalligraphyGame from '../components/react-mal-calligraphy';
import RefreshContext from '../contexts/RefreshContext';

const TestYourCalligraphySkills = () => {
    const { userState, updateUserInfo } = useContext(AppContext) || JSON.parse(localStorage.getItem('userState'));
    const location = useLocation();
    const currentPage = pages.find(page => page.url === location.pathname);
    const nextPage = pages.find(page => page.url === currentPage.nextPage);
    const previousPage = pages.find(page => page.url === currentPage.previousPage);

    return (
        <RefreshContext.Provider
            value={{ disableRefresh: true }}>
            <Layout>
                <CalligraphyGame />
                <Link to={`${nextPage.url}`}>Go to {nextPage.title}</Link>
            </Layout>
        </RefreshContext.Provider>
    );
};

export default TestYourCalligraphySkills;
