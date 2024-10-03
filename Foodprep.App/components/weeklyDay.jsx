import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import WeekNavigator from './weekNavigator';

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
  const [modalVisible, setModalVisible] = useState(false); // track modal visibility

  const handleWeekChange = useCallback((week) => {
    setCurrentWeek(week);
  }, []);

  const handleDaysChange = useCallback((days) => {
    setWeekDays(days);
  }, []);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <WeekNavigator onWeekChange={handleWeekChange} onDaysChange={handleDaysChange} />
      {/* Render the list of days */}
      <Day setSelectedDay={handleDayClick} />
      {/* Render the modal with details of selected day */}
      <DayModal day={selectedDay} visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  days: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  dayButton: {
    margin: 20,
    width: 200,
    borderRadius: 5,
    backgroundColor: '#84cc16',
    fontSize: 24,
    padding: 10,
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalTitle: {
    fontSize: 24,
  },
  modalBody: {
    marginVertical: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

// Component for each day, which triggers modal on click
function DayButton({ day, setSelectedDay }) {
  return (
    <TouchableOpacity
      style={styles.dayButton}
      onPress={() => setSelectedDay(day)}
    >
      <Text style={{ color: 'white', fontSize: 24 }}>{day}</Text>
    </TouchableOpacity>
  );
}

// Render list of days as buttons
function Day({ setSelectedDay }) {
  return (
    <View style={styles.days}>
      {days.map((day) => (
        <DayButton key={day} day={day} setSelectedDay={setSelectedDay} />
      ))}
    </View>
  );
}

// Modal that shows the day's details
function DayModal({ day, visible, onClose }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{day}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
        <View style={styles.modalBody}>
          <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ex temporibus nam laborum voluptatibus, soluta repudiandae doloremque, nobis recusandae tenetur, omnis cumque deserunt nesciunt illum enim. Et vel distinctio omnis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ex temporibus nam laborum voluptatibus, soluta repudiandae doloremque, nobis recusandae tenetur, omnis cumque deserunt nesciunt illum enim. Et</Text>
        </View>
        <View style={styles.modalFooter}>
          <Button title="Save" onPress={() => {}} />
          <Button title="Discard" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}