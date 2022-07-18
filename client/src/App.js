// import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Router } from "react-router-dom";
// import PieChart from "./components/PieChart";
// import BarChart from "./components/BarChart";
import Dashboard from "./views/Dashboard";
import MothersPage from "./views/MothersPage";
import ListPage from "./views/ListPage";
import Login from './views/Login/Login';
import MainPage from "./views/MainPage";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/rt/:id" element={<ListPage />} />
        <Route path="/mothers/:id" element={<MothersPage />} />
      </Routes>
    </div>
  );
}

export default App;
