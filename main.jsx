import { Routes, Route } from "react-router-dom";
import Ledgers from "./Ledgers";
import App from "./App";

function Main() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/ledgers" element={<Ledgers />} />
    </Routes>
  );
}

export default Main;
