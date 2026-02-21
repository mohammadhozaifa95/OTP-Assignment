import React, { useEffect } from "react";
import { toast } from "react-toastify";

const CircularTimer = ({ time }) => {
  const TOTAL_TIME = 30;
  
  // Calculate progress percentage (0 to 1)
  const progress = time / TOTAL_TIME;
  
  // SVG calculations
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress * circumference);

  // Color based on time
  const getColor = () => {
    if (time > 20) return "#4CAF50"; // Green
    if (time > 10) return "#FF9800"; // Orange
    return "#F44336"; // Red
  };

  useEffect(() => {
    if (time === 5) {
      toast.warn("OTP expiring soon ⏳");
    }
  }, [time]);

  return (
    <div style={styles.container}>
      <div style={styles.timerWrapper}>
        {/* SVG Circular Timer */}
        <svg width="120" height="120" style={styles.svg}>
          {/* Background Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#e0e0e0"
            strokeWidth="10"
            fill="transparent"
          />
          
          {/* Progress Circle - FIXED */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke={getColor()}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            style={{
              transition: "stroke-dashoffset 1s linear"
            }}
          />
        </svg>
        
        {/* Time Display */}
        <div style={styles.timeDisplay}>
          <div style={styles.timeNumber}>{time}</div>
          <div style={styles.timeUnit}>s</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0"
  },
  timerWrapper: {
    position: "relative",
    width: "120px",
    height: "120px"
  },
  svg: {
    transform: "rotate(0deg)"
  },
  timeDisplay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    display: "flex",
    alignItems: "baseline",
    gap: "2px"
  },
  timeNumber: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    lineHeight: 1
  },
  timeUnit: {
    fontSize: "14px",
    color: "#666"
  }
};

export default CircularTimer;