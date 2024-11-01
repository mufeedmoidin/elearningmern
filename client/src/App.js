import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Modules/admin/component/Nav/Navigation";
import AdminRoute from "./Modules/admin/Route/AdminRoute";
import UserRouter from "./Modules/user/Route/UserRouter";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/admin/*" element={<AdminRoute />}/>
          <Route exact path="/*" element={<UserRouter />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
