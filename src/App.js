import { BrowserRouter, Routes, Route } from "react-router-dom";
import OtpSelect from "./page/OtpSelect";
import OtpDisplay from "./page/OtpDisplay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OtpSelect />} />
        <Route path="/otp" element={<OtpDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
