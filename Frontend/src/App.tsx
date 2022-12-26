import "./App.css";
import AppRoutes from "./AppRoutes";
import Create from "./components/create/Create";
import Navbar from "./components/navbar/Navbar";
import Search from "./components/search/Search";

function App() {
  return (
    <>
      <Search/>
      <Navbar />
      <Create />
      <AppRoutes />
    </>
  );
}

export default App;
