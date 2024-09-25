export default function WeeklyDay() {
  return (
    <div>
      <Day />
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

function DayButton({ day }) {
  return <button style={styles.dayButton}>{day}</button>;
}

function Day() {
  return (
    <div>
      <ul style={styles.days}>
        {days.map((day) => (
          <DayButton key={day} day={day} />
        ))}
      </ul>
    </div>
  );
}
