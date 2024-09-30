import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";

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
            </div>
            <div className="modal-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ex temporibus nam laborum voluptatibus, soluta repudiandae
              doloremque, nobis recusandae tenetur, omnis cumque deserunt
              nesciunt illum enim. Et vel distinctio omnis. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Tempora ex temporibus nam
              laborum voluptatibus, soluta repudiandae doloremque, nobis
              recusandae tenetur, omnis cumque deserunt nesciunt illum enim. Et
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
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
