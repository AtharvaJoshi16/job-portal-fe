import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Home, Profile, Register, ResetPassword } from "./components";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { onSubmit, onVerify } from "./components/Register/utils";
import { onLogin } from "./components/Login/utils";
import Login from "./components/Login";
import { onResetPassword } from "./components/ResetPassword/utils";
import { onEdit } from "./components/Profile/utils";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<Register onVerify={onVerify} onSubmit={onSubmit} />}
        />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route
          path="/reset-password"
          element={<ResetPassword onResetPassword={onResetPassword} />}
        />
        <Route path="/profile/:id" element={<Profile onEdit={onEdit} />} />
      </Routes>
    </BrowserRouter>
  );
}
