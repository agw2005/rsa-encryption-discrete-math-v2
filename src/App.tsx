// import Sandbox from "./components/sandbox/Sandbox.tsx";
import Snooper from "./components/snooper/Snooper.tsx";
import UserOne from "./components/userOne/UserOne.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<UserOne />} />
          <Route path="/user_one" element={<UserOne />} />
          <Route path="/snooper" element={<Snooper></Snooper>} />
        </Routes>
      </BrowserRouter>
      {/* <Snooper></Snooper>*/}
    </>
  );
}

export default App;
