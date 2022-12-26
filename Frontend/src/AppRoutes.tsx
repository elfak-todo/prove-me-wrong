import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/home/HomePage";
// import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
// import RegisterPage from "./pages/register/RegisterPage";

function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} /> */}
      {/* <Route path="/profile" element={<ProfilePage />} /> */}
      <Route path="/" element={<ProfilePage />}/>
    </Routes>
  );
}

export default AppRoutes;
