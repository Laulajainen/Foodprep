// import DayModal from "./dayModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function WeeklyDay() {
  const [selectedDay, setSelectedDay] = useState(null);
  return (
    <div>
      <Day onDayClick={setSelectedDay} />
      {selectedDay && (
        <DayModal day={selectedDay} onClose={() => setSelectedDay(null)} />
      )}
    </div>
  );
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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

function DayButton({ day, onClick }) {
  return (
    <button
      type="button"
      className="btn btn-primary"
      style={styles.dayButton}
      // data-bs-toggle="modal"
      // data-bs-target="#dayModal"
      onClick={() => onClick(day)}
    >
      {day}
    </button>
  );
}

function Day({ onDayClick }) {
  return (
    <div>
      <ul style={styles.days}>
        {days.map((day) => (
          <DayButton key={day} day={day} onClick={onDayClick} />
        ))}
      </ul>
    </div>
  );
}

function DayModal({ day, onClose }) {
  return (
    <div
      className="modal show fade"
      key="dayModals"
      role="dialog"
      aria-hidden="true"
      tabIndex="-1"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-header">
          <h2 className="modal-title">{day}</h2>
        </div>
        <div className="modal-body">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat,
          architecto nihil quidem atque ratione odio ipsam quam sint. Vero
          officia numquam porro veniam voluptas esse exercitationem nostrum
          accusantium alias eveniet! Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Repellat, architecto nihil quidem atque ratione odio
          ipsam quam sint. Vero officia numquam porro veniam voluptas esse
          exercitationem nostrum accusantium alias eveniet! Lorem ipsum dolor
          sit amet consectetur, adipisicing elit. Repellat, architecto nihil
          quidem atque ratione odio ipsam quam sint. Vero officia numquam porro
          veniam voluptas esse exercitationem nostrum accusantium alias eveniet!
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat,
          architecto nihil quidem atque ratione odio ipsam quam sint. Vero
          officia numquam porro veniam voluptas esse exercitationem nostrum
          accusantium alias eveniet!
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ color: "red" }}
            // data-bs-dismiss="modal"
            onClick={onClose}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}
