import { useState, useEffect,useRef } from 'react';
import './App.css';
import ControlElement from './appComponents/ControlButtonComponent';
import MyLengthComponent from './appComponents/LengthComponent';
import MyDisplay from './appComponents/TimerDisplay';
import beep from '../src/sounds/timer.mp3'

function App() {
  const initialSessionLength = 25;
  const initialBreakLength = 5;

  const [sessionLength, setSessionLength] = useState(initialSessionLength);
  const [breakLength, setBreakLength] = useState(initialBreakLength);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [timeLeft, setTimeLeft] = useState(initialSessionLength * 60); // Time left in seconds

const myAudio = useRef(null);

  useEffect(() => {
    setTimeLeft(sessionLength * 60); // Update timeLeft when sessionLength changes
  }, [sessionLength]);

  useEffect(() => {
    let timer = null;
  
    if (isRunning) {
      if (timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        // Wait for 1 second at 00:00 before switching to the next phase
        timer = setTimeout(() => {
          if (isSession) {
            myAudio.current.play();
            setTimeLeft(breakLength * 60);
            setIsSession(false); // Switch to break
          } else {
            setTimeLeft(sessionLength * 60);
            setIsSession(true); // Switch to session
          }
        }, 1000); // Wait for 1 second before resetting
      }
    }
  
    return () => {
      clearInterval(timer);
      clearTimeout(timer);
    };
  }, [isRunning, timeLeft, isSession, breakLength, sessionLength]);
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleTimer = () => {
    setIsRunning(prevRunning => !prevRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsSession(true);
    setSessionLength(initialSessionLength);
    setBreakLength(initialBreakLength);
    setTimeLeft(initialSessionLength * 60);
    myAudio.current.pause();
    myAudio.current.currentTime=0;
  };

  const handleBreakIncrement = () => {
    if ((!isRunning)&&breakLength < 60) {
      setBreakLength(prev => prev + 1);
    }
  };

  const handleBreakDecrement = () => {
    if ((!isRunning)&&breakLength > 1) {
      setBreakLength(prev => prev - 1);
    }
  };

  const handleSessionIncrement = () => {
    if ((!isRunning)&&sessionLength < 60) {
      setSessionLength(prev => prev + 1);
    }
  };

  const handleSessionDecrement = () => {
    if ((!isRunning)&&sessionLength > 1) {
      setSessionLength(prev => prev - 1);
    }
  };

  return (
    <div className="App">
      <MyLengthComponent  
        breakL={breakLength}
        sessionL={sessionLength}
        onBreakIncrement={handleBreakIncrement}
        onBreakDecrement={handleBreakDecrement}
        onSessionIncrement={handleSessionIncrement}
        onSessionDecrement={handleSessionDecrement}
      />
      <MyDisplay 
        timeLeft={formatTime(timeLeft)}
        label={isSession ? "Session" : "Break"}
      />
      <ControlElement 
        onStartStop={toggleTimer} 
        onReset={resetTimer} 
        isRunning={isRunning} 
      />
      <audio id="beep" ref={myAudio} src={beep} preload="auto" />
      <p>
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          href="https://www.linkedin.com/in/kelvin-kipkorir-a89a651b8" 
          style={{ textDecoration: 'none', color: '#555' }}
        >
          By KKipkorir
        </a>
      </p>
    </div>
  );
}

export default App;
