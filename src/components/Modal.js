import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

const Background = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10000;
`;

const ModalContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10001;
    box-shadow: 0px 5px 24px rgba(0, 0, 0, 0.8);
`;

const ModalContent = styled.div`
    background: #FDF7E6;
    padding: 32px;
    max-width: 80%;
    max-height: 50vh;
    overflow-y: auto;
    border-radius: 16px;
    position: relative;
    z-index: 1000;
`;

const CloseButton = styled.button`
    background: #FEECD6;
    color: #664738;
    font-size: 0.875rem;
    font-weight: 700;
    font-family: "Inknut Antiqua", Georgia, serif;
    letter-spacing: -0.015rem;
    white-space: nowrap;
    border: none;
    border-radius: 16px;
    padding: 4px 8px;
    margin: 16px auto 8px auto !important;
    border: 8px double #AF3830;
    box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &:active {
        box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.6);
    }

    &:hover {
        box-shadow: 0px 5px 32px rgba(0, 0, 0, 0.25);
    }
`;



const Modal = ({ children, closeOnEscape = true, closeOnBackgroundClick = true, closeButton, onClose }) => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const closeOnEscapeKeyDown = (e) => {
            if ((e.charCode || e.keyCode) === 27) {
                handleClose()
            }
        };

        if (closeOnEscape) {
            window.addEventListener('keydown', closeOnEscapeKeyDown);
        }

        return () => {
            if (closeOnEscape) {
                window.removeEventListener('keydown', closeOnEscapeKeyDown);
            }
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <Background
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: .95 } }}
                        exit={{ opacity: 0 }}
                        onClick={closeOnBackgroundClick ? handleClose : undefined}
                    />
                    <ModalContainer
                        initial={{ opacity: 0, y: '100vh' }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 1, duration: 0.4, ease: "easeOut" } }}
                        exit={{ opacity: 0, y: '100vh', transition: { ease: "easeOut" } }}
                        onClick={closeOnBackgroundClick ? handleClose : undefined}
                    >
                        <ModalContent onClick={e => e.stopPropagation()}>
                            {children}
                            <div className="mal-width-1-1 mal-text-center">
                                <CloseButton onClick={handleClose}>{closeButton}</CloseButton>
                            </div>
                        </ModalContent>
                    </ModalContainer>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;