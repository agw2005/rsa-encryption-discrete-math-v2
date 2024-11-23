// import Sandbox from "./components/sandbox/Sandbox.tsx";
import Snooper from "./components/snooper/Snooper.tsx";
import UserOne from "./components/userOne/UserOne.tsx";
import LoginPage from "./components/login/LoginPage.tsx";
import ProductManagerPage from './components/User/productManager/ProductManagerPage'; // Import the page
import SeniorDeveloperPage from './components/User/seniorDeveloper/SeniorDeveloperPage'; // Import the page
import JuniorDeveloperPage from './components/User/juniorDeveloper/juniorDeveloperPage'; // Import the page

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/user_one" element={<UserOne />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product_manager" element={<ProductManagerPage />} />
        <Route path="/senior_developer" element={<SeniorDeveloperPage />} />
        <Route path="/junior_developer" element={<JuniorDeveloperPage />} />
          <Route path="/snooper" element={<Snooper></Snooper>} />
        </Routes>
      </BrowserRouter>
      {/* <Snooper></Snooper>*/}
    </>
  );
}

export default App;
