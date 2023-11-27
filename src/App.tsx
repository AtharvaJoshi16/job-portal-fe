import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import {
  Home,
  Jobs,
  Layout,
  Profile,
  Register,
  ResetPassword,
} from "./components";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { onSubmit, onVerify } from "./components/Register/utils";
import { onLogin } from "./components/Login/utils";
import Login from "./components/Login";
import { onResetPassword } from "./components/ResetPassword/utils";
import { onEdit } from "./components/Profile/utils";
import JobDetail from "./components/JobDetail/JobDetail";
import "./App.scss";
import TrackStatus from "./components/TrackStatus/TrackStatus";
import { TrackerMockData } from "./components/TrackStatus/TrackStatus.mock";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <TrackStatus
              status={TrackerMockData.status}
              appliedDate={TrackerMockData.appliedDate}
            />
          }
        />
        <Route
          path="/register"
          element={<Register onVerify={onVerify} onSubmit={onSubmit} />}
        />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route
          path="/reset-password"
          element={<ResetPassword onResetPassword={onResetPassword} />}
        />
        <Route
          path="/profile/:id"
          element={
            <Layout>
              <Profile onEdit={onEdit} />
            </Layout>
          }
        />
        <Route
          path="/jobs"
          element={
            <Layout>
              <Jobs />
            </Layout>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <Layout>
              <JobDetail />
            </Layout>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <Layout>
              <Jobs bookmark />
            </Layout>
          }
        />
        <Route
          path="/applies"
          element={
            <Layout>
              <Jobs applies />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Jobs />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
