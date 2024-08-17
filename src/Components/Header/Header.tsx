import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="location-weather">Location & Weather</div>
            <div className="time-date">Time & Date</div>
            <div className="settings-icon">Settings</div>
        </header>
    );
};

export default Header;
