import "./App.css";
import { Route, Routes, Router } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import MothersPage from "./views/MothersPage";
import ListPage from "./views/ListPage";
import RegisterMom from "./views/RegisterMom";
import RegisterAdmin from "./views/RegisterAdmin";
import RegisterPregnancy from "./views/RegisterPregnancy";
import MapMarkers from "./views/MapMarkers";
import Modal from "./components/Modal/Modal";
import CreatePregnancyData from "./views/CreatePregnancyData";
import InputBabyData from "./views/EditPregnancyData";
import Login from "./views/Login/Login";
import MainPage from "./views/MainPage";
import CreateBabyData from "./views/CreateBabyData";
import EditBabyData from "./views/EditBabyData";
import EditPregnancyData from "./views/EditPregnancyData";
import NavigationGuard from "./views/navguard/NavigationGuard";
import NavigationGuardLogin from "./views/navguard/NavigationGuardLogin";

function App() {
  return (
    <div className="App" style={{ margin: 0, padding: 0 }}>
      <Routes>
        <Route
          path="/"
          element={
            <NavigationGuard>
              <MainPage />
            </NavigationGuard>
          }
        />
        <Route
          path="/dashboard"
          element={
            <NavigationGuard>
              <Dashboard />
            </NavigationGuard>
          }
        />
        <Route
          path="/login"
          element={
            <NavigationGuardLogin>
              <Login />
            </NavigationGuardLogin>
          }
        />
        <Route
          path="/rt/:id"
          element={
            <NavigationGuard>
              <ListPage />
            </NavigationGuard>
          }
        />
        <Route
          path="/mothers/:id"
          element={
            <NavigationGuard>
              <MothersPage />
            </NavigationGuard>
          }
        />

        <Route
          path="/register-admin"
          element={
            <NavigationGuard>
              <RegisterAdmin />
            </NavigationGuard>
          }
        />
        <Route
          path="/register-mom"
          element={
            <NavigationGuard>
              <RegisterMom />
            </NavigationGuard>
          }
        />
        <Route
          path="/register-pregnancy"
          element={
            <NavigationGuard>
              <RegisterPregnancy />
            </NavigationGuard>
          }
        />

        <Route
          path="/create-preg-data"
          element={
            <NavigationGuard>
              <CreatePregnancyData />
            </NavigationGuard>
          }
        />
        <Route
          path="/create-baby-data"
          element={
            <NavigationGuard>
              <CreateBabyData />
            </NavigationGuard>
          }
        />

        <Route
          path="/edit-pregnancy-data/:PregnancyDataId"
          element={
            <NavigationGuard>
              <EditPregnancyData />
            </NavigationGuard>
          }
        />
        <Route
          path="/edit-baby-data/:BabyDataId"
          element={
            <NavigationGuard>
              <EditBabyData />
            </NavigationGuard>
          }
        />

        <Route
          path="/map-markers"
          element={
            <NavigationGuard>
              <MapMarkers />
            </NavigationGuard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
