import React, { useState } from 'react';
import styled from 'styled-components';
import { DayPicker } from 'react-day-picker'; // Import DayPicker component
import 'react-day-picker/dist/style.css';
import '../styles/DatePickerStyles.css';

const DatePickerContainer = styled.div`
  position: relative;
`;

const DateInput = styled.input`
    font-size: 2.75rem;
    font-style: italic;
    width: 80%;
    max-width: 480px;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.5);
    outline: none;
    text-align: center;
    color: #888;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    &:hover {
        background-color: rgba(255, 255, 255, 0.75);
    }
    &:focus {
        background-color: rgba(255, 255, 255, 0.75);
    }
`;

const DatePicker = styled(DayPicker)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-55%, -80%);
  background: white;
  box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 16px;
`;

function BirthdayPicker({ onBirthdaySubmit }) {

    const [birthdate, setBirthdate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onSubmit = (date) => {
        // Check if the date matches the expected format
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(date)) {
            console.error("Invalid birthdate format. Expected format is yyyy-mm-dd.");
            return; // Stop the function
        }

        // Check if the year is within the valid range
        let year = date.split('-')[0];
        if (year < 1924 || year > 2024) {
            console.error("Year is invalid. It should be between 1924 and 2024.");
            return; // Stop the function
        }

        console.log('Submitting birthdate:', date);
    };

    const handleDateChange = (date) => {
        try {
            const formattedDate = date.toISOString().substring(0, 10);
            console.log('Formatted date:', formattedDate);

            // Check if the date matches the expected format and the year is within the valid range before updating the state
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            let year = formattedDate.split('-')[0];
            if (datePattern.test(formattedDate) && (year >= 1924 && year <= 2024)) {
                setBirthdate(formattedDate);
                setShowDatePicker(false); // Hide the date picker after a date is selected
                onSubmit(formattedDate);
            } else {
                console.error("Invalid birthdate format or year out of range.");
            }
        } catch (error) {
            console.error("Error formatting date:", error);
        }
    };

    const handleInputChange = (event) => {
        let inputDate = event.target.value;
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(inputDate)) {
            console.error("Invalid birthdate format. Expected format is yyyy-mm-dd.");
            return; // Stop the function
        }

        let year = inputDate.split('-')[0];

        try {

            if (year.length > 4) {
                year = year.slice(0, 4); // Limit year to 4 digits
                const restOfDate = inputDate.split('-').slice(1).join('-');
                inputDate = `${year}-${restOfDate}`;
            }

            setBirthdate(inputDate);
        } catch (error) {
            console.error("Error handling input change:", error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setShowDatePicker(false); // Hide the date picker
            onSubmit(birthdate); // Submit the date
        }
    };

    const today = new Date();
    const modifiers = {
        disabled: { after: today },
    };

    return (
        <>
            <div className="header-section mal-text-center" />
            <div className="body-section mal-text-center">
                <div className="mal-container mal-width-1-1">
                    <div className="mal-margin-bottom-large mal-padding">
                        <h1 className="mal-margin-remove-top">When were you born?</h1>
                        <p className="mal-text-medium">Every decision shapes your destiny. Find out which extraordinary creature you're destined to become.</p>
                    </div>
                    <DatePickerContainer>
                        <DateInput
                            className="dateInput"
                            type="text"
                            value={birthdate || 'YYYY-MM-DD'}
                            disabled={showDatePicker}
                            onChange={handleInputChange}
                            onClick={(e) => {
                                e.target.value = ''; // Clear the date input field
                                setShowDatePicker(true); // Show the date picker
                            }}
                            onKeyDown={handleKeyPress}
                        />
                        {showDatePicker && (
                            <div className="datePickerPopup">
                                <DatePicker
                                    selected={birthdate ? new Date(birthdate) : undefined}
                                    onDayClick={handleDateChange}
                                    mode="single"
                                    captionLayout="dropdown"
                                    fromYear={1924}
                                    toYear={today.getFullYear()}
                                    modifiers={modifiers}
                                />
                            </div>
                        )}
                    </DatePickerContainer>
                </div>
            </div>
        </>
    );
}

export default BirthdayPicker;
