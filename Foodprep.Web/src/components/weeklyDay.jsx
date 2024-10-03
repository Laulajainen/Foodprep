import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "bootstrap-select/dist/css/bootstrap-select.min.css";
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
  const [isMobileView, setIsMobileView] = useState(false); // Track viewport size

  const handleWeekChange = useCallback((week) => {
    setCurrentWeek(week);
  }, []);

  const handleDaysChange = useCallback((days) => {
    setWeekDays(days);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // If the viewport is less than 768px wide, it mobile view
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <WeekNavigator
        onWeekChange={handleWeekChange}
        onDaysChange={handleDaysChange}
      />
      {/* // Render the list of days */}
      <div>
      {isMobileView ? (
        <DayModal day={selectedDay} /> // Mobile view: Use modal
      ) : (
        <DayDetails day={selectedDay} currentWeek={currentWeek} /> // Large view: Show inline details
      )}
        <ul style={styles.days}>
          {days.map((day) => (
            <DayButton key={day} day={day} setSelectedDay={setSelectedDay} />
          ))}
        </ul>
      </div>
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
    flexWrap: "wrap",
    gab: "10px",
    justifyContent: "center",
    // alignItems: "center",
    // flexDirection: "column",
    padding: "0",
    // paddingRight: "20px",

  },
  dayButton: {
    margin: "10px",
    minWidth: "150px",
    borderRadius: "5px",
    backgroundColor: "#d9c6d9",
    fontSize: "24px",
    border: "1px solid #794d79",
    color: "#794d79"
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
function DayDetails({ day }) {
 
  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", marginTop: "20px" }}>
      <h2>{day}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ex temporibus nam laborum voluptatibus,
        soluta repudiandae doloremque, nobis recusandae tenetur, omnis cumque deserunt nesciunt illum enim.
      </p>
      <div >
            <button type="button" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss=""
            >
              Discard
            </button>
          </div>
    </div>
  );
}
