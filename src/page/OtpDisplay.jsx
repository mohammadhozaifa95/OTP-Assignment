import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardBody, Button } from "reactstrap";
import { generateOtp } from "../component/OtpService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

const OtpDisplay = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const digits = Number(state?.digits);

  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(30);
  const [isExpiring, setIsExpiring] = useState(false);
  const [glow, setGlow] = useState(false);

  const fetchOtp = useCallback(async (showToast) => {
    try {
      const res = await generateOtp(digits);
      setOtp(res.data.otp);
      setTime(30);
      setGlow(true);
      setTimeout(() => setGlow(false), 1000);

      if (showToast) toast.success("🔄 New OTP Generated!", { position: "top-right", autoClose: 2000, theme: "colored" });
    } catch {
      toast.error("❌ Server not reachable", { position: "top-right", autoClose: 3000, theme: "colored" });
    }
  }, [digits]);

  useEffect(() => {
    if (!digits) { navigate("/"); return; }
    fetchOtp(false);
  }, [digits, fetchOtp, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          setIsExpiring(true);
          setTimeout(() => setIsExpiring(false), 1000);
          fetchOtp(true);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [fetchOtp]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (time / 30) * circumference;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(otp);
    toast.success("📋 OTP Copied!", { position: "top-right", autoClose: 1500, theme: "colored" });
  };

  const goBack = () => navigate("/");

  return (
    <div className="container">
      <div className="background">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
      </div>

      <div className="mainCard">
        <div className="header">
          <div className={`logo ${glow ? "logo-glow" : ""}`}>🔐</div>
          <h1 className="title">Secure OTP</h1>
          <p className="subtitle">{digits}-digit One Time Password</p>
        </div>

        <CardBody className="cardBody">
          {/* OTP Box */}
          <div className={`otpContainer ${isExpiring ? "shake" : ""}`}>
            <div className="otpDigitsContainer">
              {otp ? otp.split("").map((digit, idx) => (
                <div key={idx} className={`otpDigit ${glow ? "digit-glow" : ""}`}>{digit}</div>
              )) : <div className="loadingText">Generating...</div>}
            </div>
          </div>

          {/* Circular Timer */}
          <div className="timerContainer">
            <div className="timerWrapper">
              <svg width="120" height="120">
                {/* Background circle */}
                <circle cx="60" cy="60" r={radius} stroke="#e0e0e0" strokeWidth="10" fill="#fff"/>
                {/* Progress circle */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke={time > 20 ? "#4CAF50" : time > 10 ? "#FF9800" : "#F44336"}
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                  style={{ transition: "stroke-dashoffset 1s linear, stroke 1s ease" }}
                />
              </svg>
              <div className="timerText">
                <span className="timeNumber">{time}</span><span className="timeUnit">s</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="infoSection">
            <div className="infoCard">
              <div className="infoIcon">⏱️</div>
              <div>
                <h6 className="infoTitle">Auto Refresh</h6>
                <p className="infoText">OTP regenerates in <strong>{time} seconds</strong></p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="buttonContainer">
            <Button className="secondaryButton" onClick={copyToClipboard}>📋 Copy OTP</Button>
            <Button className="primaryButton" onClick={goBack}>↩️ Back</Button>
          </div>
        </CardBody>

        <div className="footer"><small className="footerText">Secure • Time-Bound • Auto-Refreshing</small></div>
      </div>
    </div>
  );
};

export default OtpDisplay;
