import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

const Header = () => {
    const headerStyle = {
        height: '72px',
        width: '100%',
        background: 'linear-gradient(180deg, rgba(243,220,191,.8) 0%, rgba(253,247,230,0) 70%)',
        backdropFilter: 'blur(3px)',
        color: '#337C76',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '16px',
        position: 'fixed',
        top: '0',
        zIndex: '9999',
        fontSize: '0.875rem',
    };

    return (
        <header style={headerStyle}>
            <div className="mal-width-1-2@m mal-grid mal-grid-collapse mal-child-width-1-3 mal-padding-small mal-padding-remove-vertical mal-flex mal-flex-middle mal-flex-center">
                <div className="mal-grid-col">
                    <span>The Adventure</span>
                </div>
                <div>
                    <a href="/">
                        <img style={{height: "56px"}} src={logo} alt="Welcome to the year of The Dragon" />
                    </a>
                </div>
                <div className="mal-grid-col">
                    <span>Your fortune</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
