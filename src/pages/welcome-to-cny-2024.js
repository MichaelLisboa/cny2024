import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageAnimations } from '../contexts/AnimationContext';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import Modal from '../components/Modal';
import { OrnateButton } from '../components/Button';

function WelcomeToCny2024() {
    const location = useLocation();
    const [dataExists, setDataExists] = useState(false)
    const currentPage = pages.find(page => page.url === location.pathname);
    const nextPage = pages.find(page => page.url === currentPage.nextPage);
    const [refreshEnabled] = useState(true);
    const { animateEnter, animateExit, elementControls } = usePageAnimations();

    useEffect(() => {
        const userInfo = localStorage.getItem('userState');
        if (userInfo) {
            setDataExists(true)
        }
    }, []);

    const isMounted = useRef(true);

    useEffect(() => {
        const animate = async () => {
            if (isMounted.current) {
                await animateEnter();
            }
        };

        animate();

        return () => {
            isMounted.current = false;
            if (isMounted.current) {
                animateExit();
            }
        };
    }, [animateEnter, animateExit]);

    function handleModalClose() {
        localStorage.removeItem('userState');
    }
    

    return (
        <>
            <Layout refreshEnabled={refreshEnabled}>
                <div className="body-section mal-text-center">
                    <div className="mal-margin-bottom-large mal-padding">
                        <h4 animate={elementControls} className="mal-margin-remove-vertical">Embark on a mystical journey to</h4>
                        <h1 className="mal-margin-remove-top">Discover your innate zodiac!</h1>
                        <p className="mal-text-medium">Every decision shapes your destiny. Find out which extraordinary creature you're destined to become.</p>
                    </div>
                </div>
                <div className="footer-section">
                    <OrnateButton url={`${nextPage.url}`}>Let's Go</OrnateButton>
                </div>
            </Layout>
            {dataExists &&
                <Modal
                    closeOnEscape={true}
                    closeOnBackgroundClick={false}
                    closeButton={`Yes, start the adventure again!`}
                    onClose={handleModalClose}
                    // onCancel={`No, thanks`}
                    >
                    <h3 className="mal-margin-remove-vertical">You've been here before.</h3>
                    <p className="mal-margin-small">Would you like to start the adventure again?</p>
                </Modal>
            }
        </>
    );
}

export default WelcomeToCny2024;
