import Login from "./views/Login";
import MainPage from './views/MainPage'
import { Routes, Route } from "react-router-dom";
import RegisterMom from "./views/RegisterMom";
import RegisterAdmin from "./views/RegisterAdmin";
import RegisterPregnancy from "./views/RegisterPregnancy";
import InputPregData from "./views/InputPregData";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-mom" element={<RegisterMom />} />
      <Route path="/register-admin" element={<RegisterAdmin />} />
      <Route path="/register-pregnancy/:motherId" element={<RegisterPregnancy />} />
      <Route path="/input-preg-data/:PregnancyId" element={<InputPregData />} />
    </Routes>
  );
}

export default App;
