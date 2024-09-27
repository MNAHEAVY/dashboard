import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Dashboard from "./dashboard/Dashboard";
import ProdEdit from "./dashboard/EditProd";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route exact path='/edit/:id' element={<ProdEdit />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
