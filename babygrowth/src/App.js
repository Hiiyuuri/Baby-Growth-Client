import Login from "./views/Login";
import MainPage from './views/MainPage'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
  <Routes>
     <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
  </Routes>
  );
}

export default App;
