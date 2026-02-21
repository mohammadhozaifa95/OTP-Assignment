import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Alert
} from "reactstrap";

const OtpSelect = () => {
  const [digits, setDigits] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState(false);
  const navigate = useNavigate();

  const handleDigitSelect = (digitValue) => {
    setDigits(digitValue);
    setSelectedAnimation(true);
    setTimeout(() => setSelectedAnimation(false), 300);
  };

  const handleGenerate = () => {
    if (!digits) {
      toast.error("Please select OTP length", {
        position: "top-center",
        theme: "colored"
      });
      return;
    }

    setIsGenerating(true);
    
    toast.success(`Generating ${digits}-digit OTP...`, {
      position: "top-center",
      theme: "colored"
    });

    setTimeout(() => {
      setIsGenerating(false);
      navigate("/otp", { state: { digits } });
    }, 600);
  };

  // Inline styles
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    },
    mainCard: {
      maxWidth: "500px",
      width: "100%",
      borderRadius: "20px",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
      border: "none",
      overflow: "hidden"
    },
    header: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "30px",
      textAlign: "center",
      color: "white"
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "10px"
    },
    subtitle: {
      opacity: 0.9,
      fontSize: "1rem"
    },
    content: {
      padding: "30px"
    },
    sectionTitle: {
      color: "#333",
      fontWeight: "600",
      marginBottom: "5px",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    },
    sectionSubtitle: {
      color: "#6c757d",
      fontSize: "0.9rem",
      marginBottom: "25px"
    },
    digitOption: {
      border: "2px solid #e0e0e0",
      borderRadius: "15px",
      padding: "20px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
      height: "100%",
      background: "white"
    },
    digitOptionSelected: {
      border: "2px solid #667eea",
      background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
      transform: selectedAnimation ? "scale(1.05)" : "scale(1)",
      boxShadow: "0 8px 20px rgba(102, 126, 234, 0.2)"
    },
    digitIcon: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#667eea",
      marginBottom: "10px"
    },
    digitLabel: {
      fontWeight: "600",
      marginBottom: "5px",
      color: "#333"
    },
    digitDesc: {
      fontSize: "0.85rem",
      color: "#6c757d",
      margin: 0
    },
    infoAlert: {
      borderRadius: "12px",
      background: "linear-gradient(135deg, #f8f9ff, #eef1ff)",
      border: "1px solid rgba(102, 126, 234, 0.2)",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      padding: "15px"
    },
    infoIcon: {
      fontSize: "1.5rem",
      color: "#667eea"
    },
    generateButton: {
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      border: "none",
      borderRadius: "12px",
      padding: "15px",
      fontSize: "1.1rem",
      fontWeight: "600",
      width: "100%",
      transition: "all 0.3s ease"
    },
    generateButtonDisabled: {
      background: "#cccccc",
      cursor: "not-allowed"
    },
    generateButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)"
    },
    loadingSpinner: {
      width: "20px",
      height: "20px",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      borderTop: "2px solid white",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
      marginRight: "10px"
    },
    selectedBadge: {
      position: "absolute",
      top: "-10px",
      right: "-10px",
      width: "25px",
      height: "25px",
      background: "#4CAF50",
      color: "white",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: "bold",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.mainCard}>
        {/* Header Section */}
        <div style={styles.header}>
          <CardTitle tag="h1" style={styles.title}>
            OTP Generator
          </CardTitle>
          <p style={styles.subtitle}>
            Generate a time-bound one-time password
          </p>
        </div>

        <CardBody style={styles.content}>
          {/* OTP Length Selection */}
          <div style={{ marginBottom: "30px" }}>
            <h5 style={styles.sectionTitle}>
              <span>📏</span>
              OTP LENGTH
            </h5>
            <p style={styles.sectionSubtitle}>Select your preferred length</p>

            <Row className="g-3">
              <Col md={6}>
                <div
                  style={{
                    ...styles.digitOption,
                    ...(digits === "3" ? styles.digitOptionSelected : {}),
                    ...(digits === "3" ? { transform: "scale(1.02)" } : {})
                  }}
                  onClick={() => handleDigitSelect("3")}
                  onMouseEnter={(e) => {
                    if (digits !== "3") {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (digits !== "3") {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  {digits === "3" && (
                    <div style={styles.selectedBadge}>✓</div>
                  )}
                  <div style={styles.digitIcon}>3</div>
                  <h6 style={styles.digitLabel}>3 Digit OTP</h6>
                  <p style={styles.digitDesc}>Quick & Simple</p>
                </div>
              </Col>

              <Col md={6}>
                <div
                  style={{
                    ...styles.digitOption,
                    ...(digits === "6" ? styles.digitOptionSelected : {}),
                    ...(digits === "6" ? { transform: "scale(1.02)" } : {})
                  }}
                  onClick={() => handleDigitSelect("6")}
                  onMouseEnter={(e) => {
                    if (digits !== "6") {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (digits !== "6") {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  {digits === "6" && (
                    <div style={styles.selectedBadge}>✓</div>
                  )}
                  <div style={styles.digitIcon}>6</div>
                  <h6 style={styles.digitLabel}>6 Digit OTP</h6>
                  <p style={styles.digitDesc}>Highly Secure</p>
                </div>
              </Col>
            </Row>
          </div>

          {/* Info Section */}
          <Alert style={styles.infoAlert} color="primary">
            <div style={styles.infoIcon}>⏱️</div>
            <div>
              <h6 className="mb-1" style={{ color: "#333" }}>
                30 Second Expiry
              </h6>
              <p className="mb-0" style={{ color: "#666", fontSize: "0.9rem" }}>
                Generated OTP will automatically expire after <strong>30 seconds</strong>
              </p>
            </div>
          </Alert>

          {/* Generate Button */}
          <FormGroup className="mt-4">
            <Button
              color="primary"
              size="lg"
              block
              disabled={!digits || isGenerating}
              onClick={handleGenerate}
              style={{
                ...styles.generateButton,
                ...(!digits || isGenerating ? styles.generateButtonDisabled : {}),
                ...(isGenerating ? { background: "linear-gradient(135deg, #4CAF50, #2E7D32)" } : {})
              }}
              onMouseEnter={(e) => {
                if (digits && !isGenerating) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(102, 126, 234, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (digits && !isGenerating) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {isGenerating ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={styles.loadingSpinner}></div>
                  <span>Generating...</span>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ marginRight: "8px" }}>⚡</span>
                  <span>Generate OTP</span>
                </div>
              )}
            </Button>
          </FormGroup>

          {/* Helper Text */}
          <p
            className="text-center mt-3"
            style={{
              color: digits ? "#28a745" : "#6c757d",
              fontSize: "0.9rem",
              transition: "all 0.3s ease"
            }}
          >
            {!digits
              ? "Select digits to enable generation"
              : "Ready to generate secure OTP!"}
          </p>
        </CardBody>
      </Card>

      {/* Add keyframes for spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default OtpSelect;