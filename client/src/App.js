// import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Router } from "react-router-dom";
// import PieChart from "./components/PieChart";
// import BarChart from "./components/BarChart";
import Dashboard from "./views/Dashboard";
import MothersPage from "./views/MothersPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mothers/:id" element={<MothersPage />} />
      </Routes>
    </div>
  );
}

export default App;
