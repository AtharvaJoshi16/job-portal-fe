import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import {
  Home,
  Jobs,
  Layout,
  PostJob,
  Profile,
  Register,
  ResetPassword,
} from "./customs";
import { onSubmit, onVerify } from "./customs/Register/utils";
import { onLogin } from "./customs/Login/utils";
import Login from "./customs/Login";
import { onResetPassword } from "./customs/ResetPassword/utils";
import { onEdit } from "./customs/Profile/utils";
import JobDetail from "./customs/JobDetail/JobDetail";
import "./App.scss";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <div>Hello</div>
            </Layout>
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
              <Profile />
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
        <Route
          path="/post-job"
          element={
            <Layout>
              <PostJob />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
