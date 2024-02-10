import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Image from '../Image';
import logo from '../../images/logo.svg';

const HeaderContainer = styled.header`
    height: 72px;
    width: 100%;
    background: linear-gradient(180deg, rgba(243, 220, 191, 0.8) 0%, rgba(253, 247, 230, 0) 70%);
    backdrop-filter: blur(3px);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 16px;
    position: fixed;
    top: 0;
    z-index: 9999;
    font-size: 0.875rem;

    .mal-grid-col > span {
        color: rgba(51, 124, 118, 1);
        text-decoration: none;
        font-weight: 800 !important;
        border-bottom: 2px solid rgba(51, 124, 118, 1);
    }

    a.active {
        color: rgba(51, 124, 118, 1);
        text-decoration: none;
        font-weight: 500 !important;
        border-bottom: 2px solid transparent;
    }
`;

const LogoImage = styled(Image)`
    height: 56px;
    width: auto;
    `;

const Header = () => {
    const location = useLocation();

    return (
        <HeaderContainer>
            <div className="mal-width-1-2@m mal-grid mal-grid-collapse mal-child-width-1-3 mal-padding-small mal-padding-remove-vertical mal-flex mal-flex-middle mal-flex-center">
                <div className="mal-grid-col mal-text-nowrap">
                    {location.pathname === '/get-your-fortune' ? (
                        <Link className="active" to="/">The Adventure</Link>
                    ) : (
                        <span>The Adventure</span>
                    )}
                </div>
                <div>
                    <a href="/">
                        <LogoImage src={logo} alt="Welcome to the year of The Dragon" />
                    </a>
                </div>
                <div className="mal-grid-col mal-text-nowrap">
                    {location.pathname === '/get-your-fortune' ? (
                        <span>Your Fortune</span>
                    ) : (
                        <Link className="active" to="/get-your-fortune">Your Fortune</Link>
                    )}
                </div>
            </div>
        </HeaderContainer>
    );
};

export default Header;
