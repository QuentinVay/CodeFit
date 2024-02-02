import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "./Schedule.scss";
import PropTypes from "prop-types";

function MyCalendar({ onDateTimeChange, onHourChange, isOpen }) {
  const [dateTime, setDateTime] = useState(null);
  const [showValidation, setShowValidation] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);

  const handleDateTimeChange = (selectedDateTime) => {
    setDateTime(selectedDateTime);
    setShowValidation(true);
  };

  const handleValidation = () => {
    onDateTimeChange(dateTime);
    setShowValidation(false);
  };

  const handleHourChange = (event) => {
    const hourFromEvent = event.target.value;
    const formattedHour = `${hourFromEvent}:00:00`;
    setSelectedHour(formattedHour);
    onHourChange(formattedHour);
  };

  const minDate = new Date();

  return isOpen ? (
    <div className="calendar-container">
      <DateTimePicker
        onChange={handleDateTimeChange}
        value={dateTime}
        minDate={minDate}
        minDetail="day"
        format="yyyy-MM-dd"
        calendarIcon={null}
        disableClock
      />
      {dateTime && (
        <div className="time-slot-container">
          <label htmlFor="timeSlot">Choisissez un horaire :</label>
          <select
            id="timeSlot"
            name="timeSlot"
            onChange={handleHourChange}
            value={selectedHour}
          >
            <option value="" disabled>
              Sélectionnez un créneau
            </option>
            {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((hour) => (
              <option key={hour} value={hour}>
                {hour}h00 - {hour + 1}h00
              </option>
            ))}
          </select>
        </div>
      )}
      {showValidation && selectedHour && (
        <div>
          <button
            type="button"
            className="button-validation-calendar"
            onClick={handleValidation}
          >
            Valider
          </button>
        </div>
      )}
    </div>
  ) : null;
}

export default MyCalendar;

MyCalendar.propTypes = {
  onDateTimeChange: PropTypes.func.isRequired,
  onHourChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
