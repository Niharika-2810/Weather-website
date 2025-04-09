import React, { useState,useEffect } from 'react'
import Weather from './components/Weather'

const App = () => {

  const [theme, setTheme] = useState('light-theme');
  const toggleTheme = () => {
    if(theme === 'light-theme'){
      setTheme('dark-theme');
    }
    else{
      setTheme('light-theme');
    }
  };

  useEffect(() => {
    document.body.className = theme;
  },[theme]);

  return (
      <div className="weather-app">
        <div className="toggle-container">
          <button className="btn" onClick={toggleTheme}>
            {theme === 'light-theme' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
        
        <Weather />
      </div>
    );
}

export default App

