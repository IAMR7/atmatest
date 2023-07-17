import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegisterPage from "./pages/Register/RegisterPage";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileEditPage from "./pages/Profile/ProfileEdit/ProfileEditPage";
import PasswordEditPage from "./pages/PasswordEdit/PasswordEditPage";
import NotFoundPage from "./pages/Error/NotFoundPage";
import SearchPage from "./pages/Search/SearchPage";
import MePage from "./pages/Me/MePage";
import NotificationsPage from "./pages/Notification/NotificationsPage";
import FriendPage from "./pages/Friend/FriendPage";
import VerifiedPage from "./pages/Verified/VerifiedPage";
import TicketPage from "./pages/Ticket/TicketPage";
import { useSelector } from "react-redux";
import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/Admin/Dashboard/DashboardPage";
import UserPage from "./pages/Admin/User/UserPage";
import PostPage from "./pages/Admin/Post/PostPage";
import RequestVerified from "./pages/Admin/RequestVerified/RequestVerifiedPage";
import RequestTicketsPage from "./pages/Admin/RequestTicket/RequestTicketsPage";
import MajorPage from "./pages/Admin/Major/MajorPage";
import StatusPage from "./pages/Admin/Status/StatusPage";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/error/404" element={<NotFoundPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            user && user.role.level === 2 ? <HomePage /> : <NotFoundPage />
          }
        />
        <Route
          path="/search"
          element={
            user && user.role.level === 2 ? <SearchPage /> : <NotFoundPage />
          }
        />
        <Route
          path="/notifications"
          element={
            user && user.role.level === 2 ? (
              <NotificationsPage />
            ) : (
              <NotFoundPage />
            )
          }
        />
        <Route
          path="/me"
          element={
            user && user.role.level === 2 ? <MePage /> : <NotFoundPage />
          }
        />
        <Route
          path="/profile"
          element={
            user && user.role.level === 2 ? <ProfilePage /> : <NotFoundPage />
          }
        />
        <Route
          path="/friend/:id"
          element={
            user && user.role.level === 2 ? <FriendPage /> : <NotFoundPage />
          }
        />
        <Route
          path="/profile/edit"
          element={
            user && user.role.level === 2 ? (
              <ProfileEditPage />
            ) : (
              <NotFoundPage />
            )
          }
        />
        <Route
          path="/password/edit"
          element={
            user && user.role.level === 2 ? (
              <PasswordEditPage />
            ) : (
              <NotFoundPage />
            )
          }
        />
        <Route
          path="/verified"
          element={
            user && user.role.level === 2 ? <VerifiedPage /> : <NotFoundPage />
          }
        />
        <Route
          path="/ticket"
          element={
            user && user.role.level === 2 ? <TicketPage /> : <NotFoundPage />
          }
        />
      </Routes>

      {/* START ADMIN ROUTE */}
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            user && user.role.level === 1 ? <DashboardPage /> : <NotFoundPage />
          }
        />
        <Route
          path="/admin/users"
          element={
            user && user.role.level === 1 ? <UserPage /> : <NotFoundPage />
          }
        />
        <Route
          path="/admin/posts"
          element={
            user && user.role.level === 1 ? <PostPage /> : <NotFoundPage />
          }
        />
        <Route
          path="/admin/majors"
          element={
            user && user.role.level === 1 ? <MajorPage /> : <NotFoundPage />
          }
        />
        <Route
          path="/admin/statuses"
          element={
            user && user.role.level === 1 ? <StatusPage /> : <NotFoundPage />
          }
        />
        <Route
          path="/admin/verifieds"
          element={
            user && user.role.level === 1 ? (
              <RequestVerified />
            ) : (
              <NotFoundPage />
            )
          }
        />
        <Route
          path="/admin/tickets"
          element={
            user && user.role.level === 1 ? (
              <RequestTicketsPage />
            ) : (
              <NotFoundPage />
            )
          }
        />
      </Routes>
      {/* END ADMIN ROUTE */}
    </BrowserRouter>
  );
}

export default App;
