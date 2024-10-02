import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import { useState, useEffect, useCallback } from "react";
// import { useState, useCallback } from "react";
import WeekNavigator from "./weekNavigator";

// List of days
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Main component
export default function WeeklyDay() {
  const [selectedDay, setSelectedDay] = useState(""); // track the selected day
  const [currentWeek, setCurrentWeek] = useState(0); // track the current week
  const [weekDays, setWeekDays] = useState([]); // track the days for the current week

  const handleWeekChange = useCallback((week) => {
    setCurrentWeek(week);
  }, []);

  const handleDaysChange = useCallback((days) => {
    setWeekDays(days);
  }, []);

  return (
    <div>
      <WeekNavigator
        onWeekChange={handleWeekChange}
        onDaysChange={handleDaysChange}
      />
      {/* // Render the list of days */}
      <div>
        <ul style={styles.days}>
          {days.map((day) => (
            <DayButton key={day} day={day} setSelectedDay={setSelectedDay} />
          ))}
        </ul>
      </div>
      {/* // Render the modal with details of selected day */}
      <DayModal day={selectedDay} currentWeek={currentWeek} />
    </div>
  );
}
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

// Styling
const styles = {
  days: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingRight: "20px",
  },
  dayButton: {
    margin: "20px",
    width: "200px",
    borderRadius: "5px",
    backgroundColor: "#84cc16",
    fontSize: "24px",
  },
};

// Component for each day, which triggers modal on click
function DayButton({ day, setSelectedDay }) {
  // Set the selected day in state
  const handleClick = () => {
    setSelectedDay(day);
  };
  return (
    <button
      type="button"
      className="btn btn-primary"
      style={styles.dayButton}
      data-bs-toggle="modal"
      data-bs-target="#dayModal"
      onClick={handleClick}
    >
      {day}
    </button>
  );
}

// Modal that shows the day's details
function DayModal({ day, currentWeek }) {
  const [data, setData] = useState(null);
  const [selectedMealId, setSelectedMealId] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7055/api/Meals")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSave = () => {
    // const selectedDayIndex = days.indexOf(day);
    const selectedDate = new Date(); // You need the current date in your app's logic
    const startOfYear = new Date(selectedDate.getFullYear(), 0, 1); // January 1st
    const dayOfYear =
      Math.floor((selectedDate - startOfYear) / (1000 * 60 * 60 * 24)) + 1; // 1-365/366

    if (selectedMealId != null) {
      fetch("https://localhost:7055/api/DayMeals", {
        method: "POST",
        body: JSON.stringify({
          daysID: dayOfYear,
          mealID: selectedMealId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save meal");
          }
          return response.json();
        })
        .then((result) => {
          console.log("Success:", result);
        })
        .catch((error) => console.error("Error saving meal:", error));
    } else {
      console.log("Please select a meal");
    }
  };
  return (
    <div
      className="modal fade"
      id="dayModal"
      key="dayModal"
      role="dialog"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(226,232,240,0.8)" }}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{day}</h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <select
              onChange={(e) => setSelectedMealId(e.target.value)}
              className="form-select w-100"
              aria-label="Default select example"
              style={{ marginTop: "13rem" }}
            >
              <option defaultValue>Choose meal</option>
              {data?.map((meal) => (
                <option key={meal.nummer} value={meal.nummer}>
                  {truncateText(meal.namn, 40)}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
