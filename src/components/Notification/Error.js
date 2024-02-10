import React from "react";

export const DataError = ({data, ...props}) => {
    return (
        <div className="uk-width-1-1@s uk-position-center-left uk-position-z-index">
            <div className="uk-margin-remove-vertical uk-alert-danger uk-text-center uk-border-pill" data-uk-alert>
                <p style={{fontSize: "14px"}}>I couldn't find data for that pair... <span style={{fontSize: "12px"}}>spooky!</span></p>
            </div>
        </div>
    )
}
