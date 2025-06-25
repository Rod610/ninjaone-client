import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Devices from "./components/Devices";
import ErrorBoundary from "./components/ErrorBoundary";
import Navigation from "./components/Navigation";
import NotFound from "./components/NotFound";

function App() {
  return (
    <ErrorBoundary>
      <div>
        <Navigation />
        <Router>
          <Routes>
            <Route path="/" element={<Devices />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;
