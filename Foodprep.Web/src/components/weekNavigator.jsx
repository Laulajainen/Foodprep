import React, { useState, useEffect } from 'react';

const WeekNavigator = () => {
    const [currentWeek, setCurrentWeek] = useState(0);

    const handlePreviousWeek = () => {
        setCurrentWeek(currentWeek - 1);
    };

    const handleNextWeek = () => {
        setCurrentWeek(currentWeek + 1);
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

    setCurrentWeek(getCurrentWeek());
}, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button onClick={handlePreviousWeek}>&lt;</button>
            <span style={{ margin: '0 20px' }}>Week {currentWeek}</span>
            <button onClick={handleNextWeek}>&gt;</button>
        </div>
    );
    
};

export default WeekNavigator;