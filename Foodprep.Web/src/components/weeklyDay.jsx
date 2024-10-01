import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import { useState, useEffect } from "react";

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
  return (
    <div>
      {/* // Render the list of days */}
      <Day setSelectedDay={setSelectedDay} />
      {/* // Render the modal with details of selected day */}
      <DayModal day={selectedDay} />
    </div>
  );
}

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

// Render list of days as buttons
function Day({ setSelectedDay }) {
  return (
    <div>
      <ul style={styles.days}>
        {days.map((day) => (
          <DayButton key={day} day={day} setSelectedDay={setSelectedDay} />
        ))}
      </ul>
    </div>
  );
}

// Modal that shows the day's details
function DayModal({ day }) {
  const [data, setData] = useState(null);

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
    const selectedDayIndex = days.indexOf(day);

    if (selectedMealId != null) {
      fetch("https://localhost:7055/api/DayMeals", {
        method: "POST",
        body: JSON.stringify({
          day: selectedDayIndex,
          mealId: selectedMealId,
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
    <>
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
        <div className="modal-dialog">
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
              <div className="choose-meal">
                <select
                  onChange={(e) => setSelectedMealId(e.target.value)}
                  className="form-select"
                  aria-label="Default select example"
                  style={
                    {
                      // fontSize: "0.9rem",
                      // width: "100%",
                      // overflowX: "hidden",
                      // backgroundColor: "#fff",
                      // color: "#000",
                      // overFlowX: "auto",
                      // maxWidth: "1rem",
                    }
                  }
                >
                  <option defaultValue>Choose meal</option>
                  {data &&
                    data.map((meal) => (
                      <option
                        key={meal.nummer}
                        value={meal.nummer}
                        style={{
                          wordWrap: "breakWord",
                          // whiteSpace: "wrap",
                          // textOverflow: "ellipsis",
                        }}
                      >
                        {meal.namn}
                      </option>
                    ))}
                </select>
              </div>
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
    </>
  );
}
