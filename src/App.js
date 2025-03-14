import { BrowserRouter, Routes, Route } from "react-router-dom";
import Photobooth from "./component/Cam";
import HomePage from "./pages/HomePage";
import KebijakanPrivasiPage from "./pages/KebijakanPrivasiPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kebijakan-privasi" element={<KebijakanPrivasiPage />} />
          <Route path="/photobooth" element={<Photobooth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
