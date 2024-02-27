import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import useRedirectOnFail from '../hooks/useRedirectOnFail';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import BirthdatePicker from '../components/BirthdatePicker';

const WelcomeNobleBeings = () => {
    const { updateUserInfo } = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const nextPage = useMemo(() => pages.find(page => page.url === currentPage.nextPage), [currentPage]);
    const [refreshEnabled] = useState(true);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    useRedirectOnFail();

    useEffect(() => {
        const userState = JSON.parse(localStorage.getItem('userState'));
        if (userState?.userInfo && userState?.userInfo.birthdate) {
            updateUserInfo(userState?.userInfo.birthdate);
            setShouldNavigate(true);
        }
    }, [updateUserInfo]);

    useEffect(() => {
        if (shouldNavigate) {
            navigate(nextPage.url);
        }
    }, [shouldNavigate, navigate, nextPage.url]);

    return (
        <Layout refreshEnabled={refreshEnabled}>
            <div className="body-section mal-text-center">
                <div className="mal-margin-bottom-large mal-padding">
                    <h1 className="mal-margin-remove-top">Welcome, noble beings!</h1>
                    <p className="mal-text-medium">As an ethereal spirit, you're standing at the threshold of The Grand Race. The Jade Emperor has called upon all spirits to compete for a place in the Chinese Zodiac.</p>
                </div>
                <BirthdatePicker updateUserInfo={updateUserInfo} />
            </div>
        </Layout>
    );
};

export default WelcomeNobleBeings;