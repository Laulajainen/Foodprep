import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const WeekNavigator = ({ onWeekChange, onDaysChange }) => {
    const [currentWeek, setCurrentWeek] = useState(0);

    const handlePreviousWeek = () => {
        setCurrentWeek(prevWeek => prevWeek - 1);
    };

    const handleNextWeek = () => {
        setCurrentWeek(prevWeek => prevWeek + 1);
    };

    useEffect(() => {
        const getCurrentWeek = () => {
            const now = new Date();
            const start = new Date(now.getFullYear(), 0, 1);
            const diff = now - start + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
            const oneWeek = 1000 * 60 * 60 * 24 * 7;
            const week = Math.floor(diff / oneWeek);
            return week;
        };

        const initialWeek = getCurrentWeek();
        setCurrentWeek(initialWeek);
        onWeekChange(initialWeek);
    }, [onWeekChange]);

    useEffect(() => {
        onWeekChange(currentWeek);
    }, [currentWeek, onWeekChange]);

    useEffect(() => {
        const fetchDays = async () => {
            try {
                console.log(`Fetching days for week: ${currentWeek}`);
                // change the ip adress to your local ipv4 adress
                const ip = "192.168.0.15"
                const response = await fetch(`http://${ip}:7055/api/Days/${currentWeek}`);
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched days data:', data);
                onDaysChange(data);
            } catch (error) {
                console.error('Error fetching days:', error);
            }
        };

        if (currentWeek > 0) {
            fetchDays();
        }
    }, [currentWeek, onDaysChange]);

    return (
        <View style={styles.container}>
            <Button title="&lt;" onPress={handlePreviousWeek} />
            <Text style={styles.text}>Week {currentWeek}</Text>
            <Button title="&gt;" onPress={handleNextWeek} />
        </View>
    );
};

WeekNavigator.propTypes = {
    onWeekChange: PropTypes.func.isRequired,
    onDaysChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginHorizontal: 20,
    },
});

export default WeekNavigator;