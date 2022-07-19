// import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Router } from "react-router-dom";
// import PieChart from "./components/PieChart";
// import BarChart from "./components/BarChart";
import Dashboard from "./views/Dashboard";
import MothersPage from "./views/MothersPage";
import ListPage from "./views/ListPage";
import RegisterMom from "./views/RegisterMom";
import RegisterAdmin from "./views/RegisterAdmin";
import RegisterPregnancy from "./views/RegisterPregnancy";
// import InputPregData from "./views/CreatePregnancyData";
import MapMarkers from "./views/MapMarkers";
import Modal from "./components/Modal/Modal"
import CreatePregnancyData from "./views/CreatePregnancyData";
import InputBabyData from "./views/EditPregnancyData";
import Login from './views/Login/Login';
import MainPage from "./views/MainPage";
import CreateBabyData from "./views/CreateBabyData";
// import InputPregnancyData from "./views/EditBabyData";
import EditBabyData from "./views/EditBabyData";
import EditPregnancyData from "./views/EditPregnancyData";

function App() {
  return (
    <div className="App">

      <Routes>
      <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/rt/:id" element={<ListPage />} />
        <Route path="/mothers/:id" element={<MothersPage />} />
        <Route path="/register-mom" element={<RegisterMom />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />
        {/* <Route path="/register-pregnancy/:motherId" element={<RegisterPregnancy />} /> */}
        <Route path="/register-pregnancy" element={<RegisterPregnancy />} />
        {/* <Route path="/input-preg-data/:PregnancyId" element={<InputPregData />} /> */}


        <Route path="/create-preg-data" element={<CreatePregnancyData />} />
        <Route path="/create-baby-data" element={<CreateBabyData />} />


        <Route path="/edit-pregnancy-data/:PregnancyDataId" element={<EditPregnancyData />} />
        <Route path="/edit-baby-data/:BabyDataId" element={<EditBabyData />} />
        <Route path="/map-markers" element={<MapMarkers />} />



      </Routes>
    </div>
  );
}

export default App;
