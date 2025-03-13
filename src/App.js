import { BrowserRouter, Routes, Route } from "react-router-dom";
import Photobooth from "./component/Cam";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Photobooth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
