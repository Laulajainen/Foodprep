import { useState, useEffect } from 'react';
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
                const response = await fetch(`https://localhost:7055/api/Days/${currentWeek}`);
                const data = await response.json();
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  }}>
            <button onClick={handlePreviousWeek}>&lt;</button>
            <span style={{ margin: '0 20px', color:"#794d79", }}>Week {currentWeek}</span>
            <button onClick={handleNextWeek}>&gt;</button>
        </div>
    );
};

WeekNavigator.propTypes = {
    onWeekChange: PropTypes.func.isRequired,
    onDaysChange: PropTypes.func.isRequired,
};

export default WeekNavigator;