import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Devices from "./components/Devices";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<Devices />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
