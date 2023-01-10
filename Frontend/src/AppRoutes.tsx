import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserContext from './components/userManager/UserManager';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';
import RegisterPage from './pages/register/RegisterPage';
import TopicPage from './pages/topic/TopicPage';

function AppRoutes() {
  const { user } = useContext(UserContext);

  return user ? (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/topic/:topicId" element={<TopicPage />} />
      <Route path="*" element={<Navigate replace to="/home" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
