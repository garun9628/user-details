import React from "react";
import Form from "./components/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IFrameParent } from "./components/IFrameParent";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<IFrameParent />} />
          <Route exact path="/iframe" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
