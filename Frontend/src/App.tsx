import './App.css';
import AppRoutes from './AppRoutes';
import AxiosConfig from './components/axiosConfig/AxiosConfig';
import Navbar from './components/navbar/Navbar';
import Search from './components/search/Search';
import { UserManager } from './components/userManager/UserManager';
//import './services/chat.service';

function App() {
  return (
    <UserManager>
      <AxiosConfig />
      <Search />
      <Navbar />
      <AppRoutes />
    </UserManager>
  );
}

export default App;
