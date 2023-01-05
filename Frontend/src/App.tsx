import './App.css';
import AppRoutes from './AppRoutes';
import AxiosConfig from './components/axiosConfig/AxiosConfig';
import Create from './components/create/Create';
import Navbar from './components/navbar/Navbar';
import Search from './components/search/Search';
import { UserManager } from './components/userManager/UserManager';

function App() {
  return (
    <UserManager>
      <AxiosConfig />
      <Search />
      <Navbar />
      <Create />
      <AppRoutes />
    </UserManager>
  );
}

export default App;
