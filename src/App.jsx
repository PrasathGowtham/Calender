import React from "react";
import "./Card.css";
import "moment-timezone";
import moment from "moment";

function App() {
  const [currentMonth, setCurrentMonth] = React.useState(moment());
  const [selectedDate, setSelectedDate] = React.useState(moment());
  const express = moment().tz("Asia/Kolkata").format();
  const [standardDate, setStandardDate] = React.useState(
    moment().tz("Asia/Kolkata").add(1, "days").format("YYYY-MM-DD")
  );
  const disablePast = moment().utc().add(1, "days").format("YYYY-MM-DD");
  const disableFuture = moment().utc().add(7, "days").format("YYYY-MM-DD");

  const minDate = moment().utc().format("YYYY-MM-DD"); // Example of min date
  const maxDate = moment().utc().add(7, "days").format("YYYY-MM-DD"); // Example of max date

  const blockedDates = [moment("2024-02-29"), moment("2024-02-28")]; // Example of blocked dates

  const daysInMonth = () => {
    const days = [];
    const currentMonthStart = currentMonth.clone().startOf("month");
    const endOfMonth = currentMonth.clone().endOf("month");
    while (currentMonthStart.isSameOrBefore(endOfMonth, "day")) {
      const isBlocked = blockedDates.some((blockedDate) =>
        blockedDate.isSame(currentMonthStart, "day")
      );
      const isDisabled =
        currentMonthStart.isBefore(minDate) ||
        currentMonthStart.isAfter(maxDate);
      days.push({ date: currentMonthStart.clone(), isBlocked, isDisabled });
      currentMonthStart.add(1, "day");
    }
    return days;
  };

  const handleDateClick = (day) => {
    if (!day.isBlocked && !day.isDisabled) {
      setSelectedDate(day.date);
    }
  };

  console.log(moment(selectedDate).format("DD/MMM/YYYY"));

  return (
    <div
      className="calendar-container"
      style={{
        border: "1px solid gray",
        borderRadius: "5px",
        padding: ".5rem",
      }}
    >
      <div className="header">
        <button
          onClick={() =>
            setCurrentMonth(currentMonth.clone().subtract(1, "month"))
          }
          className="button-91"
        >
          <span>{"<"}</span>
        </button>
        <h5>{currentMonth.format("MMMM YYYY")}</h5>/
        <h5>{selectedDate.format("DD MM YYYY")}</h5>
        <button
          onClick={() => setCurrentMonth(currentMonth.clone().add(1, "month"))}
          className="button-91"
        >
          {">"}
        </button>
      </div>
      <div className="days">
        {daysInMonth().map((day) => (
          <div
            key={day.date.format("YYYY-MM-DD")}
            className={`${day.isBlocked ? "blocked" : ""} ${
              day.isDisabled ? "disabled" : ""
            } ${day.date.isSame(selectedDate, "day") ? "selected" : "hover"}`}
            onClick={() => handleDateClick(day)}
          >
            {day.date.format("D")}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
