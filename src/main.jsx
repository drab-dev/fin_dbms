import { Routes, Route } from "react-router-dom";
import Ledgers from "../Ledgers";
import App from "./App";
import Debtors from "./Debtors.jsx";
import Creditors from "../Creditors.jsx";

function Main() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/ledgers" element={<Ledgers />} />
      <Route path="/debtors" element={<Debtors />} />
      <Route path="/creditors" element={<Creditors />} />
    </Routes>
  );
}

export default Main;
