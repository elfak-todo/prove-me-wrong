import './App.css';
import AppRoutes from './AppRoutes';
import AxiosConfig from './components/axiosConfig/AxiosConfig';
import Navbar from './components/navbar/Navbar';
import { UserManager } from './components/userManager/UserManager';

function App() {
  return (
    <UserManager>
      <AxiosConfig />
      <Navbar />
      <AppRoutes />
    </UserManager>
  );
}

export default App;
