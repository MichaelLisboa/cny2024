import React, { useEffect } from "react";
import Notification from "../Notification";
import { useNotification } from "../../hooks/useNotification";
import styled from "styled-components";
import share from "../../images/AppleShare.png";
import close from "../../images/close.svg";

const StyledDiv = styled.div`
    margin: 20px auto 0px auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 1rem;

    img {
        margin: 0 4px;
        display: inline-block;
        height: 20px;
        width: 20px;
    }
`;

const CloseButton = styled.span`
    position: absolute;
    right: 16px;
    top: 4px;

    svg {
        height: 16px;
        width: 16px;
    }

    path {
        stroke: rgba(255, 255, 255, 0.9);
        stroke-width: 2;
    }
`;


export const InstallPWA = ({ ...props }) => {
    const [notificationOpen, setNotificationOpen,] = useNotification();

    useEffect(
        () => {
            setNotificationOpen(true)
        }, [setNotificationOpen]
    )
    return (
        <Notification
            isActive={notificationOpen}>
            <StyledDiv>
                <p>Tap</p>
                <img
                    src={share}
                    alt="Add to homescreen"
                />
                &nbsp;
                <p>then &quot;Add to Home Screen&quot;</p>
                <CloseButton
                    onClick={() => setNotificationOpen(false)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" stroke="#000" strokeWidth="4" d="M16,16 L4,4" />
                        <path fill="none" stroke="#000" strokeWidth="4" d="M16,4 L4,16" />
                    </svg>
                </CloseButton>
            </StyledDiv>
        </Notification>
    )
}
